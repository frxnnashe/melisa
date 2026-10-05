import About from './components/About'
import Contact from './components/Contact'
import DroneSection from './components/DroneSection'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Portfolio from './components/Portfolio'
import Services from './components/Services'
import SocialProof from './components/SocialProof'

function App() {
  return (
    <div className="min-h-[100dvh] bg-zinc-950 text-white">
      <Hero />
      <main>
        <Portfolio />
        <DroneSection />
        <About />
        <Services />
        <SocialProof />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}

export default App
