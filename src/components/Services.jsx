import React, { useState, useEffect, useRef } from 'react';

const Services = () => {
  const [isVisible,setIsVisible]=useState(false);
  const [hoveredService,setHoveredService]=useState(null);
  const sectionRef=useRef(null);

  useEffect(()=>{
    const io=new IntersectionObserver(([e])=>e.isIntersecting&&setIsVisible(true),{threshold:0.05,rootMargin:'50px'});
    const el=sectionRef.current;
    if(el) io.observe(el);
    return ()=>el&&io.unobserve(el);
  },[]);

  const services=[
    {
      id:1,
      title:'Fotografía de Boda',
      description:'Bodas en Bariloche y destino.',
      features:[
        'Cobertura completa del evento',
        'Sesiones pre-boda',
        'Sesiones post-boda',
        'Video documental y drone',
        'Bodas Íntimas o Elopements.',
        'Asesoramiento de salones, decoraciones, maquillaje y mucho más.',
      ],
      price:'Desde 600 USD', 
      showQuoteButton: true,
      icon:'💍',
      gradient:'from-white to-gray-300',
      whatsapp:true
    },
    {
      id:2,
      title:'Fotografía de Retratos',
      description:'Tour Fotográfico',
      features:[
        'Sesiones Personalizadas (Parejas, Familias y Retratos).',
        'Pedidas de Mano Sorpresa.',
        'Nuevo servicio de fotografía con drone.',
        '📍 Locaciones a consultar: Bariloche y alrededores.',
      ],
      price:'USD 180',  
      icon:'📷',
      gradient:'from-gray-300 to-gray-500',
      whatsapp:true
    },
    {
      id:3,
      title:'Fotografía de Eventos',
      description:' Cobertura profesional',
      features:[
        'Fiesta de 15 años',
        'Cumpleaños y Eventos Corporativos.',
        'Video en vivo del momento.',
        'Video tradicional y reels.'
      ],
      price:'USD 350',
      showQuoteButton: true,
      icon:'🎉',
      gradient:'from-gray-400 to-gray-600',
      whatsapp:true
    }
  ];

  const handleWhatsApp = () => {
    window.open('https://wa.me/5493541521405?text=Hola! Me interesa saber más sobre tus servicios de fotografía.', '_blank');
  };

  return (
    <section id="services" ref={sectionRef} className="py-20 md:py-32 bg-black relative overflow-hidden min-h-[70vh]">
      <div className="absolute inset-0">
        <div className="absolute top-40 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-gray-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-20 right-40 w-48 h-48 bg-gray-300/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center space-y-4 mb-16 transition-all duration-1000 ${isVisible?'opacity-100 translate-y-0':'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-white">Mis <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Precios</span></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-white to-gray-400 rounded-full mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s,i)=>(
            <div key={s.id} className={`group relative bg-white/5 border border-white/10 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden ${isVisible?'opacity-100 translate-y-0':'opacity-0 translate-y-10'}`} style={{animationDelay:`${i*150}ms`}} onMouseEnter={()=>setHoveredService(s.id)} onMouseLeave={()=>setHoveredService(null)}>
              <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${s.gradient} flex items-center justify-center text-black mb-6 group-hover:scale-110 transition-transform`}>{s.icon}</div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gray-200 transition-colors">{s.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{s.description}</p>
                <ul className="space-y-2 mb-6">
                  {s.features.map((f,idx)=>(<li key={idx} className="flex items-center text-gray-400 text-sm"><div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${s.gradient} mr-3`}></div>{f}</li>))}
                </ul>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className={`text-2xl font-bold bg-gradient-to-r ${s.gradient} bg-clip-text text-transparent block`}>{s.price}</span>
                      {s.showQuoteButton && (
                        <p className="text-gray-400 text-sm mt-1">Consultar cotización</p>
                      )}
                    </div>
                    {s.whatsapp && (
                      <button 
                        onClick={handleWhatsApp}
                        className="px-6 py-2 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 hover:scale-105 transition flex items-center gap-2"
                      >
                        <span>💬</span>
                        Consultar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${isVisible?'opacity-100 translate-y-0':'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-gray-600 to-gray-800 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">¿No encuentras lo que buscas?</h3>
              <p className="text-xl mb-6 opacity-90">Contáctame para crear un paquete personalizado que se adapte perfectamente a tus necesidades.</p>
              <button 
                onClick={handleWhatsApp}
                className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition"
              >
                Cotización Personalizada
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;