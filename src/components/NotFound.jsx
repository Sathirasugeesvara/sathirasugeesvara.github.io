import PortfolioTerminal from './PortfolioTerminal'

const links = [
  { href: '/#home', label: 'Home' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#contact', label: 'Contact' },
]

export default function NotFound() {
  return (
    <main className="not-found-page">
      <a className="not-found-page__brand" href="/" aria-label="Return to portfolio home">SS</a>
      <div className="not-found-page__content">
        <p className="not-found-page__eyebrow">404 / ROUTE NOT FOUND</p>
        <h1>This page wandered off.</h1>
        <p className="not-found-page__description">
          Nothing lives at <code>{window.location.pathname}</code>. Try a terminal command or use a shortcut below.
        </p>
        <PortfolioTerminal />
        <nav className="not-found-page__links" aria-label="Suggested pages">
          {links.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>
      </div>
    </main>
  )
}
