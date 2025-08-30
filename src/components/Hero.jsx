import React, { useState, useEffect } from 'react'

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentText, setCurrentText] = useState(0)
  
  const texts = [
    "Capturando momentos únicos",
    "Creando arte visual",
    "Inmortalizando emociones"
  ]

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)`
          }}
        />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="text-center lg:text-left space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
              <span className="block animate-fadeInUp">Fotografía</span>
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent animate-fadeInUp delay-300">
                Profesional
              </span>
            </h1>
            
            <div className="h-20 flex items-center justify-center lg:justify-start relative">
              <div className="relative">
                {texts.map((text, index) => (
                  <p
                    key={index}
                    className={`text-xl lg:text-2xl text-purple-200 absolute top-0 left-0 w-full transition-all duration-1000 ${
                      index === currentText 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-4'
                    }`}
                    style={{
                      transitionDelay: index === currentText ? '0ms' : '300ms'
                    }}
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6 animate-fadeInUp delay-700">
            <p className="text-lg text-purple-100 max-w-2xl">
              Transformo momentos ordinarios en recuerdos extraordinarios a través del arte de la fotografía. 
              Cada imagen cuenta una historia única, capturada con pasión y precisión técnica.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={scrollToPortfolio}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Ver Portfolio
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </button>
              
              <button className="px-8 py-4 border-2 border-purple-400 text-purple-300 font-semibold rounded-full hover:bg-purple-400 hover:text-white transition-all duration-300 hover:scale-105">
                Contactar
              </button>
            </div>
          </div>
        </div>

        {/* Right Content - Animated Camera */}
        <div className="relative h-96 lg:h-[600px] w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-3xl"></div>
          <div className="relative h-full w-full rounded-3xl overflow-hidden backdrop-blur-sm bg-white/10 border border-white/20 flex items-center justify-center">
            
            {/* Animated Camera Icon */}
            <div className="relative animate-float">
              <svg 
                className="w-48 h-48 lg:w-64 lg:h-64 text-white drop-shadow-2xl" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                style={{
                  filter: 'drop-shadow(0 0 30px rgba(147, 51, 234, 0.5))'
                }}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="0.5" 
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" 
                />
                <circle 
                  cx="12" 
                  cy="13" 
                  r="3" 
                  strokeWidth="0.5"
                  className="animate-pulse"
                />
                
                {/* Lens reflection */}
                <circle 
                  cx="11" 
                  cy="12" 
                  r="1" 
                  fill="rgba(255,255,255,0.3)"
                  stroke="none"
                  className="animate-pulse"
                />
              </svg>
              
              {/* Floating Elements Around Camera */}
              <div className="absolute -top-8 -right-8 w-4 h-4 bg-purple-500 rounded-full animate-bounce delay-1000"></div>
              <div className="absolute -bottom-8 -left-8 w-3 h-3 bg-pink-500 rounded-full animate-bounce delay-2000"></div>
              <div className="absolute top-1/2 -left-12 w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-3000"></div>
              <div className="absolute top-1/4 -right-12 w-5 h-5 bg-yellow-500 rounded-full animate-bounce delay-500"></div>
              
              {/* Light rays */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-32 bg-gradient-to-t from-transparent via-white/20 to-transparent rotate-12 animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-32 bg-gradient-to-t from-transparent via-white/20 to-transparent -rotate-12 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-32 bg-gradient-to-t from-transparent via-white/20 to-transparent rotate-45 animate-pulse delay-2000"></div>
              </div>
            </div>
            
            {/* Photography Terms Floating */}
            <div className="absolute top-16 left-8 text-white/60 text-sm font-light animate-fadeInUp delay-1000">
              f/2.8
            </div>
            <div className="absolute top-24 right-12 text-white/60 text-sm font-light animate-fadeInUp delay-1500">
              ISO 100
            </div>
            <div className="absolute bottom-20 left-12 text-white/60 text-sm font-light animate-fadeInUp delay-2000">
              1/250s
            </div>
            <div className="absolute bottom-32 right-8 text-white/60 text-sm font-light animate-fadeInUp delay-2500">
              85mm
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 blur-xl animate-pulse delay-1000"></div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
      
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>
    </section>
  )
}

export default Hero