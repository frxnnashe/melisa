import React, { useState, useEffect } from 'react';

// Función para precargar imágenes
const preloadImages = (imageUrls) => {
  return Promise.all(
    imageUrls.map(url => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => resolve(url);
        img.src = url;
      });
    })
  );
};

const Hero = () => {
  const [bgIndex, setBgIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imagesReady, setImagesReady] = useState(false);

  const bgImages = [
    '/hero/hero-1.webp',
    '/hero/hero-2.webp',
    '/hero/hero-3.webp',
    '/hero/hero-4.webp',
    '/hero/hero-5.webp',
    '/hero/hero-6.webp',
  ];

  useEffect(() => {
    // Precargar todas las imágenes del hero
    preloadImages(bgImages).then(() => {
      setImagesReady(true);
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    // Solo iniciar el carrusel cuando las imágenes estén listas
    if (!imagesReady) return;
    
    const timer = setInterval(() => {
      setBgIndex(i => (i + 1) % bgImages.length);
    }, 4000);
    
    return () => clearInterval(timer);
  }, [imagesReady, bgImages.length]);

  return (
    <div id="inicio" className="relative h-screen overflow-hidden bg-gray-900">
      {/* Fondos */}
      <div className="absolute inset-0">
        {bgImages.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
              i === bgIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: imagesReady ? `url(${src})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </div>

      {/* Nav con anclas */}
      <nav className="relative z-50 p-8">
        <div className="flex items-center justify-between">
          <div
            className={`transition-all duration-1000 delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
          >
            <h1 className="text-white font-light text-lg tracking-[0.2em] uppercase">
              Melisa Santa Cruz
            </h1>
            <div className="h-px bg-gradient-to-r from-white/60 to-transparent w-32 mt-2" />
          </div>

          <div
            className={`hidden md:flex items-center gap-8 transition-all duration-1000 delay-500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
          >
            {[
              { label: 'Inicio', href: '' },
              { label: 'Portfolio', href: '#portfolio' },
              { label: 'Precios', href: '#services' },
              { label: 'Contacto', href: '#footer' },
            ].map((item, idx) => (
              <a
                key={item.label}
                href={item.href}
                className="text-white/80 hover:text-white text-sm font-light tracking-wider uppercase transition-colors duration-300 relative group focus:outline-none"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Contenido */}
      <div className="relative z-40 h-full flex items-center justify-center px-8">
        <div className="text-center max-w-4xl">
          <div
            className={`transition-all duration-1000 delay-900 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-white text-6xl md:text-8xl font-extralight leading-none mb-8 tracking-tight">
              Historias
              <br />
              <span className="italic font-light bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
                Auténticas
              </span>
            </h2>
          </div>

          <div
            className={`transition-all duration-1000 delay-1100 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-white/70 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-2xl mx-auto">
              Narrando historias con luz, mi trabajo es crear retratos que capturan emociones y recuerdos que atesoras para siempre. Con base en la Patagonia, viajó a donde el amor me lleve para documentar tu historia en lugares que respiren naturaleza.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;