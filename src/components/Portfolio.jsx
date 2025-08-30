import React, { useState, useEffect, useRef } from 'react'

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isVisible, setIsVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
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

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'portrait', name: 'Retratos' },
    { id: 'wedding', name: 'Bodas' },
    { id: 'product', name: 'Producto' },
    { id: 'nature', name: 'Naturaleza' },
    { id: 'event', name: 'Eventos' }
  ]

  const portfolioItems = [
    { id: 1, category: 'portrait', title: 'Retrato Elegante', description: 'Sesión de retrato con iluminación natural', image: '/api/placeholder/400/600' },
    { id: 2, category: 'wedding', title: 'Momento Especial', description: 'Capturando la emoción del gran día', image: '/api/placeholder/600/400' },
    { id: 3, category: 'product', title: 'Fotografía Comercial', description: 'Destacando la esencia del producto', image: '/api/placeholder/400/400' },
    { id: 4, category: 'nature', title: 'Paisaje Dorado', description: 'La belleza natural en su máximo esplendor', image: '/api/placeholder/600/400' },
    { id: 5, category: 'portrait', title: 'Expresión Auténtica', description: 'Retrato que captura la personalidad', image: '/api/placeholder/400/500' },
    { id: 6, category: 'event', title: 'Celebración Corporativa', description: 'Momentos profesionales memorables', image: '/api/placeholder/500/400' },
    { id: 7, category: 'wedding', title: 'Romance Eterno', description: 'El amor capturado en cada detalle', image: '/api/placeholder/400/600' },
    { id: 8, category: 'product', title: 'Estilo de Vida', description: 'Productos en contextos reales', image: '/api/placeholder/400/400' },
    { id: 9, category: 'nature', title: 'Serenidad Natural', description: 'La calma de la naturaleza', image: '/api/placeholder/600/400' }
  ]

  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory)

  return (
    <section 
      id="portfolio" 
      ref={sectionRef}
      className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/10 dark:bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-300/10 dark:bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className={`text-center space-y-4 mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Mi <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Portfolio</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Una colección de mis trabajos más destacados, cada uno contando una historia única a través del lente
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto"></div>
        </div>

        {/* Filter Buttons */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className={`group relative rounded-2xl overflow-hidden bg-white dark:bg-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ animationDelay: `${index * 150}ms` }}
              onClick={() => setSelectedImage(item)}
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 opacity-20"></div>
                <div className="w-full h-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-500 text-sm">{item.title}</p>
                  </div>
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-white/80">{item.description}</p>
                  </div>
                </div>

                {/* Zoom Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Image Preview */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setSelectedImage(null)}>
            <div className="relative max-w-4xl w-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="aspect-video bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <svg className="w-20 h-20 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">{selectedImage.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{selectedImage.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{selectedImage.description}</p>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Portfolio