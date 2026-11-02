import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCertificate, FaRocket, FaUserFriends } from 'react-icons/fa'
import {
  HiAcademicCap,
  HiArrowRight,
  HiBadgeCheck,
  HiBriefcase,
  HiChevronDown,
  HiChevronUp,
  HiOutlineExternalLink,
} from 'react-icons/hi'

import certificates from '../data/certificates'
import timeline from '../data/timeline'
import Reveal from './Reveal'
import ImageLoader from './ImageLoader'

const INITIAL_CERT_COUNT = 4

const tabs = [
  { id: 'journey', label: 'Journey', icon: HiBriefcase },
  { id: 'certificates', label: 'Certificates', icon: FaCertificate },
  { id: 'starhub', label: 'StarHub', icon: FaRocket },
  { id: 'leadership', label: 'Leadership', icon: FaUserFriends },
]

const starhubHighlights = [
  'Co-founder of Kubi Forge, helping shape ideas into practical digital products and community-driven initiatives.',
  'Supporting startup-minded collaboration, product incubation and student-led innovation.',
  'Helping turn concepts into real digital experiences with an execution-focused mindset.',
]

const leadershipOrganizations = [
  {
    organization: 'Rotaract Club',
    institution: 'University of Sri Jayewardenepura',
    logo: '/images/Society logos/Rotaractlogo.png',
  },
  {
    organization: 'IEEE Student Branch',
    institution: 'University of Sri Jayewardenepura',
    logo: '/images/Society logos/IEEElogo.png',
  },
  {
    organization: 'Astronomy Society',
    institution: 'University of Sri Jayewardenepura',
    logo: '/images/Society logos/Astronomylogo.png',
  },
  {
    organization: "J'Pura Voice",
    institution: 'University of Sri Jayewardenepura',
    logo: '/images/Society logos/Japuravoivelogo.png',
  },
]

const leadershipExperiencePoints = [
  {
    title: 'Logistics planning',
    description: 'Managing event requirements, schedules, and coordination to ensure smooth execution.',
  },
  {
    title: 'Event preparation',
    description: 'Supporting setup, readiness checks, and on-ground preparation before activities begin.',
  },
  {
    title: 'Resource management',
    description: 'Coordinating materials, supplies, and essentials to keep operations efficient and organized.',
  },
  {
    title: 'Team coordination',
    description: 'Collaborating closely with peers and organizers to align responsibilities and maintain clear communication.',
  },
]

export default function Journey() {
  const [activeTab, setActiveTab] = useState('journey')
  const [expanded, setExpanded] = useState(false)
  const visibleCertificates = expanded ? certificates : certificates.slice(0, INITIAL_CERT_COUNT)

  return (
    <section id="journey" className="py-20 md:py-28 border-t border-base-border">
      <div className="section">
        <Reveal>
          <div className="flex items-center gap-3 mb-10">
            <p className="font-display text-xs tracking-widest text-ink uppercase">Experience</p>
            <span className="h-px w-10 bg-accent/50" />
          </div>

          <div className="mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink">
              My Experience
            </h2>
            <p className="mt-2 text-ink-muted">
              A snapshot of my journey, certifications, community work, and leadership.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex min-w-max items-center gap-3">
              {tabs.map(({ id, label, icon: Icon }) => {
                const isActive = activeTab === id

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveTab(id)}
                    className={`group inline-flex shrink-0 items-center justify-center gap-2.5 rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'border-accent bg-accent/15 text-accent shadow-[0_0_15px_rgba(53,199,193,0.15)]'
                        : 'border-base-border bg-base-panel text-ink hover:border-accent/50 hover:bg-base-raised'
                    }`}
                  >
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors ${
                        isActive
                          ? 'bg-accent text-base'
                          : 'bg-accent/15 text-accent group-hover:bg-accent group-hover:text-base'
                      }`}
                    >
                      <Icon className="text-sm" />
                    </span>
                    <span className={isActive ? 'font-semibold text-accent' : 'text-ink group-hover:text-ink'}>
                      {label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </Reveal>

        <div className="mt-10 md:mt-12">
          {activeTab === 'journey' && (
            <div className="relative">
              <div className="relative lg:grid lg:grid-cols-[minmax(0,1fr)_44px] lg:gap-6 items-center">
                <div className="relative">
                  {/* Vertical connecting line */}
                  <div className="absolute left-[23px] top-6 bottom-6 hidden w-px bg-base-border lg:block" />

                  <div className="space-y-4 md:space-y-5">
                    {timeline.map((item, index) => {
                      const Icon = item.type === 'Experience' ? HiBriefcase : HiAcademicCap

                      return (
                        <motion.div
                          key={`${item.year}-${item.title}`}
                          initial={{ opacity: 0, x: -16 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
                          className="relative flex items-start gap-3.5 lg:grid lg:grid-cols-[48px_minmax(0,1fr)] lg:items-center lg:gap-4"
                        >
                          {/* Circular/Rounded icon */}
                          <div className="relative z-10 flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-xl md:rounded-2xl border border-accent/50 bg-[#0E1A22] text-[#35C7C1] shadow-[0_0_15px_rgba(53,199,193,0.18)] transition-all duration-300 hover:scale-105 hover:border-accent hover:shadow-[0_0_20px_rgba(53,199,193,0.3)] mt-1 lg:mt-0">
                            <Icon className="text-lg md:text-xl text-[#35C7C1] filter drop-shadow-[0_0_6px_rgba(53,199,193,0.4)]" />
                          </div>

                          {/* Card */}
                          <div className="flex-1 rounded-2xl md:rounded-[22px] border border-base-border bg-base-panel/90 px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 transition-all duration-300 hover:border-accent/40">
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                              <span className="inline-flex items-center rounded-full border border-accent/60 bg-transparent px-2.5 py-0.5 font-display text-xs font-medium text-accent">
                                {item.year}
                              </span>
                              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-faint">
                                {item.type}
                              </span>
                            </div>

                            <h3 className="mt-2.5 md:mt-3.5 font-display text-base sm:text-lg md:text-xl font-bold text-ink tracking-tight leading-snug">
                              {item.title}
                            </h3>
                            <p className="mt-1 text-xs sm:text-sm text-ink-muted/80">{item.place}</p>
                            <p className="mt-2 md:mt-2.5 text-xs sm:text-sm text-ink-muted leading-relaxed">{item.description}</p>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>

                {/* Right-hand side numbering (01, 02, etc.) */}
                <div className="hidden flex-col justify-around py-4 h-full lg:flex select-none">
                  {timeline.map((item, index) => (
                    <div key={`${item.year}-${item.title}`} className="flex flex-1 items-center justify-center">
                      <span className={`font-display text-xs tracking-wider transition-colors ${
                        item.type === 'Experience' ? 'font-bold text-accent text-sm' : 'text-ink-faint/60'
                      }`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'certificates' && (
            <div className="rounded-2xl border border-base-border bg-base-panel p-5 md:p-8">
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {visibleCertificates.map((certificate, index) => (
                  <motion.a
                    key={`${certificate.title}-${certificate.link}`}
                    href={certificate.link}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.35, delay: index * 0.05, ease: 'easeOut' }}
                    className="group overflow-hidden rounded-xl border border-base-border bg-base-raised transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
                  >
                    <ImageLoader
                      src={certificate.image}
                      alt={certificate.title}
                      containerClassName="h-36"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />

                    <div className="p-4">
                      <h3 className="font-display text-sm font-medium text-ink leading-snug">{certificate.title}</h3>
                      <p className="mt-1 text-xs text-ink-muted">{certificate.issuer}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-accent">
                        <HiOutlineExternalLink className="text-sm" />
                        View certificate
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>

              {certificates.length > INITIAL_CERT_COUNT && (
                <button
                  type="button"
                  onClick={() => setExpanded((value) => !value)}
                  className="mt-8 flex items-center gap-2 mx-auto font-display text-sm text-ink-muted transition-colors hover:text-accent"
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
          )}

          {activeTab === 'starhub' && (
            <div className="rounded-2xl border border-base-border bg-base-panel p-5 md:p-8">
              <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs uppercase tracking-wider text-accent font-display">
                    <FaRocket />
                    StarHub
                  </div>

                  <div>
                    <h3 className="font-display text-2xl md:text-3xl font-semibold text-ink">Co-founder of Kubi Forge</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                      I am a co-founder of Kubi Forge, where I help build a startup-minded community focused on collaboration, prototype thinking and practical digital product building.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {starhubHighlights.map((item) => (
                      <div key={item} className="flex gap-3 rounded-xl border border-base-border bg-base-raised p-4 text-ink-muted text-sm">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                          <HiArrowRight className="text-xs" />
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="https://kubiforge.vercel.app"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-accent/40 bg-accent/10 px-5 py-2.5 font-display text-sm text-accent transition-all hover:bg-accent hover:text-base font-medium"
                  >
                    Visit Kubi Forge <HiOutlineExternalLink />
                  </a>
                </div>

                <div className="overflow-hidden rounded-xl border border-base-border bg-base-raised flex flex-col">
                  <ImageLoader
                    src="/images/Project6.webp"
                    alt="Kubi Forge"
                    containerClassName="h-64"
                    className="h-full w-full object-cover"
                  />
                  <div className="p-5">
                    <h4 className="font-display text-lg font-semibold text-ink">Kubi Forge</h4>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      A community and startup-focused platform where ideas evolve through experimentation, learning and collective momentum.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'leadership' && (
            <div className="rounded-2xl border border-base-border bg-base-panel p-5 md:p-8">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs uppercase tracking-wider text-accent font-display">
                  <FaUserFriends />
                  Leadership
                </div>

                <h3 className="mt-4 font-display text-2xl md:text-3xl font-semibold text-ink">University Leadership & Student Engagement</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted max-w-3xl">
                  Actively involved in university societies, student communities and event organizing, building leadership, teamwork and organizational skills beyond academics.
                </p>
              </div>

              <div className="mb-4">
                <p className="font-display text-xs tracking-wider uppercase text-ink-faint">Affiliations & Society Memberships</p>
              </div>

              {/* Small compact cards grid with round logos and colored icons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {leadershipOrganizations.map(({ organization, institution, logo }) => (
                  <motion.article
                    key={organization}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="group relative overflow-hidden flex sm:flex-col items-center sm:items-start gap-3.5 sm:gap-0 rounded-2xl border border-base-border bg-base-raised p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40"
                  >
                    {/* Subtle watermark background logo */}
                    <div className="pointer-events-none absolute -right-4 -bottom-4 h-24 w-24 opacity-15 transition-all duration-300 group-hover:opacity-25 group-hover:scale-110">
                      <img src={logo} alt="" className="h-full w-full rounded-full object-cover" />
                    </div>

                    {/* Round logo */}
                    <div className="relative z-10 flex items-center">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-white p-1 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-accent overflow-hidden">
                        <img src={logo} alt={organization} className="h-full w-full rounded-full object-contain" />
                      </div>
                    </div>

                    {/* Title & institution (blue) */}
                    <div className="relative z-10 min-w-0 flex-1 sm:mt-3.5">
                      <h4 className="font-display text-sm sm:text-base font-bold text-accent leading-tight">{organization}</h4>
                      <p className="mt-1 text-xs text-accent/80 leading-tight">{institution}</p>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Roles, Responsibilities & Leadership Experience */}
              <div className="mt-8 rounded-xl border border-base-border bg-base-raised p-5 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs uppercase tracking-wider text-accent font-display">
                    <HiBriefcase />
                    Leadership & Positions Held
                  </div>
                  <span className="text-xs text-ink-faint uppercase tracking-wider">Roles & Responsibilities</span>
                </div>

                <h4 className="mt-3 font-display text-xl md:text-2xl font-bold text-ink">
                  Logistics Head / IT Crew Member / Marketing Team Member / Logistics Team Member
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted max-w-3xl">
                  Served as Logistics Head of IEEEXTREME 20.0 IEEE, IT Crew Member of CINERO26 in J&apos;Pura Voice, Marketing Team Member of CAREER Gateway 1.0 in IEEE, Logistics Team Member of J&apos;Pura Xtreme 3.0 in IEEE, and Logistics Team Member of ARTIMIA 2.0 in IEEE, contributing to event execution, team coordination, and smooth operational support across diverse university initiatives.
                </p>

                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {leadershipExperiencePoints.map(({ title, description }) => (
                    <div
                      key={title}
                      className="rounded-xl border border-base-border bg-base-panel p-4 text-ink-muted transition-all duration-300 hover:border-accent/40"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/10 text-accent">
                          <HiBadgeCheck className="text-xs" />
                        </span>
                        <h5 className="font-display text-base font-semibold text-ink">{title}</h5>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
