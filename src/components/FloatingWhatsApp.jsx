import { useEffect, useState } from 'react'
import { buildWhatsAppUrl, getContextualMessage } from '../utils/whatsapp'

const observedSections = ['portfolio', 'drone', 'services', 'contacto']

export default function FloatingWhatsApp() {
  const [context, setContext] = useState('default')

  useEffect(() => {
    const handleContext = (event) => setContext(event.detail)
    window.addEventListener('whatsapp-context', handleContext)

    if (!('IntersectionObserver' in window)) {
      return () => window.removeEventListener('whatsapp-context', handleContext)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setContext(visible.target.id)
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )

    observedSections.forEach((sectionId) => {
      const section = document.getElementById(sectionId)
      if (section) observer.observe(section)
    })

    return () => {
      observer.disconnect()
      window.removeEventListener('whatsapp-context', handleContext)
    }
  }, [])

  return (
    <a
      href={buildWhatsAppUrl(getContextualMessage(context))}
      target="_blank"
      rel="noreferrer"
      aria-label="Consultar por WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex min-h-12 items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-2xl transition hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
    >
      <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-white" />
      WhatsApp
    </a>
  )
}
