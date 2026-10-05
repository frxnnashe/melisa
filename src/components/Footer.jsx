import { instagramUrl } from '../data/siteContent'
import { buildWhatsAppUrl } from '../utils/whatsapp'

const footerLinks = [
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Sobre mí', href: '#about' },
  { label: 'Servicios', href: '#services' },
  { label: 'Opiniones', href: '#testimonios' },
  { label: 'Contacto', href: '#contacto' },
]

const landingMissingSections = new Set(['#portfolio', '#about'])

export default function Footer({ homeHrefPrefix = '' }) {
  return (
    <footer className="border-t border-white/10 bg-zinc-950 px-5 py-12 text-white sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.2fr_0.8fr_1fr]">
        <div>
          <p className="font-display text-3xl">Melisa Santa Cruz</p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-400">
            Fotografía de bodas, retratos y eventos en Bariloche y a destino.
          </p>
        </div>

        <nav aria-label="Navegación del pie de página">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-200">Secciones</p>
          <ul className="mt-4 space-y-2 text-sm text-zinc-400">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a
                  className="hover:text-white"
                  href={homeHrefPrefix && landingMissingSections.has(link.href) ? `${homeHrefPrefix}${link.href}` : link.href}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-200">Contacto</p>
          <address className="mt-4 space-y-2 text-sm not-italic text-zinc-400">
            <p>Bariloche, Patagonia, Argentina</p>
            <a className="block hover:text-white" href="mailto:melisasantacruz@gmail.com">melisasantacruz@gmail.com</a>
            <a
              className="block hover:text-white"
              href={buildWhatsAppUrl('Hola Meli, quisiera hacer una consulta.')}
              target="_blank"
              rel="noreferrer"
            >
              +54 9 3541-521405
            </a>
            <a className="block hover:text-white" href={instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
          </address>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-2 border-t border-white/10 pt-7 text-xs text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Melisa Santa Cruz.</p>
        <p>Fotografía profesional en la Patagonia.</p>
      </div>
    </footer>
  )
}
