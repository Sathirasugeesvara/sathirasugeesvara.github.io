import { useEffect, useRef } from 'react'

/**
 * Premium Liquid Smoke Cursor Trail
 *
 * Visual identity:
 * - Electric Blue: #00A8FF (rgb 0, 168, 255)
 * - Neon Green:    #39FF14 (rgb 57, 255, 20)
 * - Deep Blue:     #0057FF (rgb 0, 87, 255)
 * - Subtle Cyan:   #00E5FF (rgb 0, 229, 255)
 *
 * Features:
 * - Fluid undulating smoke ribbon trail (Catmull-Rom spline curves)
 * - Organic smoke puff & dispersion particles with curl turbulence
 * - Smooth color blending from head to tail (Cyan -> Electric Blue -> Deep Blue -> Neon Green)
 * - Subtle cursor glowing halo
 * - Dynamic width expansion during fast movements
 * - Interactive glow boost when hovering over buttons, links & cards
 * - Energy ripple on mouse click
 * - Auto-dissolve when mouse stops & 0% idle CPU
 * - Disabled on mobile / touchscreen & prefers-reduced-motion
 */

// Color stop definitions for smooth liquid gradient interpolation
const COLOR_STOPS = [
  { p: 0.0, r: 0, g: 229, b: 255 },  // Subtle Cyan #00E5FF
  { p: 0.22, r: 0, g: 168, b: 255 }, // Electric Blue #00A8FF
  { p: 0.52, r: 0, g: 87, b: 255 },  // Deep Blue #0057FF
  { p: 0.82, r: 57, g: 255, b: 20 },  // Neon Green #39FF14
  { p: 1.0, r: 0, g: 229, b: 255 },  // Soft Cyan dissolve mist
]

function getSmokeColor(progress) {
  const p = Math.max(0, Math.min(1, progress))
  let i = 0
  while (i < COLOR_STOPS.length - 1 && COLOR_STOPS[i + 1].p < p) i++
  const s1 = COLOR_STOPS[i]
  const s2 = COLOR_STOPS[Math.min(i + 1, COLOR_STOPS.length - 1)]
  const t = s2.p === s1.p ? 0 : (p - s1.p) / (s2.p - s1.p)
  return {
    r: Math.round(s1.r + (s2.r - s1.r) * t),
    g: Math.round(s1.g + (s2.g - s1.g) * t),
    b: Math.round(s1.b + (s2.b - s1.b) * t),
  }
}

export default function LiquidSmokeCursor() {
  const canvasRef = useRef(null)

  useEffect(() => {
    // 1. Accessibility & Responsive device checks
    const pointerQuery = window.matchMedia('(pointer: fine)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    // Only enable on desktop with fine pointer & when user hasn't requested reduced motion
    if (!pointerQuery.matches || motionQuery.matches) {
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    // Screen dimensions & DPR
    let width = window.innerWidth
    let height = window.innerHeight
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    function updateSize() {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    updateSize()

    // Simulation State
    const mouse = {
      x: width / 2,
      y: height / 2,
      prevX: width / 2,
      prevY: height / 2,
      smoothX: width / 2,
      smoothY: height / 2,
      vx: 0,
      vy: 0,
      speed: 0,
      visible: false,
      isDown: false,
      isHoveringButton: false,
      isHoveringCard: false,
      lastMoveTime: performance.now(),
    }

    let hoverIntensity = 1.0
    let targetIntensity = 1.0

    // Trail nodes (Spline Ribbon)
    const MAX_TRAIL_POINTS = 32
    let trail = []

    // Smoke Wisps / Puff Particles
    const MAX_PARTICLES = 65
    let particles = []

    // Click Ripples
    let ripples = []

    // Animation Loop Control
    let animId = null
    let isIdle = true

    // Smoke particle class
    class SmokeParticle {
      constructor(x, y, vx, vy, color, baseRadius, intensity) {
        this.x = x
        this.y = y
        // Lateral dispersion velocity + inertia
        this.vx = vx * 0.45 + (Math.random() - 0.5) * 1.8 * intensity
        this.vy = vy * 0.45 + (Math.random() - 0.5) * 1.8 * intensity
        this.radius = baseRadius * (0.8 + Math.random() * 0.6)
        this.maxRadius = this.radius * (2.8 + Math.random() * 1.5)
        this.age = 0
        this.maxAge = 40 + Math.random() * 25
        this.color = color
        this.rotation = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.04
        this.seed = Math.random() * 100
      }

      update(time) {
        this.age++
        const life = 1 - this.age / this.maxAge
        if (life <= 0) return false

        // Fluid drag & damping
        this.vx *= 0.93
        this.vy *= 0.93

        // Natural curl / thermal buoyancy
        this.vy -= 0.07
        this.vx += Math.cos(time * 2.5 + this.seed) * 0.18
        this.vy += Math.sin(time * 2.5 + this.seed) * 0.14

        this.x += this.vx
        this.y += this.vy

        // Radial expansion
        this.radius += (this.maxRadius - this.radius) * 0.04
        this.rotation += this.rotationSpeed

        return true
      }

      draw(context, intensity) {
        const life = Math.max(0, 1 - this.age / this.maxAge)
        // Quadratic fade out
        const alpha = life * life * 0.28 * intensity
        if (alpha <= 0.005) return

        const { r, g, b } = this.color
        const rad = Math.max(1, this.radius)

        const grad = context.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          rad
        )
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.9})`)
        grad.addColorStop(0.35, `rgba(${r}, ${g}, ${b}, ${alpha * 0.5})`)
        grad.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${alpha * 0.15})`)
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)

        context.fillStyle = grad
        context.beginPath()
        context.arc(this.x, this.y, rad, 0, Math.PI * 2)
        context.fill()
      }
    }

    // Ripple class for elegant click interaction
    class ClickRipple {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.radius = 4
        this.maxRadius = 58
        this.alpha = 0.75
        this.speed = 2.4
      }

      update() {
        this.radius += (this.maxRadius - this.radius) * 0.14 + this.speed
        this.alpha *= 0.91
        return this.alpha > 0.01 && this.radius < this.maxRadius + 10
      }

      draw(context) {
        context.save()
        context.lineWidth = 1.8
        context.strokeStyle = `rgba(0, 229, 255, ${this.alpha * 0.8})`
        context.shadowColor = 'rgba(57, 255, 20, 0.6)'
        context.shadowBlur = 10

        context.beginPath()
        context.arc(this.x, this.y, Math.max(1, this.radius), 0, Math.PI * 2)
        context.stroke()

        // Subtle inner ring
        context.lineWidth = 1
        context.strokeStyle = `rgba(57, 255, 20, ${this.alpha * 0.5})`
        context.beginPath()
        context.arc(this.x, this.y, Math.max(1, this.radius * 0.6), 0, Math.PI * 2)
        context.stroke()
        context.restore()
      }
    }

    // Spawn smoke particles along mouse segment
    function spawnSmoke(x, y, vx, vy, speed, intensity) {
      if (particles.length >= MAX_PARTICLES) return

      const count = Math.min(3, Math.max(1, Math.floor(speed * 0.15)))
      const color = getSmokeColor(Math.random() * 0.5) // Early trail color
      const baseRadius = 10 + Math.min(speed * 0.6, 16) * intensity

      for (let i = 0; i < count; i++) {
        const offset = (Math.random() - 0.5) * 8
        const px = x + -vy * (offset / (speed + 0.1))
        const py = y + vx * (offset / (speed + 0.1))
        particles.push(new SmokeParticle(px, py, vx, vy, color, baseRadius, intensity))
      }
    }

    // Main Animation Loop
    let lastTime = performance.now()

    function render(currentTime) {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1)
      lastTime = currentTime
      const timeSec = currentTime * 0.001

      // Smooth hover intensity transition
      hoverIntensity += (targetIntensity - hoverIntensity) * 0.12

      // Smooth mouse interpolation (spring physics for fluid feeling)
      const lerpSpeed = 0.35
      mouse.smoothX += (mouse.x - mouse.smoothX) * lerpSpeed
      mouse.smoothY += (mouse.y - mouse.smoothY) * lerpSpeed

      // Mouse speed calculation
      const dx = mouse.x - mouse.prevX
      const dy = mouse.y - mouse.prevY
      const instantSpeed = Math.sqrt(dx * dx + dy * dy)
      mouse.vx = mouse.vx * 0.7 + dx * 0.3
      mouse.vy = mouse.vy * 0.7 + dy * 0.3
      mouse.speed = mouse.speed * 0.8 + instantSpeed * 0.2
      mouse.prevX = mouse.x
      mouse.prevY = mouse.y

      // Add trail point if mouse is active and moved
      const distFromLast = trail.length > 0
        ? Math.hypot(mouse.smoothX - trail[0].x, mouse.smoothY - trail[0].y)
        : 999

      if (mouse.visible && (distFromLast > 4 || (mouse.speed > 0.5 && distFromLast > 2))) {
        const dynamicWidth = (7 + Math.min(mouse.speed * 0.85, 20)) * hoverIntensity

        trail.unshift({
          x: mouse.smoothX,
          y: mouse.smoothY,
          vx: mouse.vx,
          vy: mouse.vy,
          age: 0,
          maxAge: 26,
          width: dynamicWidth,
        })

        if (trail.length > MAX_TRAIL_POINTS) {
          trail.pop()
        }

        // Spawn organic smoke puffs
        spawnSmoke(mouse.smoothX, mouse.smoothY, mouse.vx, mouse.vy, mouse.speed, hoverIntensity)
      }

      // Update trail points (apply slight fluid harmonic drift)
      for (let i = trail.length - 1; i >= 0; i--) {
        const pt = trail[i]
        pt.age++
        if (pt.age >= pt.maxAge) {
          trail.splice(i, 1)
          continue
        }
        pt.vx *= 0.94
        pt.vy *= 0.94
        pt.x += pt.vx * 0.12 + Math.cos(timeSec * 3 + pt.age * 0.25) * 0.3
        pt.y += pt.vy * 0.12 + Math.sin(timeSec * 3 + pt.age * 0.25) * 0.3
      }

      // Update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        if (!particles[i].update(timeSec)) {
          particles.splice(i, 1)
        }
      }

      // Update ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        if (!ripples[i].update()) {
          ripples.splice(i, 1)
        }
      }

      // Canvas Clearing (clear full logical dimensions)
      ctx.clearRect(0, 0, width, height)

      // Use screen blend mode for luminous glowing liquid ink
      ctx.globalCompositeOperation = 'screen'

      // 1. Draw Liquid Smoke Trail Ribbon
      if (trail.length >= 3) {
        drawLiquidSmokeRibbon(ctx, trail, timeSec, hoverIntensity)
      }

      // 2. Draw Smoke Puff Particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw(ctx, hoverIntensity)
      }

      // 3. Draw Click Ripples
      if (ripples.length > 0) {
        ctx.globalCompositeOperation = 'lighter'
        for (let i = 0; i < ripples.length; i++) {
          ripples[i].draw(ctx)
        }
        ctx.globalCompositeOperation = 'screen'
      }

      // 4. Draw Cursor Glowing Halo (Pointer Head)
      if (mouse.visible) {
        drawPointerHalo(ctx, mouse.smoothX, mouse.smoothY, mouse.speed, hoverIntensity, timeSec)
      }

      // Inactivity check: if mouse stopped and everything faded out, sleep the loop to save CPU
      const timeSinceMove = performance.now() - mouse.lastMoveTime
      if (
        timeSinceMove > 1200 &&
        trail.length === 0 &&
        particles.length === 0 &&
        ripples.length === 0
      ) {
        isIdle = true
        animId = null
        return
      }

      animId = requestAnimationFrame(render)
    }

    // Draw multi-layered liquid smoke ribbon
    function drawLiquidSmokeRibbon(context, points, time, intensity) {
      const len = points.length
      if (len < 3) return

      // Precalculate smooth normal vectors along the spine
      const lefts = []
      const rights = []
      const colors = []

      for (let i = 0; i < len; i++) {
        const pt = points[i]
        const progress = i / (len - 1)
        const life = Math.max(0, 1 - pt.age / pt.maxAge)

        // Compute tangent vector
        let tx = 0
        let ty = 0
        if (i === 0) {
          tx = pt.x - points[1].x
          ty = pt.y - points[1].y
        } else if (i === len - 1) {
          tx = points[len - 2].x - pt.x
          ty = points[len - 2].y - pt.y
        } else {
          tx = points[i - 1].x - points[i + 1].x
          ty = points[i - 1].y - points[i + 1].y
        }

        const mag = Math.hypot(tx, ty) || 1
        const nx = -ty / mag
        const ny = tx / mag

        // Organic wavy width variation along the ribbon
        const wave = 1 + 0.22 * Math.sin(i * 0.45 - time * 4.5)
        const currentWidth = pt.width * life * wave

        lefts.push({
          x: pt.x + nx * currentWidth,
          y: pt.y + ny * currentWidth,
        })
        rights.push({
          x: pt.x - nx * currentWidth,
          y: pt.y - ny * currentWidth,
        })
        colors.push({
          color: getSmokeColor(progress),
          alpha: life * life * intensity,
        })
      }

      // Pass 1: Outer Soft Diffuse Aura (Wide, low opacity)
      context.save()
      for (let i = 0; i < len - 1; i++) {
        const p1 = points[i]
        const p2 = points[i + 1]
        const c1 = colors[i]
        const c2 = colors[i + 1]

        const auraWidth = (p1.width + p2.width) * 0.95
        const midAlpha = (c1.alpha + c2.alpha) * 0.08
        if (midAlpha <= 0.002) continue

        const grad = context.createLinearGradient(p1.x, p1.y, p2.x, p2.y)
        grad.addColorStop(0, `rgba(${c1.color.r}, ${c1.color.g}, ${c1.color.b}, ${c1.alpha * 0.09})`)
        grad.addColorStop(1, `rgba(${c2.color.r}, ${c2.color.g}, ${c2.color.b}, ${c2.alpha * 0.09})`)

        context.strokeStyle = grad
        context.lineWidth = Math.max(1, auraWidth)
        context.lineCap = 'round'
        context.beginPath()
        context.moveTo(p1.x, p1.y)
        context.lineTo(p2.x, p2.y)
        context.stroke()
      }
      context.restore()

      // Pass 2: Main Flowing Liquid Ribbon Body
      for (let i = 0; i < len - 1; i++) {
        const l1 = lefts[i]
        const l2 = lefts[i + 1]
        const r1 = rights[i]
        const r2 = rights[i + 1]
        const c1 = colors[i]
        const c2 = colors[i + 1]

        const alphaMid = (c1.alpha + c2.alpha) * 0.5 * 0.35
        if (alphaMid <= 0.005) continue

        const p1 = points[i]
        const p2 = points[i + 1]
        const grad = context.createLinearGradient(p1.x, p1.y, p2.x, p2.y)
        grad.addColorStop(0, `rgba(${c1.color.r}, ${c1.color.g}, ${c1.color.b}, ${c1.alpha * 0.38})`)
        grad.addColorStop(1, `rgba(${c2.color.r}, ${c2.color.g}, ${c2.color.b}, ${c2.alpha * 0.38})`)

        context.fillStyle = grad
        context.beginPath()
        context.moveTo(l1.x, l1.y)
        context.lineTo(l2.x, l2.y)
        context.lineTo(r2.x, r2.y)
        context.lineTo(r1.x, r1.y)
        context.closePath()
        context.fill()
      }

      // Pass 3: Inner Hot Luminous Core Filament
      context.save()
      for (let i = 0; i < len - 1; i++) {
        const p1 = points[i]
        const p2 = points[i + 1]
        const c1 = colors[i]
        const c2 = colors[i + 1]

        const coreAlpha = (c1.alpha + c2.alpha) * 0.5 * 0.55
        if (coreAlpha <= 0.005) continue

        const coreWidth = Math.max(1.5, (p1.width + p2.width) * 0.16)
        const grad = context.createLinearGradient(p1.x, p1.y, p2.x, p2.y)
        // Core is bright cyan/electric blue
        grad.addColorStop(0, `rgba(0, 229, 255, ${c1.alpha * 0.6})`)
        grad.addColorStop(1, `rgba(0, 168, 255, ${c2.alpha * 0.6})`)

        context.strokeStyle = grad
        context.lineWidth = coreWidth
        context.lineCap = 'round'
        context.beginPath()
        context.moveTo(p1.x, p1.y)
        context.lineTo(p2.x, p2.y)
        context.stroke()
      }
      context.restore()
    }

    // Draw the subtle glowing halo at the cursor pointer
    function drawPointerHalo(context, x, y, speed, intensity, time) {
      const breath = 1 + 0.15 * Math.sin(time * 3)
      const baseRadius = (16 + Math.min(speed * 0.3, 10)) * intensity * breath
      const alpha = 0.38 * Math.min(intensity, 1.5)

      // Outer soft halo
      const grad = context.createRadialGradient(x, y, 0, x, y, baseRadius)
      grad.addColorStop(0, `rgba(0, 229, 255, ${alpha})`)
      grad.addColorStop(0.35, `rgba(0, 168, 255, ${alpha * 0.5})`)
      grad.addColorStop(0.7, `rgba(0, 87, 255, ${alpha * 0.18})`)
      grad.addColorStop(1, 'rgba(0, 87, 255, 0)')

      context.fillStyle = grad
      context.beginPath()
      context.arc(x, y, baseRadius, 0, Math.PI * 2)
      context.fill()

      // Inner tight bright spot
      const innerRadius = Math.max(2, 4.5 * intensity)
      const innerGrad = context.createRadialGradient(x, y, 0, x, y, innerRadius)
      innerGrad.addColorStop(0, `rgba(255, 255, 255, ${0.75 * intensity})`)
      innerGrad.addColorStop(0.5, `rgba(0, 229, 255, ${0.45 * intensity})`)
      innerGrad.addColorStop(1, 'rgba(0, 229, 255, 0)')

      context.fillStyle = innerGrad
      context.beginPath()
      context.arc(x, y, innerRadius, 0, Math.PI * 2)
      context.fill()
    }

    // Event Listeners
    function wakeLoop() {
      if (isIdle) {
        isIdle = false
        lastTime = performance.now()
        animId = requestAnimationFrame(render)
      }
    }

    function onPointerMove(e) {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.visible = true
      mouse.lastMoveTime = performance.now()

      // Interactive element detection: buttons, links, project cards
      const target = e.target
      if (target) {
        const isButton = Boolean(
          target.closest('button, a, [role="button"], input, textarea, select, label')
        )
        const isCard = Boolean(
          target.closest('article, [class*="card"], [class*="Project"], .group')
        )

        mouse.isHoveringButton = isButton
        mouse.isHoveringCard = isCard
        targetIntensity = isButton ? 1.6 : isCard ? 1.3 : 1.0
      }

      wakeLoop()
    }

    function onPointerDown(e) {
      mouse.isDown = true
      mouse.lastMoveTime = performance.now()

      // Create an energy ripple at click location
      ripples.push(new ClickRipple(e.clientX, e.clientY))

      // Burst of energetic liquid micro-wisps
      const count = 7
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4
        const speed = 2.2 + Math.random() * 2.8
        const vx = Math.cos(angle) * speed
        const vy = Math.sin(angle) * speed
        const color = getSmokeColor(Math.random())
        particles.push(new SmokeParticle(e.clientX, e.clientY, vx, vy, color, 9, hoverIntensity * 1.4))
      }

      wakeLoop()
    }

    function onPointerUp() {
      mouse.isDown = false
    }

    function onPointerLeave() {
      mouse.visible = false
      targetIntensity = 1.0
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    window.addEventListener('pointerup', onPointerUp, { passive: true })
    document.addEventListener('pointerleave', onPointerLeave, { passive: true })
    window.addEventListener('resize', updateSize, { passive: true })

    // Start initial loop
    isIdle = false
    lastTime = performance.now()
    animId = requestAnimationFrame(render)

    // Cleanup on unmount
    return () => {
      if (animId) {
        cancelAnimationFrame(animId)
      }
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      document.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('resize', updateSize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-40 h-full w-full select-none"
      aria-hidden="true"
    />
  )
}

