import Header from './components/Header'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Certifications from './components/sections/Certifications'
import Interests from './components/sections/Interests'
import Skills from './components/sections/Skills'
import Experience from './components/sections/Experience'
import Stats from './components/sections/Stats'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'
import Footer from './components/Footer'
import './index.css'

function App() {
  return (
    <div className="app-shell min-h-screen">
      <Header />
      <Hero />
      <About />
      <Certifications />
      <Interests />
      <Skills />
      <Experience />
      <Stats />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
