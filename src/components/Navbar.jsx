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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const targets = links.map((l) => document.getElementById(l.id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-base/90 backdrop-blur border-b border-base-border' : 'bg-transparent'
      }`}
    >
      <div className="section flex items-center justify-between h-16 md:h-20">
        <a href="#home" className="flex items-center select-none">
          <span className="font-display font-bold text-3xl tracking-tighter bg-gradient-to-br from-white via-ink to-accent bg-clip-text text-transparent">
            SS
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 font-display text-sm">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`relative pb-3 transition-colors ${
                active === l.id ? 'text-white' : 'text-ink hover:text-white'
              }`}
            >
              {l.label}
              <span
                className={`absolute left-0 bottom-0 h-0.5 w-full bg-accent transition-opacity ${
                  active === l.id ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </a>
          ))}
        </nav>

        <a
          href={profile.resumeUrl}
          download
          className="hidden md:inline-flex items-center rounded-full border border-accent/50 px-4 py-2 text-sm font-display text-accent hover:bg-accent/10 transition-colors"
        >
          Resume
        </a>

        <button
          className="md:hidden text-ink text-2xl"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-base border-t border-base-border px-6 py-6 flex flex-col gap-5 font-display">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`text-base ${active === l.id ? 'text-white' : 'text-ink hover:text-white'}`}
            >
              {l.label}
            </a>
          ))}
          <a
            href={profile.resumeUrl}
            download
            className="inline-flex w-fit items-center rounded-full border border-accent/50 px-4 py-2 text-sm text-accent"
          >
            Download Resume
          </a>
        </nav>
      )}
    </header>
  )
}
