import React, { useState, useEffect, useRef } from 'react';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('bodas'); // ← arranca en bodas
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setIsVisible(true),
      { threshold: 0.2 }
    );
    const el = sectionRef.current;
    if (el) io.observe(el);
    return () => el && io.unobserve(el);
  }, []);

  /* ---------- CATEGORÍAS (sin "Todos") ---------- */
  const categories = [
    { id: 'bodas', name: 'Bodas' },
    { id: 'retratos', name: 'Retratos' },
    { id: 'eventos', name: 'Eventos' },
    { id: 'productos', name: 'Productos' },
    { id: 'arte-y-talleres', name: 'Arte y Talleres' },
  ];

  /* ---------- ITEMS ---------- */
  const portfolioItems = [
    /* Bodas */
    { id: 1, category: 'bodas', title: 'Boda-1', image: '/boda-1.webp' },
    { id: 2, category: 'bodas', title: 'Boda-2', image: '/boda-2.webp' },
    { id: 3, category: 'bodas', title: 'Boda-3', image: '/boda-3.webp' },
    { id: 4, category: 'bodas', title: 'Boda-3', image: '/boda-4.webp' },
    { id: 5, category: 'bodas', title: 'Boda-3', image: '/boda-5.webp' },
    { id: 6, category: 'bodas', title: 'Boda-3', image: '/boda-6.webp' },
    { id: 7, category: 'bodas', title: 'Boda-3', image: '/boda-7.webp' },
    { id: 8, category: 'bodas', title: 'Boda-3', image: '/boda-8.webp' },
    { id: 9, category: 'bodas', title: 'Boda-3', image: '/boda-9.webp' },
    { id: 10, category: 'bodas', title: 'Boda-3', image: '/boda-10.webp' },
    { id: 11, category: 'bodas', title: 'Boda-3', image: '/boda-11.webp' },
    { id: 12, category: 'bodas', title: 'Boda-3', image: '/boda-12.webp' },
    { id: 13, category: 'bodas', title: 'Boda-3', image: '/boda-13.webp' },
    { id: 14, category: 'bodas', title: 'Boda-3', image: '/boda-14.webp' },
    { id: 15, category: 'bodas', title: 'Boda-3', image: '/boda-15.webp' },
    /* Retratos (vacío de momento) */
    /* Eventos (vacío de momento) */
    /* Productos (vacío de momento) */
    /* Arte y Talleres (vacío de momento) */
  ];

  /* ---------- FILTRO ---------- */
  const filtered = portfolioItems.filter((i) => i.category === selectedCategory);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-20  left-10  w-72 h-72 bg-purple-300/10 dark:bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-300/10  dark:bg-pink-500/5  rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center space-y-4 mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Mi{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Portfolio
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Una colección de mis trabajos más destacados
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto" />
        </div>

        {/* Filtros (sin “Todos”) */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {categories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-transform hover:scale-105 ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-purple-50 dark:hover:bg-gray-600'
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid (solo categoría activa) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item, i) => (
            <div
              key={item.id}
              className={`group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ animationDelay: `${i * 150}ms` }}
              onClick={() => setSelectedImage(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;