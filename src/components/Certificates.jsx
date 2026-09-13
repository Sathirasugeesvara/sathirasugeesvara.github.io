import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineExternalLink, HiChevronDown, HiChevronUp } from 'react-icons/hi'
import certificates from '../data/certificates'
import Reveal from './Reveal'

const INITIAL_COUNT = 4

export default function Certificates() {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? certificates : certificates.slice(0, INITIAL_COUNT)

  return (
    <section id="certificates" className="py-20 md:py-28 border-t border-base-border">
      <div className="section">
        <Reveal>
          <p className="text-accent font-display text-sm mb-3">Certifications</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-12">
            Certificates
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {visible.map((c, i) => (
            <motion.a
              key={c.title}
              href={c.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: (i % INITIAL_COUNT) * 0.08, ease: 'easeOut' }}
              className="group rounded-2xl border border-base-border bg-base-panel overflow-hidden hover:border-accent/40 hover:-translate-y-1 transition-all duration-300"
            >
              <img src={c.image} alt={c.title} className="h-32 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-display text-sm font-medium text-ink leading-snug">{c.title}</h3>
                <p className="mt-1 text-xs text-ink-muted">{c.issuer}</p>
                <span className="mt-3 flex items-center gap-1.5 text-xs text-accent">
                  <HiOutlineExternalLink /> View certificate
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {certificates.length > INITIAL_COUNT && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="mt-8 flex items-center gap-2 mx-auto font-display text-sm text-ink-muted hover:text-accent active:scale-95 transition-all"
          >
            {expanded ? (
              <>Show fewer <HiChevronUp /></>
            ) : (
              <>Show all {certificates.length} certificates <HiChevronDown /></>
            )}
          </button>
        )}
      </div>
    </section>
  )
}