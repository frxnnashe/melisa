import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [bgIndex, setBgIndex] = useState(0);          // ← índice del fondo

  /* ---------- 1. Fotos del fondo (poné las tuyas) ---------- */
  const bgImages = [
    '/hero/hero-1.webp',
    '/hero/hero-2.webp',
    '/hero/hero-3.webp',
    '/hero/hero-4.webp',
  ];

  /* ---------- 2. Cambio automático cada 5 s ---------- */
  useEffect(() => {
    const t = setInterval(() => {
      setBgIndex((i) => (i + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(t);
  }, [bgImages.length]);

  /* ---------- 3. Parallax con mouse ---------- */
  useEffect(() => {
    const handle = (e) =>
      setMousePos({ x: (e.clientX / window.innerWidth) * 100,
                    y: (e.clientY / window.innerHeight) * 100 });
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  const scrollToPortfolio = () =>
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <header
      id="home"
      className="relative h-screen flex flex-col text-white overflow-hidden"
    >
      {/* Capa de imágenes con cross-fade */}
      <div className="absolute inset-0">
        {bgImages.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              i === bgIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
        {/* Overlay oscuro para que el texto se lea siempre */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Parallax radial dinámico (encima del fondo) */}
      <div
        className="absolute inset-0 opacity-40 transition-all duration-500"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(251, 146, 60, .35) 0%, transparent 60%)`,
        }}
      />

      {/* Nav y contenido igual que antes */}
      <nav className="relative z-20 container mx-auto px-6 py-6 flex items-center justify-between">
        <h1 className="text-xl font-light tracking-widest uppercase">
          Melisa Santa Cruz
        </h1>
        <ul className="hidden md:flex gap-6 text-sm tracking-wide">
          {['Inicio','Sobre mí','Portafolio','Servicios','Contacto'].map((l) => (
            <li key={l}>
              <a href={`#${l.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}`}
                 className="hover:text-amber-300 transition">
                {l}
              </a>
            </li>
          ))}
        </ul>
        <button className="md:hidden p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      <div className="relative z-10 container mx-auto px-6 flex-1 flex items-center justify-center">
        <div className="max-w-3xl text-center space-y-6">
          <p className="text-amber-200 text-sm tracking-widest uppercase">
            Fotógrafa de Bodas & Elopments
          </p>
          <h2 className="text-5xl md:text-7xl font-light italic leading-tight text-white">
            Historias auténticas <br />
            <span className="text-amber-300">en cada instante</span>
          </h2>
          <p className="text-stone-200 max-w-xl mx-auto">
            Con base en la Patagonia, viajo donde el amor me lleve para capturar
            emociones reales, sin poses forzadas, en lugares que respiran naturaleza.
          </p>
          <div className="pt-4">
            <button
              onClick={scrollToPortfolio}
              className="group inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-white font-medium hover:shadow-xl hover:shadow-amber-500/30 transition-all"
            >
              Ver mi trabajo
              <svg className="w-5 h-5 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll-indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 border border-stone-400 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-stone-300 rounded-full mt-2" />
        </div>
      </div>

      {/* Partículas flotantes */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-amber-400/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${4 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </header>
  );
};

export default Hero