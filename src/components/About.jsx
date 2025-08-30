import React, { useState, useEffect, useRef } from 'react'

const About = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
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

  const skills = [
    { name: 'Fotografía de Retrato', level: 95 },
    { name: 'Fotografía de Eventos', level: 88 },
    { name: 'Fotografía de Producto', level: 92 },
    { name: 'Edición Digital', level: 90 },
    { name: 'Iluminación de Estudio', level: 85 },
    { name: 'Fotografía Artística', level: 93 }
  ]

  const stats = [
    { number: '500+', label: 'Proyectos Completados' },
    { number: '8+', label: 'Años de Experiencia' },
    { number: '250+', label: 'Clientes Satisfechos' },
    { number: '50+', label: 'Premios Obtenidos' }
  ]

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 opacity-50"></div>
      <div className="absolute top-20 right-10 w-64 h-64 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-pink-300/20 dark:bg-pink-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                Sobre <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Mí</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
            </div>

            <div className="space-y-6 text-gray-600 dark:text-gray-300">
              <p className="text-lg leading-relaxed">
                Soy una fotógrafa apasionada con más de 8 años de experiencia capturando momentos únicos 
                e irrepetibles. Mi enfoque se centra en crear imágenes que no solo documenten, sino que 
                cuenten historias profundas y emocionales.
              </p>
              
              <p className="text-lg leading-relaxed">
                Especializada en fotografía de retrato, eventos y arte conceptual, trabajo con técnicas 
                tradicionales y modernas para lograr resultados excepcionales que superen las expectativas 
                de mis clientes.
              </p>
              
              <p className="text-lg leading-relaxed">
                Creo firmemente que cada fotografía debe capturar no solo una imagen, sino también 
                el alma y la esencia del momento, creando recuerdos atemporales que perduren para siempre.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 pt-6">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`text-center p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-1000 delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                  <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Skills */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              {/* Profile Image Placeholder */}
              <div className="relative mx-auto w-80 h-80 rounded-3xl overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400 p-1">
                <div className="w-full h-full rounded-3xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Tu Foto Aquí</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-70 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-70 blur-xl"></div>
            </div>

            {/* Skills */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Especialidades</h3>
              
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-purple-600 dark:text-purple-400 font-semibold">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-1000 delay-${index * 100} ${isVisible ? 'w-full' : 'w-0'}`}
                        style={{ width: isVisible ? `${skill.level}%` : '0%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About