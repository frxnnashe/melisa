import { useEffect, useRef } from 'react';

const TaggboxReviews = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const box = containerRef.current;
    if (!box) return;

    /* Forzamos modo oscuro al widget */
    box.innerHTML = `
      <div class="taggbox"
           style="width:100%;height:100%;overflow:auto;"
           data-widget-id="299655"
           data-website="1"
           data-dark="true">
      </div>
      <script src="https://widget.taggbox.com/embed.min.js" type="text/javascript"><\/script>
    `;

    const script = box.querySelector('script');
    const newScript = document.createElement('script');
    newScript.src = script.src;
    newScript.type = script.type;
    document.body.appendChild(newScript);

    return () => {
      document.body.removeChild(newScript);
    };
  }, []);

  return (
    <section className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Título oscuro */}
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            LATEST GOOGLE REVIEWS
          </h2>
        </div>

        {/* Contenedor ancho + alto fijo (4 cols responsivo) */}
        <div
          ref={containerRef}
          className="w-full h-[550px] rounded-xl overflow-hidden border border-white/10 shadow-md"
        />
      </div>
    </section>
  );
};

export default TaggboxReviews;