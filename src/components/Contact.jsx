import React, { useState, useEffect, useRef } from 'react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef(null);

  // Número de WhatsApp del cliente
  const whatsappNumber = '3541521405'; // Formato internacional para Argentina

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setIsVisible(true),
      { threshold: 0.2 }
    );
    const el = sectionRef.current;
    if (el) io.observe(el);
    return () => el && io.unobserve(el);
  }, []);

  const handleChange = e => setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    // Construir el mensaje para WhatsApp
    let message = `🎨 *Nueva Consulta de Fotografía*\n\n`;
    message += `👤 *Nombre:* ${formData.name}\n`;
    message += `📧 *Email:* ${formData.email}\n`;
    
    if (formData.phone) {
      message += `📱 *Teléfono:* ${formData.phone}\n`;
    }
    
    if (formData.service) {
      message += `📸 *Servicio:* ${formData.service}\n`;
    }
    
    if (formData.date) {
      message += `📅 *Fecha solicitada:* ${formData.date}\n`;
    }
    
    if (formData.message) {
      message += `💬 *Mensaje:*\n${formData.message}\n`;
    }

    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Crear la URL de WhatsApp
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Simular el envío y luego abrir WhatsApp
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Abrir WhatsApp en una nueva ventana/pestaña
      window.open(whatsappURL, '_blank');
      
      // Limpiar el formulario
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        message: ''
      });
      
      alert('¡Mensaje preparado! Se abrirá WhatsApp para enviar tu consulta.');
    }, 1000);
  };

  const sendWhatsAppDirect = () => {
    const message = `¡Hola! Me interesa conocer más sobre tus servicios de fotografía. ¿Podríamos agendar una consulta?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
  };

  const services = [
    'Fotografía de Retrato',
    'Fotografía de Eventos', 
    'Fotografía Comercial',
    'Sesión de Familia',
    'Fotografía Artística',
    'Cursos de Fotografía'
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center space-y-4 mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Hablemos de tu <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Proyecto</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Estoy aquí para hacer realidad tu visión fotográfica. Contáctame por WhatsApp y creemos algo extraordinario juntos.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8">
            {[
              { icon: '✉', title: 'Email', info: 'melisasantacruz@gmail.com', gradient: 'from-green-400 to-blue-400' },
              { icon: '📍', title: 'Ubicación', info: 'San Carlos De Bariloche', gradient: 'from-pink-400 to-red-400' },
              { icon: '🕒', title: 'Horarios', info: 'Lun - Sáb: 9:00 - 20:00', gradient: 'from-yellow-400 to-orange-400' },
              { icon: '📱', title: 'WhatsApp', info: '+54 9 3541 52-1405', gradient: 'from-green-400 to-green-600' }
            ].map((c, i) => (
              <div 
                key={i} 
                className={`group p-6 bg-white/5 border border-white/10 rounded-2xl hover:-translate-y-1 transition-all duration-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} 
                style={{ transitionDelay: `${300 * i}ms` }}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${c.gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                    {c.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{c.title}</h3>
                    <p className="text-gray-300">{c.info}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* WhatsApp Direct Button */}
            <div className={`${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: '1200ms' }}>
              <button 
                onClick={sendWhatsAppDirect}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-4 px-6 rounded-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl"
              >
                <span className="text-2xl">📱</span>
                <span>Contacto Directo WhatsApp</span>
              </button>
            </div>

            {/* Social */}
            <div className={`${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: '500ms' }}>
              <h3 className="text-xl font-bold text-white mb-4">Sígueme</h3>
              <div className="flex space-x-4">
                {[
                  { icon: '📷', color: 'from-pink-500 to-purple-500' },
                  { icon: '👥', color: 'from-blue-600 to-blue-400' },
                  { icon: '💬', color: 'from-green-600 to-green-400' }
                ].map((s, i) => (
                  <button 
                    key={i} 
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${s.color} text-white flex items-center justify-center hover:scale-110 transition-transform`}
                  >
                    {s.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className={`lg:col-span-3 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '300ms' }}>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur">
              <div className="mb-6 text-center">
                <div className="inline-flex items-center space-x-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm">
                  <span>📱</span>
                  <span>Se enviará directo a WhatsApp</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <input 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 transition" 
                  placeholder="Nombre completo *" 
                />
                <input 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 transition" 
                  placeholder="Email *" 
                />
                <input 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 transition" 
                  placeholder="Teléfono (opcional)" 
                />
                <select 
                  name="service" 
                  value={formData.service} 
                  onChange={handleChange} 
                  className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-purple-500 transition"
                >
                  <option value="">Seleccionar servicio</option>
                  {services.map(s => <option key={s} value={s} style={{backgroundColor: '#1a1a1a'}}>{s}</option>)}
                </select>
              </div>
              
              <input 
                name="date" 
                type="date" 
                value={formData.date} 
                onChange={handleChange} 
                className="w-full mb-6 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-purple-500 transition" 
              />
              
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                rows={5} 
                className="w-full mb-6 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 transition resize-none" 
                placeholder="Cuéntame sobre tu proyecto, ideas o cualquier detalle específico..." 
              />
              
              <button 
                onClick={handleSubmit} 
                disabled={isSubmitting || !formData.name || !formData.email} 
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-4 rounded-xl hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Preparando...</span>
                  </>
                ) : (
                  <>
                    <span>📱</span>
                    <span>Enviar por WhatsApp</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;