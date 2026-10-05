import { useEffect, useState } from 'react'
import {
  eventImages,
  momentImages,
  partyImages,
  photoTourUrl,
  portraitGroups,
  portraitLocations,
  portfolioCategories,
  postWeddingImages,
  weddings,
} from '../data/siteContent'
import Lightbox from './Lightbox'

const toGalleryItems = (images, alt) =>
  images.map((src, index) => ({ src, alt: `${alt}, fotografía ${index + 1}` }))

const Gallery = ({ images, alt, variant = 'standard', onOpen }) => {
  const items = toGalleryItems(images, alt)
  const gridClass =
    variant === 'wide'
      ? 'grid-cols-1 md:grid-cols-2'
      : variant === 'dense'
        ? 'grid-cols-2 md:grid-cols-4'
        : 'grid-cols-1 md:grid-cols-3'

  return (
    <div className={`grid gap-3 ${gridClass}`}>
      {items.map((image, index) => (
        <button
          key={image.src}
          type="button"
          aria-label={`Ampliar ${image.alt}`}
          onClick={() => onOpen(items, index)}
          className={`focus-ring group overflow-hidden bg-zinc-900 text-left ${
            variant === 'wide' && index === 0 ? 'md:col-span-2' : ''
          }`}
        >
          <img
            src={image.src}
            alt={image.alt}
            width="1200"
            height="800"
            loading="lazy"
            decoding="async"
            sizes={variant === 'dense' ? '(min-width: 768px) 25vw, 50vw' : '(min-width: 768px) 33vw, 100vw'}
            className="aspect-[4/3] h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </button>
      ))}
    </div>
  )
}

const SectionIntro = ({ title, children }) => (
  <div className="mx-auto mb-12 max-w-3xl text-center">
    <h3 className="font-display text-3xl leading-tight text-white md:text-5xl">{title}</h3>
    {children && <p className="mt-5 text-base leading-relaxed text-zinc-300 md:text-lg">{children}</p>}
  </div>
)

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('bodas')
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('whatsapp-context', { detail: selectedCategory }))
  }, [selectedCategory])

  const openLightbox = (images, index) => setLightbox({ images, index })

  const renderWeddings = () => (
    <div className="space-y-24">
      <SectionIntro title="Fotografía de Bodas y Elopements en Bariloche y a destino.">
        Un servicio de fotografía con estilo documental, desde los preparativos, la ceremonia, la sesión de retratos de pareja, la celebración y la fiesta hasta la última canción.
      </SectionIntro>

      <div className="text-center">
        <a
          href="/bodas-bariloche/"
          className="focus-ring inline-flex min-h-12 items-center rounded-full border border-white/25 px-6 text-sm font-semibold uppercase tracking-[0.14em] transition hover:bg-white hover:text-zinc-950"
        >
          Bodas en Bariloche
        </a>
      </div>

      {weddings.map((wedding) => (
        <article key={wedding.couple} className="space-y-6">
          <header>
            <h4 className="font-display text-3xl text-white md:text-4xl">{wedding.couple}</h4>
            <p className="mt-1 text-sm text-zinc-400">{wedding.location}</p>
          </header>
          <Gallery images={wedding.images} alt={`${wedding.couple}, boda en ${wedding.location}`} onOpen={openLightbox} />
        </article>
      ))}

      <article className="space-y-7">
        <SectionIntro title="Bodas: la fiesta" />
        <Gallery images={partyImages} alt="Fiesta de boda en la Patagonia" variant="dense" onOpen={openLightbox} />
      </article>

      <article className="space-y-7">
        <p className="text-center font-display text-xl italic text-zinc-300 md:text-2xl">
          En un instante en una boda, todo puede suceder.
        </p>
        <Gallery images={momentImages} alt="Momento espontáneo durante una boda" variant="wide" onOpen={openLightbox} />
      </article>

      <article className="space-y-8">
        <SectionIntro title="Postboda">
          Una sesión realizada días o meses después de la boda para volver a usar el vestido y recorrer paisajes de la Patagonia en distintas estaciones.
        </SectionIntro>
        <Gallery images={postWeddingImages} alt="Sesión postboda en Bariloche" variant="wide" onOpen={openLightbox} />
        <div className="text-center">
          <a
            href={photoTourUrl}
            target="_blank"
            rel="noreferrer"
            className="focus-ring inline-flex min-h-12 items-center rounded-full border border-white/25 px-6 text-white transition-colors hover:bg-white hover:text-zinc-950"
          >
            Conocer Bariloche Foto Tour
          </a>
        </div>
      </article>
    </div>
  )

  const renderPortraits = () => (
    <div className="space-y-24">
      <SectionIntro title="Sesiones y Retratos">
        Sesiones exclusivas de retratos personalizados, parejas y familias. Tours fotográficos, books y pedidas de mano para capturar momentos únicos.
      </SectionIntro>

      {portraitGroups.map((group) => (
        <article key={group.title} className="space-y-6">
          <header>
            <h4 className="font-display text-3xl text-white">{group.title}</h4>
            <p className="mt-2 text-zinc-400">{group.description}</p>
          </header>
          <Gallery images={group.images} alt={`${group.title} en la Patagonia`} onOpen={openLightbox} />
        </article>
      ))}

      <section className="space-y-12">
        <SectionIntro title="Locaciones favoritas para tus fotos">
          Circuito Chico, Valle Encantado, Villa La Angostura, Camino de los 7 Lagos y San Martín de los Andes.
        </SectionIntro>
        {portraitLocations
          .filter((location) => location.images.length > 0)
          .map((location) => (
            <article key={location.title} className="space-y-6">
              <header>
                <h4 className="font-display text-2xl text-white md:text-3xl">{location.title}</h4>
                <p className="mt-2 text-zinc-400">{location.description}</p>
              </header>
              <Gallery images={location.images} alt={`Sesión de fotos en ${location.title}`} onOpen={openLightbox} />
            </article>
          ))}
      </section>
    </div>
  )

  const renderEvents = () => (
    <div className="space-y-10">
      <SectionIntro title="Fotografía de eventos">
        Realizamos una cobertura completa para grandes eventos corporativos, eventos personalizados, aniversarios y cumpleaños de 15. El equipo integra fotografía, filmmaker, video tradicional, video en vivo y dron.
      </SectionIntro>
      <Gallery images={eventImages} alt="Cobertura profesional de eventos en Bariloche" variant="dense" onOpen={openLightbox} />
    </div>
  )

  const renderUnavailable = (title, description, href) => (
    <div className="mx-auto max-w-2xl border border-white/10 bg-white/[0.03] p-8 text-center md:p-12">
      <h3 className="font-display text-3xl text-white">{title}</h3>
      <p className="mt-4 leading-relaxed text-zinc-300">{description}</p>
      {href && (
        <a href={href} className="focus-ring mt-7 inline-flex min-h-12 items-center rounded-full bg-white px-6 font-medium text-zinc-950">
          Ver sección
        </a>
      )}
    </div>
  )

  const content = {
    bodas: renderWeddings,
    retratos: renderPortraits,
    eventos: renderEvents,
    producto: () => renderUnavailable(
      'Arquitectura y Producto',
      'La galería se publicará cuando esté disponible una selección completa de trabajos.',
    ),
    drone: () => renderUnavailable(
      'Video & Dron',
      'Perspectivas aéreas y narrativa cinematográfica sobre los paisajes de la Patagonia.',
      '#drone',
    ),
  }

  return (
    <section id="portfolio" className="bg-zinc-950 py-20 text-white md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-display text-5xl font-normal tracking-tight md:text-7xl">Portfolio</h2>
          <p className="mt-5 text-zinc-300">Historias reales, retratos y eventos documentados con una mirada sensible y espontánea.</p>
        </div>

        <div role="tablist" aria-label="Categorías del portfolio" className="mb-16 flex gap-2 overflow-x-auto pb-3">
          {portfolioCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={selectedCategory === category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`focus-ring shrink-0 rounded-full border px-5 py-2.5 text-sm transition-colors ${
                selectedCategory === category.id
                  ? 'border-white bg-white text-zinc-950'
                  : 'border-white/20 text-zinc-300 hover:border-white/50 hover:text-white'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div role="tabpanel">{content[selectedCategory]()}</div>
      </div>

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          initialIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  )
}

export default Portfolio
