import profile from '../data/profile'

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 border-t border-base-border">
      <div className="section">
        <div className="flex items-center gap-3 mb-10">
          <p className="font-display text-xs tracking-widest text-ink uppercase">About Me</p>
          <span className="h-px w-10 bg-accent/50" />
        </div>

        <div className="grid lg:grid-cols-[220px_1fr_280px] gap-8 items-stretch">
          <div className="rounded-2xl overflow-hidden border border-base-border">
            <img
              src={profile.aboutPhoto}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink">
              More than just code.
            </h2>
            <p className="mt-5 text-ink-muted leading-relaxed max-w-lg">
              I'm {profile.firstName} {profile.lastName}, a {profile.role.toLowerCase()} who loves
              creating digital experiences. I'm passionate about web technologies, problem solving
              and building practical solutions that make an impact.
            </p>

            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              {profile.stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-xl font-bold text-accent">{s.value}</p>
                  <p className="mt-1 text-sm text-ink-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-base-border bg-base-panel p-8 flex flex-col justify-center">
            <span className="font-display text-4xl text-accent leading-none">&ldquo;</span>
            <p className="mt-2 font-display text-lg text-ink leading-snug">{profile.quote}</p>
            <span className="mt-6 h-px w-8 bg-accent" />
          </div>
        </div>
      </div>
    </section>
  )
}