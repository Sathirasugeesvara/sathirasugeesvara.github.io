import { motion } from 'framer-motion'
import { HiAcademicCap, HiBriefcase } from 'react-icons/hi'
import timeline from '../data/timeline'
import Reveal from './Reveal'

export default function Journey() {
  return (
    <section id="journey" className="py-20 md:py-28 border-t border-base-border">
      <div className="section">
        <Reveal>
          <div className="flex items-center gap-3 mb-12">
            <p className="font-display text-xs tracking-widest text-ink uppercase">Journey</p>
            <span className="h-px w-10 bg-accent/50" />
          </div>
        </Reveal>

        <div className="relative">
          <div className="absolute left-6 md:left-7 top-2 bottom-2 w-px bg-base-border" />

          <div className="space-y-6">
            {timeline.map((item, i) => {
              const Icon = item.type === 'Experience' ? HiBriefcase : HiAcademicCap
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: 'easeOut' }}
                  className="relative flex gap-5 md:gap-6"
                >
                  <div className="relative z-10 h-12 w-12 md:h-14 md:w-14 shrink-0 rounded-2xl border border-accent/40 bg-base-panel flex items-center justify-center text-accent text-xl">
                    <Icon />
                  </div>

                  <div className="flex-1 rounded-2xl border border-base-border bg-base-panel p-5 md:p-6 hover:border-accent/40 hover:-translate-y-0.5 transition-all duration-300">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-display text-xs font-semibold text-accent rounded-full border border-accent/30 px-2.5 py-1">
                        {item.year}
                      </span>
                      <span className="text-xs text-ink-faint uppercase tracking-wide">{item.type}</span>
                    </div>
                    <h3 className="mt-3 font-display text-lg font-semibold text-ink">{item.title}</h3>
                    <p className="text-sm text-ink-faint">{item.place}</p>
                    <p className="mt-2 text-sm text-ink-muted leading-relaxed max-w-xl">{item.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}