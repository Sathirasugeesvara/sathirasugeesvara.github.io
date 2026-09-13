import { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import profile from '../data/profile'
import Reveal from './Reveal'

const SERVICE_ID = 'service_o6666hh'
const TEMPLATE_ID = 'template_c1a688j'
const PUBLIC_KEY = '5yGFubHnnorTtOUmY'

const fieldVariant = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: 'easeOut' },
  }),
}

export default function Contact() {
  const [status, setStatus] = useState('idle')

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    const form = e.target

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, {
        name: form.name.value,
        email: form.email.value,
        subject: form.subject.value,
        message: form.message.value,
      }, { publicKey: PUBLIC_KEY })
      .then(() => {
        setStatus('sent')
        form.reset()
      })
      .catch(() => setStatus('error'))
  }

  return (
    <section id="contact" className="py-20 md:py-28 border-t border-base-border">
      <div className="section grid md:grid-cols-2 gap-12">
        <Reveal>
          <div>
            <div className="flex items-center gap-3 mb-3">
              <p className="font-display text-xs tracking-widest text-ink uppercase">Contact</p>
              <span className="h-px w-10 bg-accent/50" />
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink">
              Let's build something.
            </h2>
            <p className="mt-4 text-ink-muted max-w-sm leading-relaxed">
              Open to internships, freelance work, or just a chat about a project idea. Reach out
              through the form or any of these:
            </p>

            <div className="mt-8 flex flex-col gap-4">
              <a href={profile.socials.email} className="flex items-center gap-3 text-ink-muted hover:text-accent transition-colors">
                <HiOutlineMail className="text-lg" /> {profile.email}
              </a>
              <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-ink-muted hover:text-accent transition-colors">
                <FaGithub className="text-lg" /> GitHub
              </a>
              <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-ink-muted hover:text-accent transition-colors">
                <FaLinkedin className="text-lg" /> LinkedIn
              </a>
              <a href={profile.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-ink-muted hover:text-accent transition-colors">
                <FaWhatsapp className="text-lg" /> WhatsApp
              </a>
            </div>
          </div>
        </Reveal>

        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div custom={0} variants={fieldVariant} className="grid sm:grid-cols-2 gap-4">
            <input type="text" name="name" required placeholder="Your name" className="rounded-xl bg-base-panel border border-base-border px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent outline-none" />
            <input type="email" name="email" required placeholder="Your email" className="rounded-xl bg-base-panel border border-base-border px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent outline-none" />
          </motion.div>

          <motion.input custom={1} variants={fieldVariant} type="text" name="subject" required placeholder="Subject" className="rounded-xl bg-base-panel border border-base-border px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent outline-none" />

          <motion.textarea custom={2} variants={fieldVariant} name="message" required rows={5} placeholder="Your message" className="rounded-xl bg-base-panel border border-base-border px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent outline-none resize-none" />

          <motion.button
            custom={3}
            variants={fieldVariant}
            type="submit"
            disabled={status === 'sending'}
            className="rounded-full bg-accent px-6 py-3 font-display text-sm font-medium text-base hover:bg-accent-bright transition-colors active:scale-95 disabled:opacity-60"
          >
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </motion.button>

          {status === 'sent' && <p className="text-sm text-accent">Message sent — I'll get back to you soon.</p>}
          {status === 'error' && <p className="text-sm text-red-400">Something went wrong. Try emailing me directly instead.</p>}
        </motion.form>
      </div>
    </section>
  )
}