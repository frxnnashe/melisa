import React from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Portfolio from './components/Portfolio'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-900 text-white transition-colors duration-500">
        <Hero />
        <About />
        <Portfolio />
        <Services />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App