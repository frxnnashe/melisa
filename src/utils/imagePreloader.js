// utils/imagePreloader.js
// Utilidad para precargar imágenes

/**
 * Precarga un array de URLs de imágenes
 * @param {string[]} imageUrls - Array de URLs de imágenes
 * @returns {Promise<string[]>} - Promesa que se resuelve cuando todas las imágenes están cargadas
 */
export const preloadImages = (imageUrls) => {
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
  
  /**
   * Precarga una sola imagen
   * @param {string} url - URL de la imagen
   * @returns {Promise<string>} - Promesa que se resuelve cuando la imagen está cargada
   */
  export const preloadImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    });
  };
  
  /**
   * Precarga imágenes con callback de progreso
   * @param {string[]} imageUrls - Array de URLs de imágenes
   * @param {Function} onProgress - Callback que recibe (loaded, total)
   * @returns {Promise<string[]>}
   */
  export const preloadImagesWithProgress = (imageUrls, onProgress) => {
    let loaded = 0;
    const total = imageUrls.length;
  
    return Promise.all(
      imageUrls.map(url => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            loaded++;
            if (onProgress) onProgress(loaded, total);
            resolve(url);
          };
          img.onerror = () => {
            loaded++;
            if (onProgress) onProgress(loaded, total);
            resolve(url);
          };
          img.src = url;
        });
      })
    );
  };
  
  /**
   * Obtiene las imágenes críticas del hero
   * @returns {string[]} - Array de URLs críticas
   */
  export const getCriticalHeroImages = () => {
    return [
      '/hero/hero-1.webp',
      '/hero/hero-2.webp',
      '/hero/hero-3.webp'
    ];
  };
  
  /**
   * Obtiene las imágenes de la primera boda para precargar
   * @returns {string[]} - Array de URLs de la primera boda
   */
  export const getFirstWeddingImages = () => {
    return [
      '/boda-sol-1.webp',
      '/boda-sol-2.webp',
      '/boda-sol-3.webp'
    ];
  };