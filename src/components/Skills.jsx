import * as SiIcons from 'react-icons/si'
import skills from '../data/skills'

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-28 border-t border-base-border">
      <div className="section">
        <div className="flex items-center gap-3 mb-10">
          <p className="font-display text-xs tracking-widest text-ink uppercase">Skills</p>
          <span className="h-px w-10 bg-accent/50" />
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {skills.map((item) => {
            const Icon = item.icon === 'MATH' ? null : SiIcons[item.icon]
            return (
              <div
                key={item.name}
                className="rounded-2xl border border-base-border bg-base-panel p-5 flex flex-col items-center gap-3 hover:border-accent/40 transition-colors"
              >
                <div
                  className="h-12 w-12 rounded-xl flex items-center justify-center text-2xl font-display font-bold"
                  style={{ backgroundColor: `${item.color}1A`, color: item.color }}
                >
                  {Icon ? <Icon /> : '∑'}
                </div>
                <p className="text-sm text-ink text-center">{item.name}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}