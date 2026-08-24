import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Catalogo from './components/Catalogo'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BotonWhatsApp from './components/BotonWhatsApp'

/*
  App = la página completa.
  Cada componente es una sección; el orden aquí
  es el orden en que se ven al hacer scroll.
*/
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Catalogo />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <BotonWhatsApp />
    </>
  )
}
