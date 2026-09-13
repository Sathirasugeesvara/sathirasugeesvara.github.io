import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineExternalLink, HiChevronDown, HiChevronUp } from 'react-icons/hi'
import { FaGithub } from 'react-icons/fa'
import projects from '../data/projects'
import Reveal from './Reveal'

const INITIAL_COUNT = 4

export default function Projects() {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? projects : projects.slice(0, INITIAL_COUNT)

  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="section">
        <Reveal>
          <div className="flex items-center gap-3 mb-10">
            <p className="font-display text-xs tracking-widest text-ink uppercase">Projects</p>
            <span className="h-px w-10 bg-accent/50" />
          </div>
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink">Featured projects</h2>
              <p className="mt-2 text-ink-muted">A few things I've built, end to end.</p>
            </div>
            {projects.length > INITIAL_COUNT && (
              <button
                onClick={() => setExpanded((v) => !v)}
                className="font-display text-sm text-accent hover:text-accent-bright flex items-center gap-1.5 active:scale-95 transition-transform"
              >
                {expanded ? 'Show fewer' : 'View all projects'}
                {expanded ? <HiChevronUp /> : <HiChevronDown />}
              </button>
            )}
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visible.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % INITIAL_COUNT) * 0.08, ease: 'easeOut' }}
              className="group rounded-2xl border border-base-border bg-base-panel overflow-hidden flex flex-col hover:border-accent/40 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="bg-base-raised border-b border-base-border">
                <div className="flex items-center gap-1.5 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-ink-faint/40" />
                  <span className="h-2.5 w-2.5 rounded-full bg-ink-faint/40" />
                  <span className="h-2.5 w-2.5 rounded-full bg-ink-faint/40" />
                </div>
                <div className="overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-40 object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <p className="text-xs text-accent font-display">{p.category}</p>
                <h3 className="mt-1 font-display text-base font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed flex-1">{p.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs rounded-full border border-base-border px-2.5 py-1 text-ink-muted">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-4 pt-4 border-t border-base-border">
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-ink hover:text-accent transition-colors">
                      <HiOutlineExternalLink /> Live demo
                    </a>
                  )}
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-ink hover:text-accent transition-colors">
                    <FaGithub /> Code
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}