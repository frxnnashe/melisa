// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Lightbox from './Lightbox'

afterEach(cleanup)

const images = [
  { src: '/one.webp', alt: 'Primera foto' },
  { src: '/two.webp', alt: 'Segunda foto' },
]

describe('Lightbox', () => {
  it('navigates between images without leaving the dialog', () => {
    render(<Lightbox images={images} initialIndex={0} onClose={() => {}} />)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Primera foto' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Imagen siguiente' }))
    expect(screen.getByRole('img', { name: 'Segunda foto' })).toBeInTheDocument()
  })

  it('closes with Escape', () => {
    const onClose = vi.fn()
    render(<Lightbox images={images} initialIndex={0} onClose={onClose} />)

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('supports swipe navigation on touch devices', () => {
    render(<Lightbox images={images} initialIndex={0} onClose={() => {}} />)

    const dialog = screen.getByRole('dialog')
    fireEvent.touchStart(dialog, { touches: [{ clientX: 240 }] })
    fireEvent.touchEnd(dialog, { changedTouches: [{ clientX: 80 }] })

    expect(screen.getByRole('img', { name: 'Segunda foto' })).toBeInTheDocument()
  })
})
