import React, { useState, useEffect, useRef } from 'react';

const AbstractMasonryPortfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('bodas');
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );
    const el = sectionRef.current;
    if (el) io.observe(el);
    return () => el && io.unobserve(el);
  }, []);

  const categories = [
    { id: 'bodas', name: 'Bodas' },
    { id: 'retratos', name: 'Retratos' },
    { id: 'eventos', name: 'Eventos' },
  ];

  const portfolioItems = [
    ...Array.from({ length: 24 }, (_, i) => ({
      id: `boda-${i + 1}`,
      category: 'bodas',
      image: `/boda-${i + 1}.webp`,
      height: ['h-64', 'h-80', 'h-96', 'h-72'][i % 4],
    })),
    ...Array.from({ length: 26
     }, (_, i) => ({
      id: `retrato-${i + 1}`,
      category: 'retratos',
      image: `/retrato-${i + 1}.webp`,
      height: ['h-80', 'h-96', 'h-64'][i % 3],
    })),
    ...Array.from({ length: 14 }, (_, i) => ({
      id: `evento-${i + 1}`,
      category: 'eventos',
      image: `/evento-${i + 1}.webp`,
      height: ['h-50', 'h-60'][i % 2],
    })),
  ];

  const filtered = portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <section ref={sectionRef} className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Título con nueva fuente */}
        <h2
          className="text-6xl md:text-7xl font-light tracking-wide text-center mb-16"
          style={{ fontFamily: `'Playfair Display', serif` }}
        >
          Galería
        </h2>

        {/* Selector de categorías */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Galería masonry */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {filtered.map((item, i) => (
            <div
              key={item.id}
              className={`break-inside-avoid group cursor-pointer transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
              onClick={() => setSelectedImage(item)}
            >
              <div className="relative overflow-hidden rounded-xl bg-white/5 border border-white/10">
                <img
                  src={item.image}
                  alt=""
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${item.height}`}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-lg flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage.image}
            alt=""
            className="max-w-full max-h-[90vh] rounded-lg"
            onClick={e => e.stopPropagation()}
          />
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white/60 hover:text-white"
          >
            Cerrar
          </button>
        </div>
      )}
    </section>
  );
};

export default AbstractMasonryPortfolio;