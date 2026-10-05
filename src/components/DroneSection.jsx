const videos = [
  {
    src: '/video-drone.webm',
    type: 'video/webm',
    poster: '/hero/hero-2.webp',
    label: 'Paisajes de la Patagonia registrados con dron',
  },
  {
    src: '/video-drone-2.mp4',
    type: 'video/mp4',
    poster: '/hero/hero-5.webp',
    label: 'Cobertura aérea de una boda en la Patagonia',
  },
]

export default function DroneSection() {
  return (
    <section id="drone" className="bg-stone-100 px-5 py-24 text-zinc-950 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-800">Video &amp; Dron</p>
            <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">Perspectiva Aérea</h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-zinc-700 sm:text-lg">
            Una mirada cinematográfica para mostrar la escala del paisaje, el movimiento de cada celebración y la
            belleza de los destinos donde sucede cada historia.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {videos.map((video) => (
            <figure key={video.src} className="overflow-hidden rounded-2xl bg-zinc-900 shadow-xl">
              <video
                className="aspect-video w-full object-cover"
                controls
                muted
                playsInline
                preload="metadata"
                poster={video.poster}
                aria-label={video.label}
              >
                <source src={video.src} type={video.type} />
                Tu navegador no puede reproducir este video.
              </video>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
