import { useEffect, useState } from 'react'

const sections = [
  { id: 'home', num: '01' },
  { id: 'projects', num: '02' },
  { id: 'about', num: '03' },
  { id: 'skills', num: '04' },
  { id: 'journey', num: '05' },
  { id: 'contact', num: '06' },
]

export default function SectionIndex() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )

    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-40">
      <div className="relative flex flex-col items-center py-2">
        <span className="absolute top-1 bottom-1 w-px bg-base-border" />
        {sections.map((s, i) => {
          const isLast = i === sections.length - 1
          const gapClass = isLast ? '' : active === s.id ? 'mb-16' : 'mb-3'
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`relative font-display transition-all ${gapClass} ${
                active === s.id ? 'text-accent text-sm font-semibold' : 'text-ink-faint text-xs hover:text-ink-muted'
              }`}
            >
              {s.num}
            </a>
          )
        })}
      </div>
    </div>
  )
}
