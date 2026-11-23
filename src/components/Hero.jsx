import { motion } from 'framer-motion'
import { HiOutlineBriefcase, HiOutlineDownload, HiOutlineLocationMarker, HiArrowRight } from 'react-icons/hi'
import profile from '../data/profile'
import ImageLoader from './ImageLoader'
import DeveloperStatus from './DeveloperStatus'

export default function Hero({ onOpenTerminal }) {
  const roleParts = profile.role.split('|').map((part) => part.trim())

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-base">
      <div className="absolute inset-0">
        <ImageLoader
          src={profile.heroBanner}
          sources={[{ srcSet: profile.heroBannerMobile, media: '(max-width: 767px)' }]}
          alt=""
          loading="eager"
          fetchPriority="high"
          containerClassName="h-full w-full"
          className="h-full w-full object-cover object-top opacity-90 md:object-[70%_center] md:brightness-110 md:saturate-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-base via-base/85 to-base/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-base/75 via-transparent to-base/20" />
        <svg className="hero-wave" viewBox="0 0 1600 150" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 28 C215 68 360 142 590 126 C820 110 956 76 1110 47 C1290 14 1438 57 1600 31" />
        </svg>
      </div>

      <div className="hero-content relative section pt-24 pb-28 md:pt-40 md:pb-28 min-h-screen flex flex-col items-start">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="hero-copy max-w-xl xl:ml-[clamp(0px,7.2vw,114px)]"
        >
          <p className="hero-eyebrow flex items-center gap-2 font-display text-xs tracking-wide text-accent">
            {profile.eyebrow.map((w, i) => (
              <span key={w} className="flex items-center gap-2">
                {w.toUpperCase()}
                {i < profile.eyebrow.length - 1 && <span className="h-1 w-1 rounded-full bg-accent" />}
              </span>
            ))}
          </p>

          <h1 className="mt-5 font-display font-bold leading-[0.95] text-[clamp(2.25rem,12vw,3rem)] sm:text-6xl lg:text-7xl">
            <span className="hero-name-first block">{profile.firstName.toUpperCase()}</span>
            <span className="hero-name-last block">{profile.lastName.toUpperCase()}</span>
          </h1>

          <p className="hero-role mt-6 font-display text-lg">
            {roleParts.map((part, index) => (
              <span className={index > 0 ? 'hero-role__accent' : undefined} key={part}>{part}</span>
            ))}
          </p>
          <p className="hero-tagline mt-3 max-w-md leading-relaxed">{profile.tagline}</p>

          <div className="hero-actions mt-9 flex flex-wrap gap-3 sm:gap-4">
            <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-display text-sm font-medium text-base hover:bg-accent-bright transition-colors active:scale-95 sm:px-6">
              View my work <HiArrowRight />
            </a>
            <a href={profile.resumeUrl} download className="inline-flex items-center gap-2 rounded-full border border-accent/50 px-5 py-3 font-display text-sm text-ink hover:bg-accent/10 transition-colors active:scale-95 sm:px-6">
              <HiOutlineDownload />
              Download resume
            </a>
          </div>

          <div className="hero-meta mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-faint">
            <span className="flex items-center gap-1.5">
              <HiOutlineLocationMarker className="text-accent" />
              {profile.location}
            </span>
            <span className="flex items-center gap-2">
              <HiOutlineBriefcase className="text-accent" />
              {profile.availability}
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            </span>
          </div>
        </motion.div>
        <DeveloperStatus onOpenTerminal={onOpenTerminal} />
      </div>
    </section>
  )
}