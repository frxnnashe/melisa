import React, { useRef, useState, useEffect } from 'react';

const SocialProof = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  // --- DATOS DE RESEÑAS ---
  const reviews = [
    {
      id: 1,
      name: "Natalia",
      title: "Gracias Melisa!!",
      text: "Nuestra experiencia con Melisa fue excelente, desde nuestra entrevista inicial nos generó confianza y destacamos su trato amable y cálido. Estuvo siempre predispuesta a responder nuestras dudas y al momento del evento nos acompañó en cada momento, desde los preparativos, la ceremonia y la fiesta hasta la última canción! Supo retratar los momentos más importantes de manera espontánea y pudo captar la esencia y el clima de nuestra boda. Nos dejó fotos preciosas que son un recuerdo para toda la vida de este día tan especial. La recomiendo una y mil veces, gracias!! ❤️",
      stars: 5,
      date: "20/02/2025"
    },
    {
      id: 2,
      name: "Sol & Darko",
      title: "Boda Darko & Sol",
      text: "Estamos muy felices de haber compartido un momento tan especial para nosotros junto a Meli, además de ser una excelente profesional es una muy buena persona que contagia su buena onda! Muchas GRACIAS Meli!",
      stars: 5,
      date: "19/01/2023"
    },
    {
      id: 3,
      name: "Maximiliano",
      title: "Casamiento",
      text: "La experiencia que tuvimos con mi esposa fue la mejor, Melisa estuvo siempre a disposición de todo lo que necesitábamos y nos quedaron unas fotos hermosas de uno de los mejores días de nuestras vidas.",
      stars: 5,
      date: "24/10/2024"
    },
    {
        id: 4,
        name: "Nahir",
        title: "Todo muy lindo",
        text: "Nos gustó mucho la cobertura que hizo de la pre boda y toda la boda. Las fotos y clips nos encantaron y la recomendamos, nos hizo sentir muy cómodos",
        stars: 5,
        date: "11/04/2025"
      }
  ];

  // --- DATOS DE PREMIOS (Los 3 grandes) ---
  const awards = [
    { id: 1, name: 'Casamientos.com', src: '/premio-1.webp' },
    { id: 2, name: 'Weddings Awards 2025', src: '/premio-2.webp' },
    { id: 3, name: 'Weddings Awards 2024', src: '/premio-3.webp' },
  ];

  const renderStars = (count) => {
    return Array.from({ length: count }).map((_, i) => (
      <span key={i} className="text-amber-400 text-lg">★</span>
    ));
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-24 bg-[#0a0a0a] text-white border-t border-white/5"
    >
      <div 
        className={`max-w-7xl mx-auto px-4 md:px-8 transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        
        {/* ==================================
            SECCIÓN 1: RESEÑAS
           ================================== */}
        <div className="text-center mb-16">
          <h2 
            className="text-3xl md:text-5xl font-light mb-4"
            style={{ fontFamily: `'Playfair Display', serif` }}
          >
            La Experiencia
          </h2>
          <p className="text-gray-400 font-light tracking-wide uppercase text-xs md:text-sm">
            Sus palabras, nuestra mayor satisfacción
          </p>
        </div>

        {/* Grid de reseñas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-white/5 p-8 rounded-sm relative border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col hover:-translate-y-1 group"
            >
              <div className="text-7xl text-white/10 font-serif absolute top-2 left-4 leading-none pointer-events-none">“</div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="font-serif text-xl tracking-wide text-white/90">
                    {review.name}
                    </h4>
                    <span className="text-gray-500 text-xs">{review.date}</span>
                </div>
                
                <div className="mb-4 flex gap-1">
                    {renderStars(review.stars)}
                </div>

                <h5 className="text-lg font-medium mb-3 text-white/80">{review.title}</h5>

                <p className="text-gray-300 font-light italic leading-relaxed text-sm md:text-base">
                    "{review.text}"
                </p>
              </div>
            </div>
          ))}
        </div>


        {/* ==================================
            SECCIÓN 2: PREMIOS (GIGANTES)
           ================================== */}
        <div className="relative py-20 border-t border-white/10 mt-12">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0a0a0a] px-6 py-1">
             <span className="text-gray-400 text-xs uppercase tracking-[0.2em]">Reconocimientos</span>
          </div>

          {/* CAMBIOS APLICADOS:
             1. Usamos 'h-40 md:h-64' para darles muchísima altura.
             2. 'w-auto' para que no se deformen.
             3. 'gap-12 md:gap-24' para que tengan aire entre ellos.
          */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-16 md:gap-32 mt-12">
            {awards.map((award) => (
               <div key={award.id} className="group flex flex-col items-center">
                  <div className="relative h-48 md:h-72 w-48 md:w-72 flex items-center justify-center p-2 transition-transform duration-500 hover:scale-110">
                    <img 
                        src={award.src} 
                        alt={award.name}
                        // Quitamos grayscale inicial para que se vean imponentes siempre, o lo dejamos sutil
                        // Aquí lo dejo con filtro grayscale suave que se va al hover
                        className="h-full w-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                    />
                  </div>
                  {/* Etiqueta opcional debajo del premio */}
                  <span className="mt-4 text-xs uppercase tracking-widest text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {award.name}
                  </span>
               </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SocialProof;