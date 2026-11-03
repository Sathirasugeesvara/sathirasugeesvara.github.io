import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCertificate, FaRocket, FaUserFriends } from 'react-icons/fa'
import {
  HiAcademicCap,
  HiArrowRight,
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

const kubiForgeCoFounders = [
  { id: '01', name: 'Sathira Sugeesvara', role: 'Co-Founder' },
  { id: '02', name: 'Himansith Wickramasinghe', role: 'Co-Founder' },
  { id: '03', name: 'Kusal Ranasinghe', role: 'Co-Founder' },
  { id: '04', name: 'Chathupa Chamika', role: 'Co-Founder' },
]

const starhubHighlights = [
  'Product Incubation & Execution: Shaping creative ideas into practical, scalable digital web applications and platforms.',
  'Startup-Minded Collaboration: Fostering fast prototyping, agile development, and student-driven innovation.',
  'Execution-Focused Mindset: Helping turn concepts into real-world products through experimentation and collective momentum.',
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

const clubProjectExperiences = [
  {
    title: 'IEEEXTREME 20.0',
    role: 'Logistics Head',
    organization: 'IEEE Student Branch',
    logo: '/images/Society logos/IEEElogo.png',
    description:
      'Spearheaded overall logistics operations for the 24-hour global competitive programming hackathon at USJ, directing venue readiness, lab setups, hardware power allocation, and team scheduling.',
    skills: ['Logistics Management', 'Team Leadership', 'Hackathon Operations'],
  },
  {
    title: 'CINERO’26',
    role: 'IT Crew Head',
    organization: "J'Pura Voice",
    logo: '/images/Society logos/Japuravoivelogo.png',
    description:
      'Engineered the official competition web platform, digital entry forms, and media workflow systems, providing reliable live tech support throughout the national short film competition.',
    skills: ['Web Platform', 'IT Support', 'Digital Operations'],
  },
  {
    title: 'CAREER Gateway 1.0',
    role: 'Marketing Team Member',
    organization: 'IEEE Student Branch',
    logo: '/images/Society logos/IEEElogo.png',
    description:
      'Drove marketing and promotional outreach for the flagship career development event, coordinating cross-platform content campaigns, student communications, and registration flow.',
    skills: ['Campaign Marketing', 'Outreach', 'Content Strategy'],
  },
  {
    title: "J'Pura Xtreme 3.0",
    role: 'Logistics Team Member',
    organization: 'IEEE Student Branch',
    logo: '/images/Society logos/IEEElogo.png',
    description:
      'Managed on-ground logistics workflows, inventory prep, participant coordination, and event-day operational assistance for the intra-university coding contest.',
    skills: ['Event Logistics', 'Resource Coordination', 'On-Ground Support'],
  },
  {
    title: 'ARTIMIA 2.0',
    role: 'Logistics Team Member',
    organization: 'IEEE Student Branch',
    logo: '/images/Society logos/IEEElogo.png',
    description:
      'Coordinated stage, backstage, and guest area logistical requirements, handling supplies, material distribution, and operational preparedness across the showcase.',
    skills: ['Operational Logistics', 'Team Coordination', 'Stage Support'],
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
          <div className="w-full">
            <div className="grid grid-cols-4 gap-2 sm:flex sm:min-w-max sm:items-center sm:gap-3">
              {tabs.map(({ id, label, icon: Icon }) => {
                const isActive = activeTab === id

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveTab(id)}
                    title={label}
                    aria-label={label}
                    className={`group inline-flex shrink-0 items-center justify-center gap-2.5 rounded-xl border py-2.5 px-2 sm:px-4 sm:py-2 text-sm font-medium transition-all duration-200 ${isActive
                        ? 'border-accent bg-accent/15 text-accent shadow-[0_0_15px_rgba(53,199,193,0.18)]'
                        : 'border-base-border bg-base-panel text-ink hover:border-accent/40 hover:bg-base-raised'
                      }`}
                  >
                    <span
                      className={`flex h-8 w-8 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${isActive
                          ? 'bg-accent text-[#070B10] shadow-[0_0_10px_rgba(53,199,193,0.3)]'
                          : 'bg-[#142f34] border border-accent/25 text-accent group-hover:bg-accent group-hover:text-[#070B10]'
                        }`}
                    >
                      <Icon className="text-[17px] sm:text-[14px] text-inherit" />
                    </span>
                    <span className={`hidden sm:inline ${isActive ? 'font-semibold text-accent' : 'text-ink group-hover:text-ink'}`}>
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
                  <div className="absolute left-[20px] md:left-[24px] -translate-x-1/2 top-5 bottom-5 w-px bg-base-border" />

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
                      <span className={`font-display text-xs tracking-wider transition-colors ${item.type === 'Experience' ? 'font-bold text-accent text-sm' : 'text-ink-faint/60'
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
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs uppercase tracking-wider text-accent font-display">
                    <FaRocket />
                    StarHub
                  </div>

                  <div>
                    <h3 className="font-display text-2xl md:text-3xl font-semibold text-ink">
                      Co-founder of Kubi Forge
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                      Kubi Forge is a startup-focused incubation platform and builder community co-founded to turn ambitious concepts into real digital products, web solutions, and student-driven innovation.
                    </p>
                  </div>

                  {/* Co-Founders Grid */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-display text-xs tracking-wider uppercase text-ink-faint">
                        Co-Founders
                      </span>
                      <span className="text-[11px] font-medium text-accent">4 Co-Founders</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {kubiForgeCoFounders.map((founder) => (
                        <div
                          key={founder.id}
                          className="group flex items-center gap-3 rounded-xl border border-base-border bg-base-raised p-3 transition-all duration-200 hover:border-accent/40 hover:-translate-y-0.5"
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 font-mono text-xs font-bold text-accent transition-colors group-hover:bg-accent group-hover:text-[#070B10]">
                            {founder.id}
                          </span>
                          <div className="min-w-0">
                            <h5 className="truncate font-display text-sm font-semibold text-ink group-hover:text-accent transition-colors">
                              {founder.name}
                            </h5>
                            <span className="text-[11px] font-medium uppercase tracking-wider text-ink-faint">
                              {founder.role}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Core Highlights */}
                  <div className="space-y-2.5">
                    <span className="block font-display text-xs tracking-wider uppercase text-ink-faint">
                      Core Focus Areas
                    </span>
                    {starhubHighlights.map((item) => (
                      <div
                        key={item}
                        className="flex gap-3 rounded-xl border border-base-border bg-base-raised p-3.5 text-ink-muted text-sm"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                          <HiArrowRight className="text-xs" />
                        </span>
                        <span className="leading-relaxed text-xs sm:text-sm">{item}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="https://kubiforge.vercel.app"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-accent/40 bg-accent/10 px-5 py-2.5 font-display text-sm text-accent transition-all hover:bg-accent hover:text-[#070B10] font-medium"
                  >
                    Visit Kubi Forge <HiOutlineExternalLink />
                  </a>
                </div>

                <div className="overflow-hidden rounded-xl border border-base-border bg-base-raised flex flex-col justify-between">
                  <div>
                    <ImageLoader
                      src="/images/kubi-forge-showcase.webp"
                      alt="Kubi Forge Startup Hub Showcase"
                      containerClassName="h-64 sm:h-72"
                      className="h-full w-full object-cover"
                    />
                    <div className="p-5">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-display text-lg font-semibold text-ink">Kubi Forge</h4>
                        <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-display text-[11px] text-accent font-medium">
                          Startup Hub
                        </span>
                      </div>
                      <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                        A community and startup-focused platform where ideas evolve through experimentation, learning and collective momentum.
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-2 border-t border-base-border/60 flex flex-wrap gap-1.5">
                    {['Product Incubation', 'Startup Collective', 'Prototyping', 'Student Tech'].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-base-border bg-base-panel px-2.5 py-1 text-[11px] text-ink-faint font-medium"
                      >
                        {tag}
                      </span>
                    ))}
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
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-base-panel shadow-md transition-all duration-300 group-hover:scale-105 group-hover:border-accent/60 overflow-hidden">
                        <img src={logo} alt={organization} className="h-full w-full object-cover" />
                      </div>
                    </div>

                    {/* Title & institution (blue club name) */}
                    <div className="relative z-10 min-w-0 flex-1 sm:mt-3.5">
                      <h4 className="font-display text-sm sm:text-[15px] font-bold text-accent leading-tight">{organization}</h4>
                      <p className="mt-1 text-xs text-ink-muted leading-tight">{institution}</p>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Club Project & Event Experiences */}
              <div className="mt-8 pt-7 border-t border-base-border">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                  <div>
                    <p className="font-display text-xs tracking-wider uppercase text-ink-faint">Club Projects & Initiatives</p>
                    <h4 className="mt-1 font-display text-lg sm:text-xl font-bold text-ink">
                      Project Experience & Contributions
                    </h4>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-display text-accent">
                    <HiBriefcase className="text-xs" />
                    5 Key Project Roles
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {clubProjectExperiences.map(({ title, role, organization, logo, description, skills }, index) => (
                    <motion.div
                      key={title}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: 0.35, delay: index * 0.05, ease: 'easeOut' }}
                      className="group relative flex flex-col justify-between rounded-2xl border border-base-border bg-base-raised p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-base-panel shadow-sm overflow-hidden">
                              <img src={logo} alt={organization} className="h-full w-full object-cover" />
                            </div>
                            <span className="truncate text-xs font-semibold text-ink/90">{organization}</span>
                          </div>
                          <span className="shrink-0 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-display text-[11px] font-medium text-accent">
                            {role}
                          </span>
                        </div>

                        <h5 className="mt-3 font-display text-base sm:text-lg font-bold text-ink transition-colors group-hover:text-accent">
                          {title}
                        </h5>

                        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-muted">
                          {description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-base-border/70 flex flex-wrap gap-1.5">
                        {skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-md border border-base-border bg-base-panel px-2 py-0.5 text-[11px] text-ink-faint font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
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
