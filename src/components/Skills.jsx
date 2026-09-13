import { motion } from 'framer-motion'
import * as SiIcons from 'react-icons/si'
import skills from '../data/skills'
import Reveal from './Reveal'

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-28 border-t border-base-border">
      <div className="section">
        <Reveal>
          <div className="flex items-center gap-3 mb-10">
            <p className="font-display text-xs tracking-widest text-ink uppercase">Skills</p>
            <span className="h-px w-10 bg-accent/50" />
          </div>
        </Reveal>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {skills.map((item, i) => {
            const Icon = item.icon === 'MATH' ? null : SiIcons[item.icon]
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: 'easeOut' }}
                className="rounded-2xl border border-base-border bg-base-panel p-5 flex flex-col items-center gap-3 hover:border-accent/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className="h-12 w-12 rounded-xl flex items-center justify-center text-2xl font-display font-bold"
                  style={{ backgroundColor: `${item.color}1A`, color: item.color }}
                >
                  {Icon ? <Icon /> : '∑'}
                </div>
                <p className="text-sm text-ink text-center">{item.name}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}