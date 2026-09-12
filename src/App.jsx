import Navbar from './components/Navbar'
import SectionIndex from './components/SectionIndex'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Skills from './components/Skills'
import Journey from './components/Journey'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-base">
      <Navbar />
      <SectionIndex />
      <main>
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Journey />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
