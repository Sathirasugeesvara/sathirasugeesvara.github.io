import { useState } from 'react'
import Navbar from './components/Navbar'
import SectionIndex from './components/SectionIndex'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Skills from './components/Skills'
import Journey from './components/Journey'
import Contact from './components/Contact'
import Footer from './components/Footer'
import PageLoader from './components/PageLoader'
import CursorGhost from './components/CursorGhost'
import NotFound from './components/NotFound'
import PortfolioTerminal from './components/PortfolioTerminal'

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false)
  const isNotFound = window.location.pathname !== '/' && window.location.pathname !== '/index.html'

  return (
    <div className="min-h-screen bg-base">
      <PageLoader />
      <CursorGhost />
      {isNotFound ? (
        <NotFound />
      ) : (
        <>
          <Navbar />
          <SectionIndex />
          <main>
            <Hero onOpenTerminal={() => setTerminalOpen(true)} />
            <Projects />
            <About />
            <Skills />
            <Journey />
            <Contact />
          </main>
          <Footer />
          {terminalOpen && <PortfolioTerminal onClose={() => setTerminalOpen(false)} />}
        </>
      )}
    </div>
  )
}
