import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [bgIndex, setBgIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const bgImages = [
    '/hero/hero-1.webp',
    '/hero/hero-2.webp', 
    '/hero/hero-3.webp',
    '/hero/hero-4.webp',
    '/hero/hero-5.webp',
    'hero/hero-6.webp',
  ];

  // Cambio automático de imágenes
  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((i) => (i + 1) % bgImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [bgImages.length]);

  // Efecto parallax sutil
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animación de carga
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);



  return (
    <div className="relative h-screen overflow-hidden bg-black">
      {/* Contenedor de imágenes de fondo */}
      <div className="absolute inset-0">
        {bgImages.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-all duration-2000 ease-in-out ${
              i === bgIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px) scale(${i === bgIndex ? 1.02 : 1.05})`,
            }}
          />
        ))}
        
        {/* Gradiente cinematográfico */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </div>

      {/* Navegación minimalista */}
      <nav className="relative z-50 p-8">
        <div className="flex items-center justify-between">
          <div className={`transition-all duration-1000 delay-300 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}>
            <h1 className="text-white font-light text-lg tracking-[0.2em] uppercase">
              Melisa Santa Cruz
            </h1>
            <div className="h-px bg-gradient-to-r from-white/60 to-transparent w-32 mt-2" />
          </div>
          
          <div className={`hidden md:flex items-center gap-8 transition-all duration-1000 delay-500 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}>
            {['Inicio', 'Portfolio', 'About', 'Contacto'].map((item, idx) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white/80 hover:text-white text-sm font-light tracking-wider uppercase transition-colors duration-300 relative group"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="relative z-40 h-full flex items-center justify-center px-8">
        <div className="text-center max-w-4xl">
          <div className={`transition-all duration-1000 delay-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          </div>
          
          <div className={`transition-all duration-1000 delay-900 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-white text-6xl md:text-8xl font-extralight leading-none mb-8 tracking-tight">
              Historias
              <br />
              <span className="italic font-light bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
                Autenticas
              </span>
            </h2>
          </div>
          
          <div className={`transition-all duration-1000 delay-1100 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <p className="text-white/70 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-2xl mx-auto">
             Narrando historias con luz, mi trabajo es crear retratos que capturan emociones y recuerdos que atesoras para siempre. Con base en la Patagonia, viajó a donde el amor me lleve para documentar tu historia en lugares que respiran naturaleza.
            </p>
          </div>
          

        </div>
      </div>



      {/* Marco cinematográfico */}
      <div className="absolute inset-0 pointer-events-none z-30">
        <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-white/20" />
        <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-white/20" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-white/20" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-white/20" />
      </div>

      {/* Efecto de textura sutil */}
      <div className="absolute inset-0 opacity-5 pointer-events-none z-20">
        <div className="w-full h-full bg-gradient-to-br from-transparent via-white/5 to-transparent animate-pulse" />
      </div>
    </div>
  );
};

export default Hero;