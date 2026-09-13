import { motion } from 'framer-motion'
import { HiOutlineDownload, HiOutlineLocationMarker, HiArrowRight } from 'react-icons/hi'
import profile from '../data/profile'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-base">
      <div className="absolute inset-0">
        <img
          src={profile.heroBannerMobile}
          alt=""
          className="md:hidden h-full w-full object-cover object-top opacity-90"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
        <img
          src={profile.heroBanner}
          alt=""
          className="hidden md:block h-full w-full object-cover object-[70%_center] opacity-90"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-base via-base/85 to-base/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-base via-transparent to-base/40" />
      </div>

      <div className="relative section pt-32 pb-24 md:pt-40 md:pb-32 min-h-screen flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-xl"
        >
          <p className="flex items-center gap-2 font-display text-xs tracking-wide text-accent">
            {profile.eyebrow.map((w, i) => (
              <span key={w} className="flex items-center gap-2">
                {w.toUpperCase()}
                {i < profile.eyebrow.length - 1 && <span className="h-1 w-1 rounded-full bg-accent" />}
              </span>
            ))}
          </p>

          <h1 className="mt-5 font-display font-bold leading-[0.95] text-5xl sm:text-6xl lg:text-7xl">
            <span className="block text-ink">{profile.firstName.toUpperCase()}</span>
            <span className="block text-ink-muted">{profile.lastName.toUpperCase()}</span>
          </h1>

          <p className="mt-6 font-display text-lg text-accent">{profile.role}</p>
          <p className="mt-3 max-w-md text-ink-muted leading-relaxed">{profile.tagline}</p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-display text-sm font-medium text-base hover:bg-accent-bright transition-colors active:scale-95">
              View my work <HiArrowRight />
            </a>
            <a href={profile.resumeUrl} download className="inline-flex items-center gap-2 rounded-full border border-accent/50 px-6 py-3 font-display text-sm text-ink hover:bg-accent/10 transition-colors active:scale-95">
              <HiOutlineDownload />
              Download resume
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-faint">
            <span className="flex items-center gap-1.5">
              <HiOutlineLocationMarker className="text-accent" />
              {profile.location}
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              {profile.availability}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}