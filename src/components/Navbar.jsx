import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  HiAcademicCap,
  HiBriefcase,
  HiCode,
  HiCollection,
  HiHome,
  HiMail,
  HiMenu,
  HiUser,
  HiX,
} from 'react-icons/hi'
import profile from '../data/profile'

const links = [
  { href: '#home', label: 'Home', id: 'home', icon: HiHome },
  { href: '#projects', label: 'Projects', id: 'projects', icon: HiCollection },
  { href: '#about', label: 'About', id: 'about', icon: HiUser },
  { href: '#skills', label: 'Skills', id: 'skills', icon: HiCode },
  { href: '#journey', label: 'Experience', mobileLabel: 'Exp', id: 'journey', icon: HiBriefcase },
  { href: '#contact', label: 'Contact', id: 'contact', icon: HiMail },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [bounce, setBounce] = useState({ id: null, sequence: 0 })
  const shouldReduceMotion = useReducedMotion()
  const pendingMobileSection = useRef(null)

  // Detect scrolling
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Track the active section
  useEffect(() => {
    const targets = links
      .map((link) => document.getElementById(link.id))
      .filter(Boolean)

    if (!targets.length) return

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35
      let current = 'home'
      let currentDistance = Number.POSITIVE_INFINITY

      targets.forEach((target) => {
        const top = target.offsetTop
        const distance = Math.abs(top - scrollPosition)

        if (distance < currentDistance) {
          currentDistance = distance
          current = target.id
        }
      })

      if (pendingMobileSection.current && pendingMobileSection.current !== current) return
      pendingMobileSection.current = null
      setActive(current)
    }

    let scrollEndTimeout
    const onScroll = () => {
      updateActiveSection()
      window.clearTimeout(scrollEndTimeout)

      if (pendingMobileSection.current) {
        scrollEndTimeout = window.setTimeout(() => {
          pendingMobileSection.current = null
          updateActiveSection()
        }, 180)
      }
    }

    updateActiveSection()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      window.clearTimeout(scrollEndTimeout)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [])

  // Close mobile menu when pressing Escape
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const closeMenu = () => setOpen(false)
  const selectMobileLink = (id) => {
    pendingMobileSection.current = active === id ? null : id
    setActive(id)
    closeMenu()

    if (!shouldReduceMotion) {
      setBounce((current) => ({ id, sequence: current.sequence + 1 }))
    }
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 hidden px-4 pt-4 md:block md:px-8 md:pt-5
          transition-all duration-300 ${
            scrolled
              ? 'bg-[#080d12]/80 py-1 shadow-lg shadow-black/20 backdrop-blur-2xl'
              : 'bg-transparent'
          }`}
      >
        <div className="section flex h-[68px] items-center justify-between gap-3 md:gap-5">
          <a
            href="#home"
            onClick={closeMenu}
            aria-label="SS - Home"
            className="flex h-12 w-14 shrink-0 items-center justify-center
              rounded-2xl border border-white/15
              bg-[#080d12]/80 backdrop-blur-2xl
              shadow-lg shadow-black/25
              transition-all duration-300
              hover:border-accent/60 hover:bg-[#101820]"
          >
            <span
              className="bg-gradient-to-br from-white via-ink to-accent
                bg-clip-text font-display text-3xl font-bold
                tracking-tighter text-transparent"
            >
              SS
            </span>
          </a>

          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-1
              rounded-full border border-white/15
              bg-[#171923]/90 p-1.5
              shadow-xl shadow-black/30
              backdrop-blur-2xl"
          >
            {links.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setActive(link.id)}
                aria-current={active === link.id ? 'location' : undefined}
                className={`whitespace-nowrap rounded-full
                  px-3.5 py-2.5 lg:px-4
                  font-display text-sm
                  transition-all duration-300 ${
                    active === link.id
                      ? 'bg-accent text-base shadow-md shadow-accent/20'
                      : 'text-ink hover:bg-white/10 hover:text-white'
                  }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href={profile.resumeUrl}
            download
            className="hidden md:inline-flex shrink-0
              items-center justify-center
              rounded-full border border-accent/50
              bg-[#080d12]/85 px-5 py-3
              font-display text-sm font-medium text-accent
              shadow-lg shadow-black/25 backdrop-blur-2xl
              transition-all duration-300
              hover:border-accent hover:bg-accent
              hover:text-base"
          >
            Resume
          </a>
        </div>
      </header>

      <nav
        aria-label="Mobile quick navigation"
        className="mobile-quick-nav md:hidden"
      >
        {links.map((link) => {
          const Icon = link.icon
          const isActive = active === link.id
          const isBouncing = bounce.id === link.id

          return (
            <a
              key={link.id}
              href={link.href}
              onClick={() => selectMobileLink(link.id)}
              aria-current={isActive ? 'location' : undefined}
              className={`mobile-quick-nav__item${isActive ? ' mobile-quick-nav__item--active' : ''}`}
            >
              <span className="mobile-quick-nav__icon-wrap">
                {isBouncing && (
                  <motion.span
                    key={`ripple-${bounce.sequence}`}
                    aria-hidden="true"
                    className="mobile-quick-nav__ripple"
                    initial={{ scale: 0.7, opacity: 0.32 }}
                    animate={{ scale: [0.7, 1.15, 1.7], opacity: [0.32, 0.2, 0] }}
                    transition={{ duration: 0.72, times: [0, 0.38, 1], ease: 'easeOut' }}
                  />
                )}
                <motion.span
                  key={isBouncing ? `${link.id}-${bounce.sequence}` : `${link.id}-idle`}
                  className="mobile-quick-nav__icon"
                  initial={{ y: 0, rotate: 0, scaleX: 1, scaleY: 1 }}
                  animate={isBouncing ? {
                    y: [0, -8, -60, -82, -52, -8, 0, -8, 0],
                    rotate: [0, -10, 7, 12, -6, 0, 3, -2, 0],
                    scaleX: [1, 0.92, 1.02, 1.06, 1.02, 1, 1.22, 0.92, 1],
                    scaleY: [1, 1.08, 0.98, 0.94, 0.98, 1.04, 0.72, 1.08, 1],
                  } : {
                    y: 0,
                    rotate: 0,
                    scaleX: 1,
                    scaleY: 1,
                  }}
                  transition={isBouncing ? {
                    duration: 1.02,
                    times: [0, 0.08, 0.23, 0.38, 0.54, 0.7, 0.77, 0.9, 1],
                    ease: ['easeOut', 'easeOut', 'easeOut', 'easeIn', 'easeIn', 'easeOut', 'easeOut', 'easeOut'],
                  } : { duration: 0 }}
                  onAnimationComplete={() => {
                    if (isBouncing) {
                      setBounce((current) => (
                        current.sequence === bounce.sequence
                          ? { ...current, id: null }
                          : current
                      ))
                    }
                  }}
                >
                  <Icon size={19} />
                </motion.span>
              </span>
              <span className="mobile-quick-nav__label">{link.mobileLabel || link.label}</span>
              <span className="mobile-quick-nav__indicator-slot" aria-hidden="true">
                {isActive && (
                  <motion.span
                    className="mobile-quick-nav__indicator"
                    layoutId="mobile-quick-nav-active-indicator"
                    transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                  />
                )}
              </span>
            </a>
          )
        })}
      </nav>
    </>
  )
}