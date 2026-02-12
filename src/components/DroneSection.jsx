import React, { useRef, useState, useEffect } from 'react';

const DroneSection = () => {
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
      { threshold: 0.2 }
    );
    
    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-24 bg-[#0a0a0a] text-white relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-transparent to-white/20"></div>

      <div 
        className={`max-w-6xl mx-auto px-4 md:px-8 transition-all duration-1000 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        
        {/* --- Encabezado de la Sección --- */}
        <div className="text-center mb-12">
          <h2 
            className="text-4xl md:text-6xl font-light tracking-wide mb-6"
            style={{ fontFamily: `'Playfair Display', serif` }}
          >
            Perspectiva Aérea
          </h2>
          <span className="inline-block w-24 h-[1px] bg-white/30 mb-6"></span>
          <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            Servicio de Drone cinematográfico. Elevamos la narrativa visual de tu historia 
            con tomas espectaculares desde el cielo de la Patagonia.
          </p>
        </div>

        {/* --- Grid de Videos --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          {/* Video 1 */}
          <div className="relative w-full rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 group">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none"></div>

            <div className="aspect-video w-full relative">
              <video
                className="absolute inset-0 w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-[2000ms] ease-in-out"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/video-drone.webm" type="video/webm" />
                Tu navegador no soporta el tag de video.
              </video>
            </div>

            <div className="absolute bottom-4 right-6 z-20 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <p className="text-xs uppercase tracking-widest text-white/80">Drone 4K UHD</p>
            </div>
          </div>

          {/* Video 2 */}
          <div className="relative w-full rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 group">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none"></div>

            <div className="aspect-video w-full relative">
              <video
                className="absolute inset-0 w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-[2000ms] ease-in-out"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/video-drone-2.mp4" type="video/webm" />
                Tu navegador no soporta el tag de video.
              </video>
            </div>

            <div className="absolute bottom-4 right-6 z-20 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <p className="text-xs uppercase tracking-widest text-white/80">Drone 4K UHD</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DroneSection;