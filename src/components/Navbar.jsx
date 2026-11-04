import { useEffect, useState } from 'react'
import {
  HiAcademicCap,
  HiBriefcase,
  HiCollection,
  HiHome,
  HiMail,
  HiMenu,
  HiX,
} from 'react-icons/hi'
import profile from '../data/profile'

const links = [
  { href: '#home', label: 'Home', id: 'home', icon: HiHome },
  { href: '#projects', label: 'Projects', id: 'projects', icon: HiCollection },
  { href: '#about', label: 'About', id: 'about', icon: HiBriefcase },
  { href: '#skills', label: 'Skills', id: 'skills', icon: HiAcademicCap },
  { href: '#journey', label: 'Experience', mobileLabel: 'Exp', id: 'journey', icon: HiAcademicCap },
  { href: '#contact', label: 'Contact', id: 'contact', icon: HiMail },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

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

      setActive(current)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
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
        className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-6 gap-1 rounded-[26px] border border-[#2a3c4c] bg-[#0a1219]/90 p-2 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl md:hidden"
      >
        {links.map((link) => {
          const Icon = link.icon
          const isActive = active === link.id

          return (
            <a
              key={link.id}
              href={link.href}
              onClick={() => {
                setActive(link.id)
                closeMenu()
              }}
              className={`flex flex-col items-center justify-center gap-1 rounded-[18px] px-1 py-2 text-[10px] font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-[#2ecfcf] text-[#051a1d] shadow-[0_0_18px_rgba(46,207,207,0.28)]'
                  : 'text-[#dfeaf2] hover:bg-white/5'
              }`}
            >
              <span className={`flex h-7 w-7 items-center justify-center rounded-xl ${isActive ? 'bg-[#0b1f22] text-white' : 'bg-white/5 text-[#dfeaf2]'}`}>
                <Icon size={15} />
              </span>
              <span className={`leading-none ${isActive ? 'font-semibold' : 'font-medium'}`}>{link.mobileLabel || link.label}</span>
            </a>
          )
        })}
      </nav>
    </>
  )
}