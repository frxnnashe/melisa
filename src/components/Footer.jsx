import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    { title: 'Servicios', links: ['Fotografía de Retrato', 'Fotografía de Eventos', 'Fotografía Comercial', 'Sesiones Familiares', 'Fotografía Artística'] },
    { title: 'Información', links: ['Sobre Mí', 'Portfolio', 'Testimonios', 'Precios', 'FAQ'] },
    { title: 'Legal', links: ['Términos y Condiciones', 'Política de Privacidad', 'Política de Cookies', 'Derechos de Imagen'] },
  ];

  const socialMedia = [
    { name: 'Instagram', icon: '📷', color: 'hover:bg-pink-500' },
    { name: 'Facebook', icon: '👥', color: 'hover:bg-blue-500' },
    { name: 'WhatsApp', icon: '💬', color: 'hover:bg-green-500' },
    { name: 'Email', icon: '✉', color: 'hover:bg-purple-500' },
  ];

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Santa Cruz Melisa</h3>
            <p className="text-gray-400 leading-relaxed">Capturando momentos únicos e inmortalizando emociones a través del arte de la fotografía profesional.</p>
            <div className="space-y-3 text-gray-400">
              <p className="flex items-center gap-3"><span>📍</span>San Carlos De Bariloche</p>
              <p className="flex items-center gap-3"><span>✉</span>melisasantacruz@gmail.com</p>
              <p className="flex items-center gap-3"><span>📞</span>+54 9 3541-521405</p>
            </div>
          </div>

          {/* Sections */}
          {footerSections.map((s, i) => (
            <div key={i} className="space-y-6">
              <h3 className="text-xl font-semibold text-white">{s.title}</h3>
              <ul className="space-y-3">
                {s.links.map((l, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-gray-400 hover:text-purple-400 transition">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex space-x-4">
            {socialMedia.map((s, i) => (
              <a key={i} href="#" className={`w-12 h-12 rounded-xl bg-white/10 text-gray-300 flex items-center justify-center hover:text-white transition ${s.color}`}>{s.icon}</a>
            ))}
          </div>
          <div className="text-center md:text-right text-gray-400">
            <p>© {currentYear} Melisa Santa Cruz. Todos los derechos reservados.</p>
          </div>
        </div>

        {/* Back to top */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition z-50" aria-label="Volver arriba">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
        </button>
      </div>
    </footer>
  );
};

export default Footer;