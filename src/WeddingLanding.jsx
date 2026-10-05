import Contact from './components/Contact'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import Footer from './components/Footer'
import Services from './components/Services'
import SocialProof from './components/SocialProof'
import { instagramUrl, weddings } from './data/siteContent'
import { responsiveImageSrcSet } from './utils/images'

export default function WeddingLanding() {
  return (
    <div className="min-h-[100dvh] bg-zinc-950 text-white">
      <header className="absolute inset-x-0 top-0 z-20 px-5 py-5 sm:px-8 lg:px-12">
        <nav className="mx-auto flex max-w-6xl items-center justify-between" aria-label="Navegación de bodas">
          <a href="/" className="font-display text-xl">Melisa Santa Cruz</a>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm uppercase tracking-[0.18em] text-white/80 hover:text-white"
          >
            Instagram
          </a>
        </nav>
      </header>

      <main>
        <section className="relative grid min-h-[100dvh] place-items-center overflow-hidden px-5 py-32 text-center sm:px-8">
          <img
            src="/hero/hero-1.webp"
            alt="Boda en un paisaje de la Patagonia"
            className="absolute inset-0 h-full w-full object-cover"
            width="2200"
            height="1467"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-zinc-950/65" />
          <div className="relative mx-auto max-w-4xl">
            <p className="text-sm uppercase tracking-[0.32em] text-amber-100">Bariloche y Patagonia</p>
            <h1 className="mt-6 font-display text-4xl leading-tight sm:text-6xl lg:text-7xl">
              Fotografía de Bodas y Elopements en Bariloche y a destino.
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-zinc-100 sm:text-lg">
              Una narrativa documental que acompaña los preparativos, la ceremonia, los retratos y la fiesta para
              conservar la emoción real de cada momento.
            </p>
            <a
              href="#contacto"
              className="mt-9 inline-flex min-h-12 items-center rounded-full bg-white px-7 text-sm font-bold uppercase tracking-[0.16em] text-zinc-950 transition hover:bg-amber-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Consultar fecha
            </a>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.3em] text-amber-200/80">Historias de bodas</p>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl">Celebraciones documentadas con sensibilidad</h2>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {weddings.map((wedding) => (
                <article key={wedding.couple} className="group relative overflow-hidden rounded-2xl">
                  <img
                    src={wedding.images[0]}
                    srcSet={responsiveImageSrcSet(wedding.images[0])}
                    sizes="(min-width: 640px) 50vw, 100vw"
                    alt={`${wedding.couple}, boda en ${wedding.location}`}
                    className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                    width="1200"
                    height="900"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-display text-3xl">{wedding.couple}</h3>
                    <p className="mt-1 text-sm text-zinc-300">{wedding.location}</p>
                  </div>
                </article>
              ))}
            </div>
            <a
              href="/#portfolio"
              className="mt-10 inline-flex min-h-12 items-center rounded-full border border-white/30 px-6 text-sm font-semibold uppercase tracking-[0.16em] transition hover:bg-white hover:text-zinc-950"
            >
              Ver portfolio completo
            </a>
          </div>
        </section>

        <Services />
        <SocialProof />
        <Contact />
      </main>
      <Footer homeHrefPrefix="/" />
      <FloatingWhatsApp initialContext="bodas" />
    </div>
  )
}
