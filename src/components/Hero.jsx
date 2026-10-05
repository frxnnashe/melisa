import { useEffect, useRef, useState } from 'react'
import {
  heroImages,
  instagramUrl,
  navigation,
} from '../data/siteContent'

const Hero = () => {
  const [backgroundIndex, setBackgroundIndex] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const menuButtonRef = useRef(null)
  const mobileNavigationRef = useRef(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return undefined

    const timer = window.setInterval(() => {
      setBackgroundIndex((current) => (current + 1) % heroImages.length)
    }, 6000)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMobileMenuOpen(false)
      if (event.key === 'Tab') {
        const links = [...mobileNavigationRef.current.querySelectorAll('a')]
        const focusable = [menuButtonRef.current, ...links]
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <header id="inicio" className="relative min-h-[100dvh] overflow-hidden bg-zinc-950 text-white">
      <img
        key={heroImages[backgroundIndex]}
        src={heroImages[backgroundIndex]}
        alt=""
        width="2200"
        height="1467"
        fetchPriority={backgroundIndex === 0 ? 'high' : 'auto'}
        className="absolute inset-0 h-full w-full object-cover animate-hero-fade"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/55" />

      <nav aria-label="Navegación principal" className="relative z-30 mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#inicio" className="focus-ring text-sm font-medium uppercase tracking-[0.2em] text-white md:text-base">
          <h1>Melisa Santa Cruz</h1>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="focus-ring text-sm text-white/85 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          aria-label={mobileMenuOpen ? 'Cerrar menu' : 'Abrir menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="focus-ring relative z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-black/25 lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <span aria-hidden="true" className="flex w-5 flex-col gap-1.5">
            <span className={`h-px bg-white transition-transform ${mobileMenuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`h-px bg-white transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-px bg-white transition-transform ${mobileMenuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </span>
        </button>

        <div
          ref={mobileNavigationRef}
          id="mobile-navigation"
          aria-hidden={!mobileMenuOpen}
          className={`fixed inset-0 z-40 flex items-center justify-center bg-zinc-950/98 px-6 transition-opacity lg:hidden ${
            mobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'
          }`}
        >
          <div className="flex w-full max-w-sm flex-col items-stretch gap-2 text-center">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="focus-ring border-b border-white/10 py-4 text-xl text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="relative z-20 mx-auto flex min-h-[calc(100dvh-5rem)] max-w-7xl items-end px-5 pb-14 md:px-8 md:pb-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.18em] text-white/75">
            Fotografía en Patagonia y a destino
          </p>
          <h2 className="font-display text-5xl font-normal leading-[0.98] tracking-tight md:text-7xl">
            Historias auténticas
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white md:text-lg">
            Narrando historias con luz, mi trabajo es crear retratos que capturan emociones y recuerdos. Con base en la Patagonia, viajo a donde el amor y el arte me lleven para documentar tu historia.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#portfolio"
              className="focus-ring inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 font-medium text-zinc-950 transition-transform active:scale-[0.98]"
            >
              Ver portfolio
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex min-h-12 items-center justify-center rounded-full border border-white/45 bg-black/20 px-6 font-medium text-white transition-colors hover:bg-white/10"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Hero
