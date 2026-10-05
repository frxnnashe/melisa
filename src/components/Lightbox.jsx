import { useEffect, useRef, useState } from 'react'

const Lightbox = ({ images, initialIndex, onClose }) => {
  const [index, setIndex] = useState(initialIndex)
  const closeButtonRef = useRef(null)
  const dialogRef = useRef(null)
  const previousFocusRef = useRef(null)
  const touchStartXRef = useRef(null)

  const showPrevious = () => {
    setIndex((current) => (current - 1 + images.length) % images.length)
  }

  const showNext = () => {
    setIndex((current) => (current + 1) % images.length)
  }

  useEffect(() => {
    previousFocusRef.current = document.activeElement
    closeButtonRef.current?.focus()
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') {
        setIndex((current) => (current - 1 + images.length) % images.length)
      }
      if (event.key === 'ArrowRight') {
        setIndex((current) => (current + 1) % images.length)
      }
      if (event.key === 'Tab') {
        const focusable = [...dialogRef.current.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])')]
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

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      previousFocusRef.current?.focus?.()
    }
  }, [images.length, onClose])

  const image = images[index]

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Visor de fotografías"
      onTouchStart={(event) => {
        touchStartXRef.current = event.touches[0]?.clientX ?? null
      }}
      onTouchEnd={(event) => {
        const startX = touchStartXRef.current
        const endX = event.changedTouches[0]?.clientX
        touchStartXRef.current = null
        if (startX === null || endX === undefined || Math.abs(startX - endX) < 50) return
        if (startX > endX) showNext()
        else showPrevious()
      }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 p-3 md:p-8"
    >
      <button
        ref={closeButtonRef}
        type="button"
        aria-label="Cerrar galería"
        onClick={onClose}
        className="focus-ring absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/55 text-2xl text-white"
      >
        ×
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Imagen anterior"
            onClick={showPrevious}
            className="focus-ring absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/55 text-2xl text-white md:left-8"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Imagen siguiente"
            onClick={showNext}
            className="focus-ring absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/55 text-2xl text-white md:right-8"
          >
            →
          </button>
        </>
      )}

      <figure className="flex max-h-full max-w-6xl flex-col items-center gap-3">
        <img
          src={image.src}
          alt={image.alt}
          width="1800"
          height="1200"
          className="max-h-[82dvh] max-w-full object-contain"
        />
        <figcaption className="text-center text-sm text-white/75">
          {image.alt} <span aria-hidden="true">({index + 1}/{images.length})</span>
        </figcaption>
      </figure>
    </div>
  )
}

export default Lightbox
