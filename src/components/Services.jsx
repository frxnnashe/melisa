import { services } from '../data/siteContent'
import { buildWhatsAppUrl } from '../utils/whatsapp'

function ServiceCard({ service, featured = false }) {
  return (
    <article
      className={`rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <div className={featured ? 'grid gap-8 md:grid-cols-[0.75fr_1.25fr]' : ''}>
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-amber-200/80">Desde</p>
          <h3 className="mt-3 font-display text-3xl text-white">{service.title}</h3>
          <p className="mt-3 text-xl text-amber-100">{service.price}</p>
        </div>

        <div className={featured ? '' : 'mt-6'}>
          <ul className="space-y-3 text-sm leading-6 text-zinc-300 sm:text-base">
            {service.features.map((feature) => (
              <li key={feature} className="flex gap-3">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-200" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <a
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full border border-amber-200/60 px-6 text-sm font-semibold uppercase tracking-[0.16em] text-amber-100 transition hover:bg-amber-100 hover:text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-200"
            href={buildWhatsAppUrl(`Hola Meli, quisiera consultar por ${service.title.toLowerCase()}.`)}
            target="_blank"
            rel="noreferrer"
          >
            Consultar disponibilidad
          </a>
        </div>
      </div>
    </article>
  )
}

export default function Services() {
  return (
    <section id="services" className="bg-zinc-950 px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.32em] text-amber-200/80">Experiencias a medida</p>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">Tarifas y Servicios</h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
            Cada cobertura se adapta a la historia, el lugar y el ritmo de quienes están frente a cámara.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} featured={index === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
