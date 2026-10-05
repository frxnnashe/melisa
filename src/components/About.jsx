import { photoTourUrl } from '../data/siteContent'

export default function About() {
  return (
    <section id="about" className="bg-stone-100 px-5 py-24 text-zinc-950 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="relative mx-auto w-full max-w-xl pb-14 sm:pb-20">
          <img
            src="/fotobelo.webp"
            alt="Melisa Santa Cruz fotografiando en la Patagonia"
            className="aspect-[4/5] w-[82%] rounded-2xl object-cover shadow-2xl"
            loading="lazy"
            decoding="async"
            width="1200"
            height="1500"
          />
          <img
            src="/about2.webp"
            alt="Melisa durante una cobertura fotográfica"
            className="absolute bottom-0 right-0 aspect-[4/3] w-[48%] rounded-2xl border-8 border-stone-100 object-cover shadow-xl"
            loading="lazy"
            decoding="async"
            width="900"
            height="675"
          />
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-amber-800">Sobre mí</p>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Melisa Santa Cruz, Fotógrafa Profesional
          </h2>
          <p className="mt-6 font-display text-2xl leading-snug text-amber-900">
            Capturando momentos únicos y llenos de emociones a través del arte de la fotografía.
          </p>
          <div className="mt-8 space-y-5 text-base leading-7 text-zinc-700">
            <p>
              Soy fotógrafa profesional con base en Bariloche y más de diez años de experiencia. Mi vínculo con la
              fotografía comenzó junto a mi abuelo Osvaldo y creció entre estudios de arte, viajes y la búsqueda de
              una mirada propia.
            </p>
            <p>
              Me especializo en bodas, retratos y experiencias en la Patagonia. Trabajo con luz natural, atención a
              los gestos y una narrativa documental que permite que cada historia conserve su identidad.
            </p>
            <p>
              También formo parte de Bariloche Foto Tour, una propuesta para recorrer paisajes únicos y convertir el
              viaje en una experiencia fotográfica personal.
            </p>
          </div>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#portfolio"
              className="inline-flex min-h-12 items-center rounded-full bg-zinc-950 px-6 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-amber-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950"
            >
              Ver mi trabajo
            </a>
            <a
              href={photoTourUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center rounded-full border border-zinc-400 px-6 text-sm font-semibold uppercase tracking-[0.16em] text-zinc-900 transition hover:border-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950"
            >
              Bariloche Foto Tour
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
