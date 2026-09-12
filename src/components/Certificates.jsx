import { useState } from 'react'
import { HiOutlineExternalLink, HiChevronDown, HiChevronUp } from 'react-icons/hi'
import certificates from '../data/certificates'

const INITIAL_COUNT = 4

export default function Certificates() {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? certificates : certificates.slice(0, INITIAL_COUNT)

  return (
    <section id="certificates" className="py-20 md:py-28 border-t border-base-border">
      <div className="section">
        <p className="text-accent font-display text-sm mb-3">Certifications</p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-12">
          Certificates
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {visible.map((c) => (
            <a
              key={c.title}
              href={c.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-base-border bg-base-panel overflow-hidden hover:border-accent/40 transition-colors"
            >
              <img src={c.image} alt={c.title} className="h-32 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-display text-sm font-medium text-ink leading-snug">{c.title}</h3>
                <p className="mt-1 text-xs text-ink-muted">{c.issuer}</p>
                <span className="mt-3 flex items-center gap-1.5 text-xs text-accent">
                  <HiOutlineExternalLink /> View certificate
                </span>
              </div>
            </a>
          ))}
        </div>

        {certificates.length > INITIAL_COUNT && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="mt-8 flex items-center gap-2 mx-auto font-display text-sm text-ink-muted hover:text-accent transition-colors"
          >
            {expanded ? (
              <>
                Show fewer <HiChevronUp />
              </>
            ) : (
              <>
                Show all {certificates.length} certificates <HiChevronDown />
              </>
            )}
          </button>
        )}
      </div>
    </section>
  )
}
