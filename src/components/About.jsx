import React, { useState, useEffect, useRef } from "react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [glitchTxt, setGlitchTxt] = useState("Fotografía");
  const sectionRef = useRef(null);

  /* IntersectionObserver para disparar animaciones */
  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.35 }
    );
    const el = sectionRef.current;
    if (el) io.observe(el);
    return () => el && io.unobserve(el);
  }, []);

  /* Efecto “glitch” del título mientras scrolleás */
  useEffect(() => {
    if (!isVisible) return;
    const words = ["Fotografía", "Arte", "Emociones", "Recuerdos"];
    let i = 0;
    const t = setInterval(() => {
      setGlitchTxt(words[(i = ++i % words.length)]);
    }, 1800);
    return () => clearInterval(t);
  }, [isVisible]);

  /* Pasión cards con data */
  const passions = [
    {
      emoji: "📸",
      title: "Retratos con Alma",
      desc: "Cada rostro cuenta una historia única.",
    },
    {
      emoji: "🎞️",
      title: "Análogo + Digital",
      desc: "Mezclo lo mejor de dos mundos.",
    },
    {
      emoji: "💡",
      title: "Light-Painting",
      desc: "La luz es mi lienzo en tiempo real.",
    },
    {
      emoji: "🌌",
      title: "Astro-Fotografía",
      desc: "Capturar el universo en una gota de tiempo.",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black overflow-hidden"
    >
      {/* Decorators */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT: TEXT + STATS */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            {/* Glitch title */}
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
              Sobre{" "}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                {glitchTxt}
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 blur-sm opacity-30 animate-pulse" />
              </span>
            </h2>

            {/* Bio */}
            <div className="space-y-4 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              <p>
                Soy Melisa Paola Santa Cruz, fotógrafa profesional con más de 15
                años de experiencia, 6 de ellos en San Carlos de Bariloche, en
                el corazón de la Patagonia Argentina. Mi pasión por la
                fotografía es una herencia de mi abuelo Osvaldo, y la
                perfeccioné con estudios en fotoperiodismo y la Escuela de
                Bellas Artes L. Spilimbero.
              </p>
              <p>
                Tuve la oportunidad de viajar a México, Brasil y España con una
                cámara en mano, lo cual afianzó mi pasión por la fotografía, la
                cual considero un excelente medio de expresión. Con el tiempo,
                me especialicé en fotografía de bodas en la Patagonia y en
                destino, documentando historias de amor. Actualmente soy
                fotógrafa residente en el Hotel Llao Llao para Bariloche Foto
                Tour.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { n: "500+", l: "Proyectos" },
                { n: "15+", l: "Años" },
                { n: "250+", l: "Clientes" },
                { n: "50+", l: "Premios" },
              ].map((s, i) => (
                <div
                  key={i}
                  className={`group relative p-4 rounded-2xl bg-white/40 dark:bg-gray-800/40 backdrop-blur border border-white/20 dark:border-gray-700/30 transition-all duration-700 hover:scale-105 hover:shadow-xl ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${150 * i}ms` }}
                >
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {s.n}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {s.l}
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: IMAGE + PASSIONS */}
          <div
            className={`space-y-10 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            {/* Glass-frame image */}
            <div className="group relative w-full max-w-md mx-auto">
              <div className="absolute -inset-1.5 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl blur-lg opacity-70 group-hover:opacity-100 transition duration-500" />
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl transform group-hover:rotate-3 group-hover:scale-105 transition-transform duration-500">
                <img
                  src="portada.webp"
                  alt="Retratos"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>

            {/* Pasión cards con 3-D hover */}
            <div className="grid grid-cols-2 gap-4">
              {passions.map((p, i) => (
                <div
                  key={i}
                  className={`group relative p-4 rounded-2xl bg-white/30 dark:bg-gray-800/30 backdrop-blur border border-white/20 dark:border-gray-700/30 transition-all duration-700 hover:!scale-105 hover:z-10 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                  style={{
                    transitionDelay: `${200 * i}ms`,
                    perspective: "800px",
                  }}
                >
                  <div className="transform-gpu transition-transform duration-300 group-hover:[transform:rotateY(8deg)_rotateX(-4deg)]">
                    <div className="text-3xl mb-2">{p.emoji}</div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {p.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
