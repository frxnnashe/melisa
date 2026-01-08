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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const bgImages = [
    '/hero/hero-1.webp',
    '/hero/hero-2.webp',
    '/hero/hero-3.webp',
    '/hero/hero-4.webp',
    '/hero/hero-5.webp',
    '/hero/hero-6.webp',
  ];

  const navItems = [
    { label: 'Inicio', href: '' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Precios', href: '#services' },
    { label: 'Contacto', href: '#footer' },
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

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    // Pequeño delay para que la animación del menú se complete antes de hacer scroll
    setTimeout(() => {
      if (href) {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 300);
  };

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
      <nav className="relative z-50 p-6 md:p-8">
        <div className="flex items-center justify-between">
          <div
            className={`transition-all duration-1000 delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
          >
            <h1 className="text-white font-light text-base md:text-lg tracking-[0.2em] uppercase">
              Melisa Santa Cruz
            </h1>
            <div className="h-px bg-gradient-to-r from-white/60 to-transparent w-24 md:w-32 mt-2" />
          </div>

          {/* Desktop Menu */}
          <div
            className={`hidden md:flex items-center gap-8 transition-all duration-1000 delay-500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
          >
            {navItems.map((item, idx) => (
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 transition-all duration-1000 delay-500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`md:hidden fixed inset-0 bg-black/95 backdrop-blur-md transition-all duration-500 ${
            mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          style={{ top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navItems.map((item, idx) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`text-white text-2xl font-light tracking-wider uppercase transition-all duration-500 relative group ${
                  mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: mobileMenuOpen ? `${idx * 100 + 200}ms` : '0ms' }}
              >
                {item.label}
                <span className="absolute -bottom-2 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Contenido */}
      <div className="relative z-40 h-full flex items-center justify-center px-6 md:px-8 -mt-20 md:-mt-0">
        <div className="text-center max-w-4xl">
          <div
            className={`transition-all duration-1000 delay-900 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-white text-5xl md:text-8xl font-extralight leading-none mb-6 md:mb-8 tracking-tight">
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
            <p className="text-white/70 text-base md:text-xl font-light leading-relaxed mb-12 max-w-2xl mx-auto px-4">
              Narrando historias con luz, mi trabajo es crear retratos que capturan emociones y recuerdos que atesoras para siempre. Con base en la Patagonia, viajó a donde el amor me lleve para documentar tu historia en lugares que respiren naturaleza.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;