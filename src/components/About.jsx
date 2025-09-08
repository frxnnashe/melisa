import React, { useEffect,useState, useRef } from 'react';

const About = () => {
  const [topVisible, setTopVisible] = useState(false);
  const [bottomVisible, setBottomVisible] = useState(false);
  const topRef = useRef(null);
  const centerRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const opts = { threshold: 0.35 };
    const ioTop = new IntersectionObserver(([e]) => setTopVisible(e.isIntersecting), opts);
    const ioBottom = new IntersectionObserver(([e]) => setBottomVisible(e.isIntersecting), opts);

    if (topRef.current) ioTop.observe(topRef.current);
    if (bottomRef.current) ioBottom.observe(bottomRef.current);

    return () => {
      if (topRef.current) ioTop.unobserve(topRef.current);
      if (bottomRef.current) ioBottom.unobserve(bottomRef.current);
    };
  }, []);

  return (
    <section className="py-20 md:py-32 bg-black overflow-hidden">
      {/* Foto superior (reveal ↓) */}
      <div
        ref={topRef}
        className={`max-w-5xl mx-auto px-6 mb-12 transition-all duration-1000 ${
          topVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}
      >
        <img
          src="/about-1.webp"
          alt="Fotografía 1"
          className="w-full h-[60vh] object-cover rounded-2xl shadow-2xl"
        />
      </div>

      {/* Centro: texto "About Me" */}
      <div
        ref={centerRef}
        className={`max-w-3xl mx-auto px-6 text-center my-16 transition-all duration-1000 delay-300 ${
          topVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Me</span>
        </h2>

        <p className="text-lg text-gray-300 leading-relaxed mb-6">
          Soy Melisa Paola Santa Cruz, fotógrafa profesional con más de 15 años de experiencia en
          la Patagonia Argentina. Mi pasión por la fotografía es una herencia de mi abuelo Osvaldo y
          la perfeccioné con estudios en fotoperiodismo y Bellas Artes.
        </p>

        <p className="text-lg text-gray-300 leading-relaxed">
          Actualmente resido en Villa Carlos Paz, donde documento historias de amor, familias y
          paisajes que perduran para siempre. Mi enfoque: capturar emociones reales, sin poses
          forzadas, en lugares que respiran naturaleza.
        </p>

        {/* CTA sutil */}
        <button className="mt-8 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:scale-105 transition-transform">
          Ver mi trabajo
        </button>
      </div>

      {/* Foto inferior (reveal ↑) */}
      <div
        ref={bottomRef}
        className={`max-w-5xl mx-auto px-6 mt-12 transition-all duration-1000 ${
          bottomVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <img
          src="/about-2.webp"
          alt="Fotografía 2"
          className="w-full h-[60vh] object-cover rounded-2xl shadow-2xl"
        />
      </div>
    </section>
  );
};

export default About;