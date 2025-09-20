import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    { title: 'Información', links: ['Sobre Mí', 'Portfolio', 'Testimonios', 'Precios'] },
  ];

  const socialMedia = [
    { 
      name: 'Instagram', 
      icon: '📷', 
      color: 'hover:bg-gray-600',
      href: 'https://www.instagram.com/fotosmelisasantacruz/'
    },
    { 
      name: 'Facebook', 
      icon: '👥', 
      color: 'hover:bg-gray-700',
      href: '#'
    },
    { 
      name: 'WhatsApp', 
      icon: '💬', 
      color: 'hover:bg-gray-500',
      href: 'https://wa.me/5493541521405'
    },
    { 
      name: 'Email', 
      icon: '✉', 
      color: 'hover:bg-gray-800',
      href: 'mailto:melisasantacruz@gmail.com'
    },
  ];

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gray-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Santa Cruz Melisa</h3>
            <p className="text-gray-400 leading-relaxed">Capturando momentos únicos e inmortalizando emociones a través del arte de la fotografía profesional.</p>
            <div className="space-y-3 text-gray-400">
              <p className="flex items-center gap-3"><span>📍</span>San Carlos De Bariloche</p>
              <p className="flex items-center gap-3">
                <span>✉</span>
                <a href="mailto:melisasantacruz@gmail.com" className="hover:text-white transition">
                  melisasantacruz@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-3"><span>📞</span>+54 9 3541-521405</p>
            </div>
            {/* Enlace a Casamientos.com */}
            <div className="mt-4">
              <a 
                href="https://www.casamientos.com.ar/fotografos/melisa-santa-cruz--e177896" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition"
              >
                <span>💍</span>
                Ver perfil en Casamientos.com
              </a>
            </div>
          </div>

          {footerSections.map((s, i) => (
            <div key={i} className="space-y-6">
              <h3 className="text-xl font-semibold text-white">{s.title}</h3>
              <ul className="space-y-3">
                {s.links.map((l, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-gray-400 hover:text-gray-200 transition">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex space-x-4">
            {socialMedia.map((s, i) => (
              <a 
                key={i} 
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 rounded-xl bg-white/10 text-gray-300 flex items-center justify-center hover:text-white transition ${s.color}`}
              >
                {s.icon}
              </a>
            ))}
          </div>
          <div className="text-center md:text-right text-gray-400">
            <p>© {currentYear} Melisa Santa Cruz. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;