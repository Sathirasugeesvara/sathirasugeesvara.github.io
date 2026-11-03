import React, { useEffect, useRef } from 'react'

/**
 * CursorGhost - Glowing Ghost with Smooth Magical Smoke Trail
 *
 * Inspired by the Ghost Cursor visual concept:
 * - Cute translucent glowing cyan ghost companion following the mouse
 * - Beautiful flowing magical smoke / mist ribbon trailing behind
 * - Floating code tokens (< / >, {}, 01, >_, =>) & glowing embers
 * - Interactive states: Hover excitation (^ ^ eyes, sparkle ticks, amplified glow)
 * - Click & Double Click energy shockwaves & particle bursts
 * - Dynamic velocity adaptation (longer mist when fast, natural dissolve when stopped)
 * - Fully non-blocking (pointer-events: none), high performance requestAnimationFrame
 * - Disabled on touch/mobile devices & prefers-reduced-motion
 */

// Color Palette from reference
const COLORS = {
  white: '#FFFFFF',
  cyanCore: '#A5F3FC',
  cyanElectric: '#22D3EE',
  blueSky: '#60A5FA',
  purpleMist: '#A78BFA',
  eyeDark: '#07151B',
}

const CS_TOKENS = ['</>', '{}', '01', '>_', '=>', '10', '{...}']

interface SmokePuff {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  maxRadius: number
  alpha: number
  maxAlpha: number
  life: number
  maxLife: number
  rotation: number
  vRot: number
  seed: number
}

interface Spark {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  maxLife: number
  life: number
  color: string
}

interface FloatingToken {
  text: string
  x: number
  y: number
  vx: number
  vy: number
  alpha: number
  life: number
  maxLife: number
  size: number
  rotation: number
  vRot: number
}

interface Shockwave {
  x: number
  y: number
  radius: number
  maxRadius: number
  alpha: number
  lineWidth: number
  delay: number
}

interface TrailPoint {
  x: number
  y: number
  age: number
  speed: number
}

export const CursorGhost: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    // 1. Accessibility & Device Checks
    const pointerQuery = window.matchMedia('(pointer: fine)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    // Only run on desktop devices with a fine pointer and normal motion preferences
    if (!pointerQuery.matches || motionQuery.matches) {
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      if (!canvas) return
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    // Mouse Tracking
    const mouse = {
      x: width / 2,
      y: height / 2,
      prevX: width / 2,
      prevY: height / 2,
      vx: 0,
      vy: 0,
      speed: 0,
      visible: false,
      isDown: false,
      isHovering: false,
      lastMoveTime: performance.now(),
    }

    // Ghost Entity State
    const ghost = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      vx: 0,
      vy: 0,
      angle: 0,
      targetAngle: 0,
      scale: 1,
      targetScale: 1,
      bounceY: 0,
      bounceVy: 0,
      spinAngle: 0,
      spinSpeed: 0,
      hoverTransition: 0, // 0 = normal, 1 = excited
      motePhase: 0,
    }

    // Particle Collections
    const trailPoints: TrailPoint[] = []
    const smokePuffs: SmokePuff[] = []
    const sparks: Spark[] = []
    const tokens: FloatingToken[] = []
    const shockwaves: Shockwave[] = []

    let lastTokenSpawn = 0
    let lastPuffSpawn = 0
    let animId: number

    // Helper: Spawn Smoke Puff
    function spawnPuff(x: number, y: number, vx: number, vy: number, speedBoost: number) {
      if (smokePuffs.length >= 45) return
      const angle = Math.random() * Math.PI * 2
      const spread = Math.random() * 6
      smokePuffs.push({
        x: x + Math.cos(angle) * spread,
        y: y + Math.sin(angle) * spread,
        vx: vx * 0.15 + (Math.random() - 0.5) * 0.8,
        vy: vy * 0.15 + (Math.random() - 0.5) * 0.8 - 0.25, // gentle upward drift
        radius: 12 + Math.random() * 8,
        maxRadius: 36 + Math.random() * 22 + Math.min(speedBoost * 1.2, 20),
        alpha: 0,
        maxAlpha: 0.28 + Math.random() * 0.16,
        life: 0,
        maxLife: 45 + Math.random() * 30 + Math.min(speedBoost * 2, 25),
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.04,
        seed: Math.random() * 100,
      })
    }

    // Helper: Spawn Floating Code Token
    function spawnToken(x: number, y: number, vx = 0, vy = 0, text?: string) {
      if (tokens.length >= 14) return
      const sym = text || CS_TOKENS[Math.floor(Math.random() * CS_TOKENS.length)]
      tokens.push({
        text: sym,
        x: x + (Math.random() - 0.5) * 12,
        y: y + (Math.random() - 0.5) * 12,
        vx: vx * 0.2 + (Math.random() - 0.5) * 1.2,
        vy: vy * 0.2 + (Math.random() - 0.5) * 1.2 - 0.3,
        alpha: 1,
        life: 0,
        maxLife: 55 + Math.random() * 35,
        size: 10 + Math.random() * 3,
        rotation: (Math.random() - 0.5) * 0.3,
        vRot: (Math.random() - 0.5) * 0.02,
      })
    }

    // Helper: Spawn Sparks
    function spawnSparks(x: number, y: number, count: number, speedMultiplier = 1) {
      for (let i = 0; i < count; i++) {
        if (sparks.length >= 40) break
        const angle = Math.random() * Math.PI * 2
        const speed = (2 + Math.random() * 4.5) * speedMultiplier
        const colorPick = Math.random()
        const col =
          colorPick < 0.6
            ? COLORS.cyanElectric
            : colorPick < 0.85
            ? COLORS.cyanCore
            : COLORS.blueSky
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 1.5 + Math.random() * 2,
          alpha: 1,
          maxLife: 30 + Math.random() * 20,
          life: 0,
          color: col,
        })
      }
    }

    // Helper: Spawn Shockwave
    function spawnShockwave(x: number, y: number, maxRadius = 48, delay = 0) {
      if (shockwaves.length >= 8) return
      shockwaves.push({
        x,
        y,
        radius: 6,
        maxRadius,
        alpha: 1,
        lineWidth: 3,
        delay,
      })
    }

    // Event Listeners
    const onPointerMove = (e: PointerEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      if (!mouse.visible) {
        mouse.visible = true
        ghost.x = mouse.x - 20
        ghost.y = mouse.y + 15
      }
      mouse.lastMoveTime = performance.now()
    }

    const onPointerLeave = () => {
      mouse.visible = false
    }

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return // Left click only
      mouse.isDown = true
      const cx = e.clientX
      const cy = e.clientY

      // 1. Expanding shockwave ring
      spawnShockwave(cx, cy, 52, 0)

      // 2. Spark particles
      spawnSparks(cx, cy, 14, 1.2)

      // 3. Floating CS symbols bursting outward
      const symbolsToBurst = ['</>', '{}', '01', '=>']
      for (let i = 0; i < 3; i++) {
        const angle = (i / 3) * Math.PI * 2 + Math.random() * 0.5
        const pSpeed = 2.5 + Math.random() * 2
        spawnToken(
          cx,
          cy,
          Math.cos(angle) * pSpeed * 5,
          Math.sin(angle) * pSpeed * 5,
          symbolsToBurst[i % symbolsToBurst.length]
        )
      }

      // 4. Ghost reaction: joyful hop / recoil
      ghost.bounceVy = -11
      ghost.targetScale = 1.22
    }

    const onPointerUp = () => {
      mouse.isDown = false
      ghost.targetScale = mouse.isHovering ? 1.15 : 1.0
    }

    const onDblClick = (e: MouseEvent) => {
      const cx = e.clientX
      const cy = e.clientY

      // 1. Triple concentric shockwaves
      spawnShockwave(cx, cy, 65, 0)
      spawnShockwave(cx, cy, 85, 4)
      spawnShockwave(cx, cy, 105, 8)

      // 2. Extra sparks & smoke bloom
      spawnSparks(cx, cy, 24, 1.8)
      for (let i = 0; i < 6; i++) {
        spawnPuff(cx, cy, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, 10)
      }

      // 3. Four floating tokens
      const burstSymbols = ['{...}', '</>', '01', '=>', '>_']
      burstSymbols.forEach((sym, i) => {
        const ang = (i / burstSymbols.length) * Math.PI * 2
        spawnToken(cx, cy, Math.cos(ang) * 14, Math.sin(ang) * 14, sym)
      })

      // 4. Ghost excited full spin & bounce
      ghost.spinSpeed = Math.PI * 0.16
      ghost.bounceVy = -15
      ghost.targetScale = 1.3
    }

    // Interactive Hover Tracking
    const onPointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const isInteractive = Boolean(
        target.closest(
          'a, button, [role="button"], input, textarea, select, [data-interactive], .cursor-pointer, [tabindex="0"]'
        )
      )

      if (isInteractive !== mouse.isHovering) {
        mouse.isHovering = isInteractive
        if (isInteractive) {
          ghost.targetScale = 1.15
          // Emit a few excited sparkles when entering hover
          spawnSparks(ghost.x, ghost.y - 10, 4, 0.6)
        } else {
          ghost.targetScale = 1.0
        }
      }
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('pointerleave', onPointerLeave, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    window.addEventListener('pointerup', onPointerUp, { passive: true })
    window.addEventListener('dblclick', onDblClick, { passive: true })
    document.addEventListener('pointerover', onPointerOver, { passive: true })

    // Animation Loop
    let lastTime = performance.now()

    function animate(currentTime: number) {
      animId = requestAnimationFrame(animate)

      const dt = Math.min((currentTime - lastTime) / 1000, 0.05)
      lastTime = currentTime
      const timeSec = currentTime * 0.001

      // Velocity & Speed Calculation
      const dx = mouse.x - mouse.prevX
      const dy = mouse.y - mouse.prevY
      mouse.vx = dx
      mouse.vy = dy
      mouse.speed = Math.hypot(dx, dy)
      mouse.prevX = mouse.x
      mouse.prevY = mouse.y

      const isStationary = mouse.speed < 0.25

      // 1. Interpolate Ghost Position (Smooth Lerp Following)
      if (mouse.visible) {
        // Natural following offset behind cursor
        let targetOffsetX = -18
        let targetOffsetY = 14

        if (!isStationary) {
          const moveAngle = Math.atan2(mouse.vy, mouse.vx)
          const trailDist = Math.min(mouse.speed * 1.5 + 20, 42)
          targetOffsetX = -Math.cos(moveAngle) * trailDist
          targetOffsetY = -Math.sin(moveAngle) * trailDist
        }

        // Idle gentle bobbing
        const idleBobX = Math.cos(timeSec * 2.2) * 2.5
        const idleBobY = Math.sin(timeSec * 3.0) * 4.0

        ghost.targetX = mouse.x + targetOffsetX + idleBobX
        ghost.targetY = mouse.y + targetOffsetY + idleBobY

        // Lerp towards target
        const lerpFactor = isStationary ? 0.09 : 0.13
        ghost.x += (ghost.targetX - ghost.x) * lerpFactor
        ghost.y += (ghost.targetY - ghost.y) * lerpFactor
        ghost.vx = ghost.x - (ghost.targetX - targetOffsetX)
        ghost.vy = ghost.y - (ghost.targetY - targetOffsetY)

        // Banking tilt rotation according to movement
        const targetTilt = isStationary
          ? Math.sin(timeSec * 1.5) * 0.04
          : Math.max(-0.35, Math.min(0.35, dx * 0.022))
        ghost.angle += (targetTilt - ghost.angle) * 0.12

        // Spin reaction (from double click)
        if (Math.abs(ghost.spinSpeed) > 0.001) {
          ghost.spinAngle += ghost.spinSpeed
          ghost.spinSpeed *= 0.92
          if (Math.abs(ghost.spinSpeed) < 0.005) {
            ghost.spinAngle = 0
            ghost.spinSpeed = 0
          }
        }

        // Vertical bounce physics
        ghost.bounceY += ghost.bounceVy
        ghost.bounceVy += 0.85 // gravity / spring pull
        if (ghost.bounceY > 0) {
          ghost.bounceY = 0
          ghost.bounceVy = -ghost.bounceVy * 0.4
          if (Math.abs(ghost.bounceVy) < 0.3) ghost.bounceVy = 0
        }

        // Scale interpolation
        ghost.scale += (ghost.targetScale - ghost.scale) * 0.15

        // Hover transition smoothing (0 = normal, 1 = excited)
        const targetHover = mouse.isHovering ? 1 : 0
        ghost.hoverTransition += (targetHover - ghost.hoverTransition) * 0.18

        // Record history trail points
        trailPoints.unshift({
          x: ghost.x,
          y: ghost.y + 14,
          age: 0,
          speed: mouse.speed,
        })
        if (trailPoints.length > 28) trailPoints.pop()

        // Spawn Smoke Puffs when moving
        if (
          mouse.speed > 1.2 &&
          currentTime - lastPuffSpawn > Math.max(25, 90 - mouse.speed * 4)
        ) {
          lastPuffSpawn = currentTime
          spawnPuff(ghost.x, ghost.y + 16, -dx * 0.25, -dy * 0.25, mouse.speed)
        }

        // Spawn Floating Code Tokens in wake
        if (
          mouse.speed > 2.5 &&
          currentTime - lastTokenSpawn > Math.max(380, 1000 - mouse.speed * 20)
        ) {
          lastTokenSpawn = currentTime
          spawnToken(ghost.x, ghost.y + 16, -dx * 0.2, -dy * 0.2)
        }
      }

      // Age trail points
      for (let i = trailPoints.length - 1; i >= 0; i--) {
        trailPoints[i].age += dt * 60
        if (trailPoints[i].age > 30) trailPoints.splice(i, 1)
      }

      // 2. Clear Canvas
      ctx.clearRect(0, 0, width, height)

      // 3. Render Smoke Puffs (Volumetric fluid mist)
      ctx.save()
      for (let i = smokePuffs.length - 1; i >= 0; i--) {
        const p = smokePuffs[i]
        p.life++
        p.x += p.vx + Math.sin(p.life * 0.08 + p.seed) * 0.4
        p.y += p.vy
        p.vx *= 0.96
        p.vy *= 0.96
        p.rotation += p.vRot

        const progress = p.life / p.maxLife
        if (progress >= 1) {
          smokePuffs.splice(i, 1)
          continue
        }

        // Radius expands gracefully
        const curRadius = p.radius + (p.maxRadius - p.radius) * Math.sin(progress * Math.PI * 0.5)

        // Alpha fades in then dissolves smoothly
        const curAlpha =
          progress < 0.2
            ? (progress / 0.2) * p.maxAlpha
            : (1 - (progress - 0.2) / 0.8) * p.maxAlpha

        // Radial smoke gradient
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, curRadius)
        grad.addColorStop(0, `rgba(165, 243, 252, ${curAlpha * 0.35})`)
        grad.addColorStop(0.35, `rgba(34, 211, 238, ${curAlpha * 0.22})`)
        grad.addColorStop(0.7, `rgba(96, 165, 250, ${curAlpha * 0.08})`)
        grad.addColorStop(1, 'rgba(34, 211, 238, 0)')

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(p.x, p.y, curRadius, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()

      // 4. Render Fluid Smoke Ribbon Spine
      if (trailPoints.length > 2) {
        ctx.save()
        for (let i = 0; i < trailPoints.length - 1; i++) {
          const pt1 = trailPoints[i]
          const pt2 = trailPoints[i + 1]
          const progress = i / trailPoints.length
          const alpha = (1 - progress) * 0.26 * (mouse.visible ? 1 : 0)
          if (alpha <= 0.01) continue

          const lineWidth = (1 - progress) * 16 + 2

          ctx.beginPath()
          ctx.moveTo(pt1.x, pt1.y)
          ctx.lineTo(pt2.x, pt2.y)
          ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`
          ctx.lineWidth = lineWidth
          ctx.lineCap = 'round'
          ctx.shadowColor = COLORS.cyanElectric
          ctx.shadowBlur = (1 - progress) * 14
          ctx.stroke()
        }
        ctx.restore()
      }

      // 5. Render Floating Code Tokens (</>, {}, 01, >_)
      if (tokens.length > 0) {
        ctx.save()
        ctx.font = 'bold 12px "Space Grotesk", monospace'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        for (let i = tokens.length - 1; i >= 0; i--) {
          const t = tokens[i]
          t.life++
          t.x += t.vx
          t.y += t.vy
          t.vx *= 0.97
          t.vy *= 0.97
          t.rotation += t.vRot

          const progress = t.life / t.maxLife
          if (progress >= 1) {
            tokens.splice(i, 1)
            continue
          }

          const alpha = Math.sin(progress * Math.PI) * 0.85
          ctx.save()
          ctx.translate(t.x, t.y)
          ctx.rotate(t.rotation)
          ctx.shadowColor = COLORS.cyanElectric
          ctx.shadowBlur = 10
          ctx.fillStyle = `rgba(165, 243, 252, ${alpha})`
          ctx.fillText(t.text, 0, 0)
          ctx.restore()
        }
        ctx.restore()
      }

      // 6. Render Sparks
      if (sparks.length > 0) {
        ctx.save()
        for (let i = sparks.length - 1; i >= 0; i--) {
          const s = sparks[i]
          s.life++
          s.x += s.vx
          s.y += s.vy
          s.vx *= 0.94
          s.vy *= 0.94

          const progress = s.life / s.maxLife
          if (progress >= 1) {
            sparks.splice(i, 1)
            continue
          }

          const alpha = 1 - progress
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.size * (1 - progress * 0.4), 0, Math.PI * 2)
          ctx.shadowColor = s.color
          ctx.shadowBlur = 8
          ctx.fillStyle = s.color
          ctx.globalAlpha = alpha
          ctx.fill()
        }
        ctx.restore()
      }

      // 7. Render Shockwaves (Click Ripples)
      if (shockwaves.length > 0) {
        ctx.save()
        for (let i = shockwaves.length - 1; i >= 0; i--) {
          const sw = shockwaves[i]
          if (sw.delay > 0) {
            sw.delay--
            continue
          }
          sw.radius += (sw.maxRadius - sw.radius) * 0.16 + 1.2
          sw.alpha *= 0.91

          if (sw.alpha < 0.03 || sw.radius >= sw.maxRadius) {
            shockwaves.splice(i, 1)
            continue
          }

          ctx.beginPath()
          ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(34, 211, 238, ${sw.alpha})`
          ctx.lineWidth = sw.lineWidth * sw.alpha
          ctx.shadowColor = COLORS.cyanElectric
          ctx.shadowBlur = 12 * sw.alpha
          ctx.stroke()
        }
        ctx.restore()
      }

      // 8. Render the Ghost Companion
      if (mouse.visible) {
        ctx.save()

        const gx = ghost.x
        const gy = ghost.y + ghost.bounceY
        const gScale = ghost.scale
        const gAngle = ghost.angle + ghost.spinAngle

        ctx.translate(gx, gy)
        ctx.rotate(gAngle)
        ctx.scale(gScale, gScale)

        // Outer Aura Glow
        const auraGlow = ghost.hoverTransition * 12 + 18
        ctx.shadowColor = COLORS.cyanElectric
        ctx.shadowBlur = auraGlow

        // Dynamic Wavy Skirt Calculation
        const waveTime = timeSec * 6
        const w0 = Math.sin(waveTime) * 3
        const w1 = Math.sin(waveTime + 1.3) * 3.5
        const w2 = Math.sin(waveTime + 2.6) * 3
        const w3 = Math.sin(waveTime + 3.9) * 3.5

        // Ghost Body Silhouette Path
        ctx.beginPath()
        // Top Dome Head
        ctx.moveTo(-18, -4)
        ctx.bezierCurveTo(-18, -26, 18, -26, 18, -4)

        // Right Arm & Flank
        ctx.bezierCurveTo(20, 2, 25, 7, 24, 12)
        ctx.bezierCurveTo(23, 16, 19, 14, 18, 18)

        // Bottom Undulating Wavy Skirt (Right to Left)
        ctx.bezierCurveTo(18, 24 + w0, 13, 27 + w0, 9, 21 + w0 * 0.5)
        ctx.bezierCurveTo(7, 26 + w1, 2, 28 + w1, -1, 21 + w1 * 0.5)
        ctx.bezierCurveTo(-3, 26 + w2, -8, 28 + w2, -11, 21 + w2 * 0.5)
        ctx.bezierCurveTo(-13, 25 + w3, -17, 25 + w3, -18, 18)

        // Left Arm & Flank
        ctx.bezierCurveTo(-19, 14, -23, 16, -24, 12)
        ctx.bezierCurveTo(-25, 7, -20, 2, -18, -4)
        ctx.closePath()

        // 3D Translucent Body Gradient Fill
        const bodyGrad = ctx.createLinearGradient(-12, -24, 14, 26)
        bodyGrad.addColorStop(0.0, COLORS.white) // Soft glossy highlight
        bodyGrad.addColorStop(0.3, '#E0F7FA')
        bodyGrad.addColorStop(0.7, COLORS.cyanCore)
        bodyGrad.addColorStop(1.0, 'rgba(34, 211, 238, 0.88)') // Electric cyan base

        ctx.fillStyle = bodyGrad
        ctx.fill()

        // Soft Cyan Rim Border
        ctx.strokeStyle = `rgba(34, 211, 238, ${0.75 + ghost.hoverTransition * 0.25})`
        ctx.lineWidth = 1.6
        ctx.stroke()

        // Forehead Glossy Specular Highlight Pill
        ctx.save()
        ctx.beginPath()
        ctx.ellipse(-8, -17, 6, 2.8, -Math.PI / 5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.65)'
        ctx.shadowColor = 'transparent'
        ctx.fill()
        ctx.restore()

        // Facial Expressions
        ctx.save()
        ctx.shadowColor = 'transparent' // Crisp eyes

        const hTr = ghost.hoverTransition

        if (hTr < 0.95) {
          // --- Normal Expression ---
          const eyeAlpha = 1 - hTr
          ctx.fillStyle = COLORS.eyeDark
          ctx.globalAlpha = eyeAlpha

          // Left Eye (Vertical Pill Oval)
          ctx.beginPath()
          ctx.ellipse(-7, -4, 2.5, 4.5, 0, 0, Math.PI * 2)
          ctx.fill()

          // Right Eye (Vertical Pill Oval)
          ctx.beginPath()
          ctx.ellipse(7, -4, 2.5, 4.5, 0, 0, Math.PI * 2)
          ctx.fill()

          // White catchlight reflection dots
          ctx.fillStyle = COLORS.white
          ctx.beginPath()
          ctx.arc(-6, -6, 1.2, 0, Math.PI * 2)
          ctx.arc(8, -6, 1.2, 0, Math.PI * 2)
          ctx.fill()

          // Normal Cute Smiling Mouth (‿)
          ctx.beginPath()
          ctx.arc(0, 3, 3.5, 0.15 * Math.PI, 0.85 * Math.PI)
          ctx.strokeStyle = COLORS.eyeDark
          ctx.lineWidth = 1.6
          ctx.lineCap = 'round'
          ctx.stroke()
        }

        if (hTr > 0.05) {
          // --- Hover Excited Expression (^ ^ eyes & open smile) ---
          ctx.globalAlpha = hTr

          // Left Happy Squint Eye (^)
          ctx.beginPath()
          ctx.arc(-7, -3, 3.5, Math.PI * 1.1, Math.PI * 1.9)
          ctx.strokeStyle = COLORS.eyeDark
          ctx.lineWidth = 2.0
          ctx.lineCap = 'round'
          ctx.stroke()

          // Right Happy Squint Eye (^)
          ctx.beginPath()
          ctx.arc(7, -3, 3.5, Math.PI * 1.1, Math.PI * 1.9)
          ctx.strokeStyle = COLORS.eyeDark
          ctx.lineWidth = 2.0
          ctx.lineCap = 'round'
          ctx.stroke()

          // Cute Open Smile (◡)
          ctx.beginPath()
          ctx.arc(0, 3.5, 4.5, 0.08 * Math.PI, 0.92 * Math.PI)
          ctx.fillStyle = COLORS.eyeDark
          ctx.fill()

          // Excited Sparkle Ticks beside head (\ and /)
          ctx.strokeStyle = COLORS.cyanElectric
          ctx.lineWidth = 2.2
          ctx.lineCap = 'round'
          ctx.shadowColor = COLORS.cyanElectric
          ctx.shadowBlur = 8

          // Left Sparkle (\)
          ctx.beginPath()
          ctx.moveTo(-24, -13)
          ctx.lineTo(-19, -8)
          ctx.stroke()

          // Right Sparkle (/)
          ctx.beginPath()
          ctx.moveTo(19, -8)
          ctx.lineTo(24, -13)
          ctx.stroke()
        }

        ctx.restore() // End face

        // Floating ambient motes around ghost
        ctx.save()
        ghost.motePhase += dt * 2.5
        for (let m = 0; m < 3; m++) {
          const ang = ghost.motePhase + (m * Math.PI * 2) / 3
          const mx = Math.cos(ang) * (26 + m * 4)
          const my = Math.sin(ang * 1.5) * 16 - 2
          const mAlpha = 0.5 + Math.sin(ang * 2) * 0.35

          ctx.beginPath()
          ctx.arc(mx, my, 1.8, 0, Math.PI * 2)
          ctx.fillStyle = COLORS.cyanCore
          ctx.shadowColor = COLORS.cyanElectric
          ctx.shadowBlur = 6
          ctx.globalAlpha = mAlpha
          ctx.fill()
        }
        ctx.restore()

        ctx.restore() // End ghost
      }
    }

    animId = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('dblclick', onDblClick)
      document.removeEventListener('pointerover', onPointerOver)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 h-full w-full select-none"
      aria-hidden="true"
    />
  )
}

export default CursorGhost

