import { useState } from 'react'
import { awards, googleReviewsUrl, reviews } from '../data/siteContent'

export default function SocialProof() {
  const [activeReview, setActiveReview] = useState(0)
  const review = reviews[activeReview]

  const showPrevious = () => {
    setActiveReview((current) => (current - 1 + reviews.length) % reviews.length)
  }

  const showNext = () => {
    setActiveReview((current) => (current + 1) % reviews.length)
  }

  return (
    <section id="testimonios" className="bg-stone-100 px-5 py-24 text-zinc-950 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-800">Experiencias reales</p>
            <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">Opiniones de parejas</h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-zinc-700">
              La confianza y la comodidad forman parte de cada cobertura, desde la primera conversación hasta la
              entrega final.
            </p>
            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex min-h-12 items-center rounded-full border border-zinc-400 px-6 text-sm font-semibold uppercase tracking-[0.14em] transition hover:border-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950"
            >
              Ver reseñas en Google
            </a>
          </div>

          <article aria-live="polite" className="rounded-2xl bg-zinc-950 p-7 text-white shadow-2xl sm:p-10">
            <div aria-label="5 de 5 estrellas" className="text-sm tracking-[0.35em] text-amber-200">
              ★★★★★
            </div>
            <blockquote className="mt-7 font-display text-2xl leading-relaxed text-zinc-100 sm:text-3xl">
              “{review.text}”
            </blockquote>
            <div className="mt-8 flex items-end justify-between gap-5 border-t border-white/10 pt-6">
              <div>
                <p className="font-semibold">{review.name}</p>
                <p className="mt-1 text-sm text-zinc-400">{review.title} · {review.date}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Opinión anterior"
                  onClick={showPrevious}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-xl transition hover:bg-white hover:text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label="Siguiente opinión"
                  onClick={showNext}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-xl transition hover:bg-white hover:text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
                >
                  →
                </button>
              </div>
            </div>
          </article>
        </div>

        <div className="mt-20 border-t border-zinc-300 pt-12">
          <p className="text-center text-xs uppercase tracking-[0.28em] text-zinc-600">Reconocimientos</p>
          <div className="mt-9 grid grid-cols-1 items-center gap-10 sm:grid-cols-3">
            {awards.map((award) => (
              <img
                key={award.name}
                src={award.src}
                alt={`Reconocimiento ${award.name}`}
                className="mx-auto h-40 w-full max-w-52 object-contain"
                loading="lazy"
                decoding="async"
                width="400"
                height="400"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
