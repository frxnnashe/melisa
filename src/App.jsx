import React, { useEffect, useState } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TaggboxReviews from './components/SocialProof';
import { ThemeProvider } from './context/ThemeContext';
import DroneSection from './components/DroneSection';

// Función de preload de imágenes críticas
const preloadImages = (imageUrls) => {
  return Promise.all(
    imageUrls.map(url => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => resolve(url); // No bloqueamos si falla
        img.src = url;
      });
    })
  );
};

function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Desenfoca cualquier elemento que haya recibido focus automático
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    // Precargar imágenes críticas del hero (las primeras 3)
    const criticalImages = [
      '/hero/hero-1.webp',
      '/hero/hero-2.webp',
      '/hero/hero-3.webp'
    ];

    preloadImages(criticalImages).then(() => {
      setIsReady(true);
      
      // Remover splash screen después de que las imágenes críticas carguen
      const splash = document.getElementById('splash');
      if (splash) {
        splash.style.opacity = '0';
        splash.style.transition = 'opacity .4s ease';
        setTimeout(() => splash.remove(), 400);
      }
    });
  }, []);

  // Pantalla de carga mientras se precargan las imágenes críticas
  if (!isReady) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl font-light tracking-wider">
          Cargando...
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-900 text-white transition-colors duration-500">
        <Hero />
        <Portfolio />
        <DroneSection />
        <About />
        <Services />
        <Contact />
        <TaggboxReviews widgetId="299655" />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;