import { FaGithub, FaLinkedin, FaWhatsapp, FaFacebook, FaTiktok, FaInstagram } from 'react-icons/fa'
import { HiOutlineMail, HiOutlineDocumentText } from 'react-icons/hi'
import profile from '../data/profile'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-base-border py-10">
      <div className="section flex flex-col md:flex-row items-center md:items-start justify-between gap-8 text-center md:text-left">
        {/* logo + name + tagline */}
        <div className="flex items-center gap-4">
          <span className="font-display font-bold text-3xl tracking-tighter bg-gradient-to-br from-white via-ink to-accent bg-clip-text text-transparent">
            {profile.initials}
          </span>
          <div>
            <p className="font-display text-ink">{profile.name}</p>
            <p className="text-sm text-ink-muted">{profile.footerTagline}</p>
          </div>
        </div>

        {/* social icons */}
        <div className="flex items-center gap-5 text-ink-muted text-lg">
          <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><FaGithub /></a>
          <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><FaLinkedin /></a>
          <a href={profile.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><FaWhatsapp /></a>
          <a href={profile.socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><FaFacebook /></a>
          <a href={profile.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><FaInstagram /></a>
          <a href={profile.socials.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><FaTiktok /></a>
          <a href={profile.socials.email} className="hover:text-accent transition-colors"><HiOutlineMail /></a>
          <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" title="Download CV"><HiOutlineDocumentText /></a>
        </div>

        {/* copyright */}
        <div className="text-sm text-ink-faint">
          <p>© {year} {profile.name}</p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}