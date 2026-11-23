import { useEffect, useRef, useState } from 'react'
import { resolveTerminalCommand } from '../data/terminalCommands'
import profile from '../data/profile'

export default function PortfolioTerminal({ onClose }) {
  const [command, setCommand] = useState('')
  const [history, setHistory] = useState([
    { id: 0, command: '', output: 'Welcome to SathiraOS. Type "help" to see available commands.' },
  ])
  const [ghostCelebrating, setGhostCelebrating] = useState(false)
  const inputRef = useRef(null)
  const nextId = useRef(1)
  const celebrationTimer = useRef(null)
  const isModal = Boolean(onClose)

  useEffect(() => {
    if (isModal) inputRef.current?.focus()

    if (!isModal) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModal, onClose])

  useEffect(
    () => () => window.clearTimeout(celebrationTimer.current),
    []
  )

  const submitCommand = (event) => {
    event.preventDefault()
    const submitted = command.trim()
    if (!submitted) return

    const result = resolveTerminalCommand(submitted)
    setCommand('')

    if (result.clear) {
      setHistory([])
      return
    }

    setHistory((entries) => [
      ...entries,
      { id: nextId.current++, command: submitted, output: result.output },
    ])

    if (result.action === 'ghost') {
      window.dispatchEvent(new Event('ghost:easter-egg'))
      setGhostCelebrating(true)
      window.clearTimeout(celebrationTimer.current)
      celebrationTimer.current = window.setTimeout(() => setGhostCelebrating(false), 1300)
    } else if (result.action === 'navigate') {
      window.location.assign(`/#${result.section}`)
    } else if (result.action === 'download') {
      const link = document.createElement('a')
      link.href = profile.resumeUrl
      link.download = 'sathira_cv.pdf'
      link.click()
    }
  }

  const terminal = (
    <section
      className={`portfolio-terminal${isModal ? ' portfolio-terminal--modal' : ''}`}
      role={isModal ? 'dialog' : undefined}
      aria-modal={isModal ? 'true' : undefined}
      aria-labelledby="portfolio-terminal-title"
    >
      <header className="portfolio-terminal__header">
        <div className="portfolio-terminal__lights" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <h2 id="portfolio-terminal-title">SATHIRA.TERMINAL</h2>
        {isModal && (
          <button type="button" className="portfolio-terminal__close" onClick={onClose} aria-label="Close terminal">
            Esc
          </button>
        )}
      </header>

      <div className="portfolio-terminal__screen">
        <div className="portfolio-terminal__history" role="log" aria-live="polite">
          {history.map((entry) => (
            <div className="portfolio-terminal__entry" key={entry.id}>
              {entry.command && (
                <p className="portfolio-terminal__command">
                  <span>guest@sathira:~$</span> {entry.command}
                </p>
              )}
              {entry.output && <p className="portfolio-terminal__output">{entry.output}</p>}
            </div>
          ))}
          {ghostCelebrating && (
            <svg className="portfolio-terminal__ghost" viewBox="0 0 52 60" aria-hidden="true">
              <path d="M26 3C13 3 6 13 6 27v25c4-5 8-5 12 0s8 5 12 0 8-5 12 0V27C42 13 35 3 26 3Z" fill="#EDFFFF" stroke="#75F3EB" strokeWidth="2" />
              <ellipse cx="20" cy="27" rx="2" ry="3" fill="#10232B" />
              <ellipse cx="32" cy="27" rx="2" ry="3" fill="#10232B" />
              <path d="M22 35c2 3 6 3 8 0" stroke="#365860" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          )}
        </div>
        <form className="portfolio-terminal__prompt" onSubmit={submitCommand}>
          <label htmlFor="portfolio-terminal-command">guest@sathira:~$</label>
          <input
            ref={inputRef}
            id="portfolio-terminal-command"
            autoComplete="off"
            spellCheck="false"
            value={command}
            onChange={(event) => setCommand(event.target.value)}
            aria-label="Enter a portfolio command"
          />
          <span className="portfolio-terminal__cursor" aria-hidden="true" />
        </form>
      </div>
    </section>
  )

  if (!isModal) return <div className="portfolio-terminal-page">{terminal}</div>

  return (
    <div className="portfolio-terminal-overlay">
      <button
        type="button"
        className="portfolio-terminal-overlay__backdrop"
        onClick={onClose}
        aria-label="Close terminal"
      />
      {terminal}
    </div>
  )
}
