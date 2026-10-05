// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import WeddingLanding from './WeddingLanding'

vi.mock('./components/FloatingWhatsApp', () => ({ default: () => null }))

describe('WeddingLanding', () => {
  it('focuses the page on weddings in Bariloche and the approved stories', () => {
    render(<WeddingLanding />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'Fotografía de Bodas y Elopements en Bariloche y a destino.' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Sol & Darko')).toBeInTheDocument()
    expect(screen.getByText('Emma & Dante')).toBeInTheDocument()
    expect(screen.queryByText(/Taty/i)).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Consultar fecha' })).toHaveAttribute('href', '#contacto')
    expect(screen.getByRole('link', { name: 'Portfolio' })).toHaveAttribute('href', '/#portfolio')
    expect(screen.getByRole('link', { name: 'Sobre mí' })).toHaveAttribute('href', '/#about')

    const storyImage = screen.getByAltText(/Sol & Darko, boda/i)
    expect(storyImage).toHaveAttribute('srcset')
    expect(storyImage.getAttribute('srcset')).toContain('/responsive/')
  })
})
