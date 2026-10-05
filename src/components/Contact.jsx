import { useState } from 'react'
import { instagramUrl, services } from '../data/siteContent'
import { buildContactMessage, buildWhatsAppUrl } from '../utils/whatsapp'

const initialForm = {
  name: '',
  email: '',
  service: services[0].title,
  date: '',
  message: '',
}

const fieldClass =
  'mt-2 w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-amber-200 focus:ring-2 focus:ring-amber-200/30'

export default function Contact() {
  const [formData, setFormData] = useState(initialForm)

  const updateField = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const submit = (event) => {
    event.preventDefault()
    window.open(buildWhatsAppUrl(buildContactMessage(formData)), '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="contacto" className="bg-zinc-950 px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-amber-200/80">Contacto</p>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">Contame tu historia</h2>
          <p className="mt-6 max-w-md text-base leading-7 text-zinc-300">
            Compartime la fecha, el lugar y la experiencia que imaginás. Te responderé con una propuesta pensada para
            ese momento.
          </p>

          <address className="mt-10 space-y-3 not-italic text-zinc-300">
            <p>Bariloche, Patagonia, Argentina</p>
            <a className="block hover:text-amber-100" href="mailto:melisasantacruz@gmail.com">
              melisasantacruz@gmail.com
            </a>
            <a
              className="block hover:text-amber-100"
              href={buildWhatsAppUrl('Hola Meli, quisiera hacer una consulta.')}
              target="_blank"
              rel="noreferrer"
            >
              +54 9 3541-521405
            </a>
            <a className="block hover:text-amber-100" href={instagramUrl} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </address>
        </div>

        <form onSubmit={submit} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="text-sm font-medium text-zinc-200">
              Nombre completo
              <input
                className={fieldClass}
                type="text"
                name="name"
                value={formData.name}
                onChange={updateField}
                autoComplete="name"
                required
              />
            </label>
            <label className="text-sm font-medium text-zinc-200">
              Email
              <input
                className={fieldClass}
                type="email"
                name="email"
                value={formData.email}
                onChange={updateField}
                autoComplete="email"
                required
              />
            </label>
            <label className="text-sm font-medium text-zinc-200">
              Servicio
              <select className={fieldClass} name="service" value={formData.service} onChange={updateField}>
                {services.map((service) => (
                  <option key={service.title} value={service.title} className="bg-zinc-900">
                    {service.title}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm font-medium text-zinc-200">
              Fecha aproximada
              <input
                className={fieldClass}
                type="date"
                name="date"
                value={formData.date}
                onChange={updateField}
              />
            </label>
          </div>

          <label className="mt-6 block text-sm font-medium text-zinc-200">
            Mensaje
            <textarea
              className={`${fieldClass} min-h-36 resize-y`}
              name="message"
              value={formData.message}
              onChange={updateField}
              placeholder="Lugar, cantidad de personas y cualquier detalle importante"
            />
          </label>

          <button
            type="submit"
            className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-amber-100 px-6 text-sm font-bold uppercase tracking-[0.16em] text-zinc-950 transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-100 sm:w-auto"
          >
            Enviar por WhatsApp
          </button>
        </form>
      </div>
    </section>
  )
}
