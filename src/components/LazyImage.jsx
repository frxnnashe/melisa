import React, { useState, useEffect, useRef } from 'react';

/**
 * Componente LazyImage - Carga imágenes solo cuando son visibles en el viewport
 * @param {string} src - URL de la imagen
 * @param {string} alt - Texto alternativo
 * @param {string} className - Clases CSS
 * @param {Function} onClick - Handler de click
 * @param {number} rootMargin - Margen en px antes de cargar (default: 100)
 * @param {string} placeholder - Color de fondo mientras carga (default: 'bg-gray-900')
 */
const LazyImage = ({ 
  src, 
  alt = '', 
  className = '', 
  onClick,
  rootMargin = 100,
  placeholder = 'bg-gray-900'
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const img = imgRef.current;
          img.src = src;
          
          img.onload = () => {
            setLoaded(true);
          };
          
          img.onerror = () => {
            setError(true);
            console.error(`Error loading image: ${src}`);
          };
          
          observer.disconnect();
        }
      },
      { 
        rootMargin: `${rootMargin}px` // Empieza a cargar antes de que sea visible
      }
    );

    observer.observe(imgRef.current);
    
    return () => observer.disconnect();
  }, [src, rootMargin]);

  return (
    <div className={`relative ${placeholder}`}>
      <img
        ref={imgRef}
        alt={alt}
        className={`${className} ${
          loaded ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-500`}
        onClick={onClick}
      />
      
      {/* Indicador de carga */}
      {!loaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
        </div>
      )}
      
      {/* Mensaje de error */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-white/40 text-sm">
          Error al cargar imagen
        </div>
      )}
    </div>
  );
};

export default LazyImage;