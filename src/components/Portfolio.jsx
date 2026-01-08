import React, { useState, useEffect, useRef } from "react";
const preloadImages = (imageUrls) => {
  return Promise.all(
    imageUrls.map((url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => resolve(url);
        img.src = url;
      });
    })
  );
};

// Componente LazyImage - Carga las imágenes solo cuando son visibles
const LazyImage = ({ src, alt, className, onClick }) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const img = imgRef.current;
          img.src = src;
          img.onload = () => setLoaded(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "100px", // Empieza a cargar 100px antes de que sea visible
      }
    );

    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [src]);

  return (
    <img
      ref={imgRef}
      alt={alt}
      className={`${className} ${
        loaded ? "opacity-100" : "opacity-0"
      } transition-opacity duration-500`}
      onClick={onClick}
    />
  );
};

// DATOS DEL PORTFOLIO
const weddingsCouples = [
  {
    couple: "Sol & Darko",
    location: "",
    images: Array.from({ length: 3 }, (_, i) => `/boda-sol-${i + 1}.webp`),
  },
  {
    couple: "Seba & Marian",
    location: "",
    images: Array.from({ length: 3 }, (_, i) => `/boda-seba-${i + 1}.webp`),
  },
  {
    couple: "Claudia & Pica",
    location: "Cervecería Patagonia",
    images: Array.from({ length: 3 }, (_, i) => `/boda-claudia-${i + 1}.webp`),
  },
  {
    couple: "Maxi & Cami",
    location: "Capilla San Eduardo, Bariloche",
    images: Array.from({ length: 3 }, (_, i) => `/boda-maxi-${i + 1}.webp`),
  },
  {
    couple: "Nahir y Juan",
    location: "Americana Lago Gutierrez, Bariloche",
    images: Array.from({ length: 2 }, (_, i) => `/boda-nahir-${i + 1}.webp`),
  },
  {
    couple: "Natalia y Pablo",
    location: "Americana Lago Guitierrez",
    images: Array.from({ length: 6 }, (_, i) => `/boda-natalia-${i + 1}.webp`),
  },
  {
    couple: "Marcelo & Michelli",
    location: "Hotel Llao Llao",
    images: Array.from({ length: 3 }, (_, i) => `/boda-marcelo-${i + 1}.webp`),
  },
  {
    couple: "Barby & Luis",
    location: "Villa Angostura, Patagonia",
    images: Array.from({ length: 3 }, (_, i) => `/boda-barby-${i + 1}.webp`),
  },
  {
    couple: "Ema & Made",
    location: "Club Suizo, Bariloche",
    images: Array.from({ length: 6 }, (_, i) => `/boda-ema-${i + 1}.webp`),
  },
  {
    couple: "Taty & Eloy",
    location: "Club Suizo, Bariloche",
    images: Array.from({ length: 12 }, (_, i) => `/boda-taty-${i + 1}.webp`),
  },
];

const partyImages = Array.from(
  { length: 5 },
  (_, i) => `/fiesta-${i + 1}.webp`
);
const momentsImages = Array.from(
  { length: 10 },
  (_, i) => `/instante-${i + 1}.webp`
);
const postWeddingImages = Array.from(
  { length: 3 },
  (_, i) => `/postboda-${i + 1}.webp`
);

const portraitsPart1 = [
  {
    title: "Sesión exclusiva retratos personalizados, parejas y familias.",
    description: "Momentos únicos y mucho más...",
    images: Array.from({ length: 6 }, (_, i) => `/sesiones-${i + 1}.webp`),
  },
  {
    title: "Pedida de mano sorpresa en Bariloche",
    description: "",
    images: Array.from({ length: 2 }, (_, i) => `/pedida-${i + 1}.webp`),
  },
  {
    title: "Primavera",
    description: "Flores y colores vibrantes",
    images: Array.from({ length: 6 }, (_, i) => `/primavera-${i + 1}.webp`),
  },
  {
    title: "Verano",
    description: "Lagos turquesas y atardeceres tardíos",
    images: Array.from({ length: 8 }, (_, i) => `/verano-${i + 1}.webp`),
  },
  {
    title: "Otoño",
    description: "Tonos ocres y dorados increíbles",
    images: Array.from({ length: 7 }, (_, i) => `/otoño-${i + 1}.webp`),
  },
  {
    title: "Invierno",
    description: "Magia bajo la nieve y paisajes blancos. Tus recuerdos más preciados",
    images: Array.from({ length: 7 }, (_, i) => `/invierno-${i + 1}.webp`),
  },
];

const portraitsPart2 = [
  {
    images: Array.from({ length: 3 }, (_, i) => `/locaciones-${i + 1}.webp`),
  },
  {
    title: "Circuito Chico",
    description: "Bahía López - Punto panorámico - Golf de Llao Llao",
    images: Array.from({ length: 3 }, (_, i) => `/circuito-${i + 1}.webp`),
  },
  {
    title: "Estepa y Mirador de Valle encantados",
    description: "Paisajes inmensos y rocosos",
    images: Array.from({ length: 5 }, (_, i) => `/estepa-${i + 1}.webp`),
  },
  {
    title: "Base del Cerro Catedral",
    description: "Montaña y aventura",
    images: Array.from({ length: 3 }, (_, i) => `/catedral-${i + 1}.webp`),
  },
];

const eventsData = Array.from({ length: 8 }, (_, i) => ({
  src: `/evento-${i + 1}.webp`,
}));

export {
  LazyImage,
  preloadImages,
  weddingsCouples,
  partyImages,
  momentsImages,
  postWeddingImages,
  portraitsPart1,
  portraitsPart2,
  eventsData,
};

const PortfolioDocumental = () => {
  const [selectedCategory, setSelectedCategory] = useState("bodas");
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const sectionRef = useRef(null);

  const categories = [
    { id: "bodas", name: "Historias de Bodas" },
    { id: "retratos", name: "Sesiones & Retratos" },
    { id: "eventos", name: "Eventos" },
  ];

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setIsVisible(true);
          const firstWeddingImages = [
            "/boda-sol-1.webp",
            "/boda-sol-2.webp",
            "/boda-sol-3.webp",
          ];
          // Usar la función preloadImages importada
          // preloadImages(firstWeddingImages);
        }
      },
      { threshold: 0.1 }
    );
    const el = sectionRef.current;
    if (el) io.observe(el);
    return () => el && io.unobserve(el);
  }, []);

  // Componente para renderizar grupos de imágenes (retratos)
  const RenderGroup = ({ group }) => {
    const isTwoColumns = group.images.length === 2;
    const gridClass = isTwoColumns
      ? "md:grid-cols-2 max-w-5xl mx-auto"
      : "md:grid-cols-3";
    const heightClass = isTwoColumns ? "h-80 md:h-[500px]" : "h-64 md:h-80";

    return (
      <div className="mb-24 last:mb-0">
        {group.title && (
          <div className="text-center mb-8 px-4">
            <h3 className="text-2xl md:text-3xl font-serif text-white/90 mb-2">
              {group.title}
            </h3>
            {group.description && (
              <p className="text-gray-400 text-sm font-light tracking-widest uppercase">
                {group.description}
              </p>
            )}
          </div>
        )}
        <div className={`grid grid-cols-1 ${gridClass} gap-4`}>
          {group.images.map((imgSrc, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage({ image: imgSrc })}
              className={`${heightClass} relative overflow-hidden cursor-pointer group bg-gray-900`}
            >
              {/* Usa LazyImage importado */}
              <img
                src={imgSrc}
                alt={group.title || "Portfolio"}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="py-20 bg-[#0a0a0a] text-white min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2
          className="text-5xl md:text-7xl font-light tracking-wide text-center mb-12"
          style={{ fontFamily: `'Playfair Display', serif` }}
        >
          Portfolio
        </h2>

        {/* Botones de categorías */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2 rounded-full text-sm uppercase tracking-widest transition-all duration-300 border ${
                selectedCategory === cat.id
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-gray-400 border-transparent hover:text-white hover:border-white/30"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Contenido del portfolio */}
        <div>
          {selectedCategory === "bodas" && (
            <div className="space-y-32" key="bodas-content">
              <div className="text-center max-w-3xl mx-auto px-6 py-10 border-b border-white/10">
                <h3
                  className="text-4xl md:text-5xl font-serif mb-6"
                  style={{ fontFamily: `'Playfair Display', serif` }}
                >
                  La Boda
                </h3>
                <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed">
                  Un servicio de fotografía con estilo documental, desde los
                  preparativos, la ceremonia, sesión de retratos de pareja, la
                  celebración, la fiesta y hasta la última canción.
                </p>
              </div>

              {weddingsCouples.map((wedding, wIndex) => {
                const isTwoPhotos = wedding.images.length === 2;
                const gridClass = isTwoPhotos
                  ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto"
                  : "grid-cols-1 md:grid-cols-3";

                // Las primeras 2 bodas se cargan EAGER
                const shouldEagerLoad = wIndex < 2;

                return (
                  <div key={wIndex}>
                    <div className="text-center mb-8">
                      <h3 className="text-3xl md:text-4xl font-serif mb-2">
                        {wedding.couple}
                      </h3>
                      {wedding.location && (
                        <p className="text-gray-400 text-sm uppercase tracking-widest">
                          {wedding.location}
                        </p>
                      )}
                    </div>

                    <div className={`grid gap-4 ${gridClass}`}>
                      {wedding.images.map((imgSrc, idx) => (
                        <div
                          key={idx}
                          onClick={() => setSelectedImage({ image: imgSrc })}
                          className={`${
                            isTwoPhotos ? "h-80 md:h-96" : "h-64 md:h-80"
                          } relative overflow-hidden cursor-pointer group bg-gray-900`}
                        >
                          <img
                            src={imgSrc}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            alt={wedding.couple}
                            loading={shouldEagerLoad ? "eager" : "lazy"}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Sección: La Fiesta */}
              <div>
                <div className="text-center mb-10">
                  <span className="inline-block w-16 h-[1px] bg-white/30 mb-6"></span>
                  <h3 className="text-4xl md:text-5xl font-serif mb-2">
                    Bodas - La Fiesta
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {partyImages.map((imgSrc, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedImage({ image: imgSrc })}
                      className="h-60 md:h-72 relative overflow-hidden cursor-pointer group bg-gray-900"
                    >
                      <img
                        src={imgSrc}
                        alt="Fiesta de boda"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Sección: Momentos en una Boda */}
              <div className="py-12 text-center bg-white/5 rounded-sm">
                <h3 className="text-3xl md:text-5xl font-serif italic text-white/90 px-4 leading-normal mb-12">
                  "En un instante en una Boda..."
                  <br />
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-12">
                  {momentsImages.map((imgSrc, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedImage({ image: imgSrc })}
                      className="h-80 relative overflow-hidden cursor-pointer group shadow-lg bg-gray-900"
                    >
                      <img
                        src={imgSrc}
                        alt="Momento especial"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>

                <h3 className="text-2xl md:text-3xl font-serif italic text-white/60 px-4 mt-12">
                  ...todo puede suceder.
                </h3>
              </div>

              {/* Sección: Postboda */}
              <div>
                <div className="text-center max-w-3xl mx-auto px-6 mb-12">
                  <h3 className="text-4xl md:text-5xl font-serif mb-6">
                    Postboda
                  </h3>
                  <p className="text-lg text-gray-300 font-light leading-relaxed">
                    Es una sesión que se realiza días o meses después de la
                    boda, para aprovechar si están de luna de miel en Bariloche,
                    o si querés volver a usar tu vestido en los hermosos spots
                    de la Patagonia en diferentes estaciones.
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                  {postWeddingImages.map((imgSrc, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedImage({ image: imgSrc })}
                      className={`relative overflow-hidden cursor-pointer group bg-gray-900 ${
                        idx === 0 ? "md:col-span-2" : ""
                      } h-80 md:h-96`}
                    >
                      <img
                        src={imgSrc}
                        alt="Postboda"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {selectedCategory === "retratos" && (
            <div className="space-y-12" key="retratos-content">
              {/* Primera parte de retratos */}
              <div>
                {portraitsPart1.map((group, idx) => (
                  <RenderGroup key={idx} group={group} />
                ))}
              </div>

              {/* Divisor decorativo */}
              <div className="py-20 text-center">
                <span className="inline-block w-20 h-[1px] bg-white/20 mb-8"></span>
                <h2
                  className="text-3xl md:text-5xl font-light leading-snug px-4"
                  style={{ fontFamily: `'Playfair Display', serif` }}
                >
                  ¿Cuales son nuestras locaciones{" "}
                  <br className="hidden md:block" /> favoritas para las fotos?
                </h2>
                <span className="inline-block w-20 h-[1px] bg-white/20 mt-8"></span>
              </div>

              {/* Segunda parte de retratos - Locaciones */}
              <div>
                {portraitsPart2.map((group, idx) => (
                  <RenderGroup key={idx} group={group} />
                ))}
              </div>
            </div>
          )}
          {selectedCategory === "eventos" && (
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              key="eventos-content"
            >
              {eventsData.map((item, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedImage({ image: item.src })}
                  className="aspect-square overflow-hidden cursor-pointer group bg-gray-900"
                >
                  <img
                    src={item.src}
                    alt="Evento"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal de imagen ampliada */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage.image}
            className="max-w-full max-h-[90vh] object-contain shadow-2xl"
            alt=""
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white text-lg hover:scale-110 transition-transform"
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );
};

export default PortfolioDocumental;
