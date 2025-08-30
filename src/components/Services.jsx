import React, { useState, useEffect, useRef } from 'react'

const Services = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredService, setHoveredService] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const services = [
    {
      id: 1,
      title: 'Fotografía de Retrato',
      description: 'Sesiones personalizadas que capturan tu esencia única con técnicas profesionales de iluminación y composición.',
      features: ['Sesión de 2 horas', 'Múltiples outfits', '50+ fotos editadas', 'Galería online'],
      price: 'Desde $150',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 2,
      title: 'Fotografía de Eventos',
      description: 'Cobertura completa de tus momentos especiales, desde bodas hasta eventos corporativos.',
      features: ['Cobertura completa', 'Fotógrafo adicional', 'Entrega 48hrs', 'Album digital'],
      price: 'Desde $300',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      id: 3,
      title: 'Fotografía Comercial',
      description: 'Imágenes profesionales para productos, branding y contenido comercial que impulsen tu negocio.',
      features: ['Múltiples ángulos', 'Fondos variados', 'Retoque profesional', 'Uso comercial'],
      price: 'Desde $200',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      gradient: 'from-green-500 to-blue-500'
    },
    {
      id: 4,
      title: 'Sesión de Familia',
      description: 'Momentos familiares únicos capturados en un ambiente relajado y natural.',
      features: ['Locación a elegir', '3 horas de sesión', 'Toda la familia', 'Impresiones incluidas'],
      price: 'Desde $180',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      gradient: 'from-pink-500 to-red-500'
    },
    {
      id: 5,
      title: 'Fotografía Artística',
      description: 'Conceptos creativos y artísticos que van más allá de la fotografía tradicional.',
      features: ['Concepto único', 'Props incluidos', 'Postproducción artística', 'Fine art prints'],
      price: 'Desde $250',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ),
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      id: 6,
      title: 'Cursos de Fotografía',
      description: 'Aprende las técnicas profesionales de fotografía con clases personalizadas.',
      features: ['Clases personalizadas', 'Práctica incluida', 'Material didáctico', 'Certificado'],
      price: 'Desde $100',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      gradient: 'from-indigo-500 to-purple-500'
    }
  ]

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-40 left-20 w-64 h-64 bg-purple-300/10 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-pink-300/10 dark:bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-20 right-40 w-48 h-48 bg-blue-300/10 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className={`text-center space-y-4 mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Mis <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Servicios</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Servicios profesionales de fotografía diseñados para capturar tus momentos más preciados
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ animationDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex}
                      className="flex items-center text-gray-500 dark:text-gray-400 text-sm"
                    >
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient} mr-3`}></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <span className={`text-2xl font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                    {service.price}
                  </span>
                  <button className={`px-6 py-2 rounded-full bg-gradient-to-r ${service.gradient} text-white font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                    Consultar
                  </button>
                </div>
              </div>

              {/* Hover Effect */}
              <div className={`absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-r ${service.gradient} flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">¿No encuentras lo que buscas?</h3>
              <p className="text-xl mb-6 opacity-90">
                Contáctame para crear un paquete personalizado que se adapte perfectamente a tus necesidades
              </p>
              <button className="px-8 py-4 bg-white text-purple-600 font-bold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105">
                Cotización Personalizada
              </button>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/5 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services