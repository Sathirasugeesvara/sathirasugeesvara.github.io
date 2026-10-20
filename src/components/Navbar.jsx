import { useEffect, useState } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'
import profile from '../data/profile'

const links = [
  { href: '#home', label: 'Home', id: 'home' },
  { href: '#projects', label: 'Projects', id: 'projects' },
  { href: '#about', label: 'About', id: 'about' },
  { href: '#skills', label: 'Skills', id: 'skills' },
  { href: '#journey', label: 'Experience', id: 'journey' },
  { href: '#contact', label: 'Contact', id: 'contact' },
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

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          )

        if (visible.length > 0) {
          setActive(visible[0].target.id)
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0, 0.1, 0.25, 0.5],
      }
    )

    targets.forEach((target) => observer.observe(target))

    return () => observer.disconnect()
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
    <header
      className={`fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8 md:pt-5
        transition-all duration-300 ${
          scrolled
            ? 'bg-[#080d12]/80 py-1 shadow-lg shadow-black/20 backdrop-blur-2xl'
            : 'bg-transparent'
        }`}
    >
      <div className="section flex h-[68px] items-center justify-between gap-3 md:gap-5">

        {/* SS LOGO */}
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

        {/* DESKTOP FLOATING NAVIGATION */}
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
              aria-current={
                active === link.id ? 'location' : undefined
              }
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

        {/* RESUME BUTTON */}
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

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
          className="md:hidden flex h-12 w-12 shrink-0
            items-center justify-center
            rounded-2xl border border-white/15
            bg-[#080d12]/85 text-white
            shadow-lg shadow-black/25 backdrop-blur-2xl
            transition-all duration-300
            hover:border-accent/60 hover:text-accent"
        >
          {open ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU BACKDROP */}
      {open && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeMenu}
          className="fixed inset-0 -z-10 h-[100dvh] w-full
            bg-black/50 backdrop-blur-sm md:hidden"
        />
      )}

      {/* MOBILE NAVIGATION PANEL */}
      <div
        id="mobile-navigation"
        className={`absolute inset-x-4 top-[88px]
          overflow-hidden rounded-3xl
          border border-white/15
          bg-[#10151d]/95
          shadow-2xl shadow-black/40
          backdrop-blur-2xl
          transition-all duration-300 md:hidden ${
            open
              ? 'visible translate-y-0 opacity-100'
              : 'invisible -translate-y-3 opacity-0 pointer-events-none'
          }`}
      >
        <nav
          aria-label="Mobile navigation"
          className="flex flex-col gap-1 p-3"
        >
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              tabIndex={open ? 0 : -1}
              aria-current={
                active === link.id ? 'location' : undefined
              }
              onClick={closeMenu}
              className={`rounded-2xl px-5 py-3.5
                font-display text-sm
                transition-all duration-300 ${
                  active === link.id
                    ? 'bg-accent/15 text-accent'
                    : 'text-ink hover:bg-white/5 hover:text-white'
                }`}
            >
              {link.label}
            </a>
          ))}

          {/* MOBILE RESUME */}
          <a
            href={profile.resumeUrl}
            download
            tabIndex={open ? 0 : -1}
            onClick={closeMenu}
            className="mt-2 flex items-center justify-center
              rounded-full border border-accent/40
              bg-accent px-5 py-3.5
              font-display text-sm font-semibold text-base
              transition-all duration-300
              hover:brightness-110"
          >
            Download Resume
          </a>
        </nav>
      </div>
    </header>
  )
}