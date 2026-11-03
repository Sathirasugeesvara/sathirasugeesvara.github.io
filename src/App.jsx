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
import LiquidSmokeCursor from './components/LiquidSmokeCursor'

export default function App() {
  return (
    <div className="min-h-screen bg-base">
      <PageLoader />
      <LiquidSmokeCursor />
      <Navbar />
      <SectionIndex />
      <main className="pb-28 md:pb-0">
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
