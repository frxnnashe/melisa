import React from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Portfolio from './components/Portfolio'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'
import TaggboxReviews from './components/TagBoxReview'
import { ThemeProvider } from './context/ThemeContext'

import { useEffect } from 'react';

function App() {
  useEffect(() => {
  // Desenfoca cualquier elemento que haya recibido focus automático
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
}, []);
  useEffect(() => {
    // una vez que React terminó de pintar, sacamos el splash
    const splash = document.getElementById('splash');
    if (splash) {
      splash.style.opacity = '0';
      splash.style.transition = 'opacity .4s ease';
      setTimeout(() => splash.remove(), 400);
    }
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-900 text-white transition-colors duration-500">
        <Hero />
        <About />
        <Portfolio />
        <Services />
        <Contact />
        <TaggboxReviews widgetId="299655" />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;