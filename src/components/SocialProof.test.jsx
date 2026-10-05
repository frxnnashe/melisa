// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import SocialProof from './SocialProof'

afterEach(cleanup)

describe('SocialProof', () => {
  it('shows one review at a time and lets visitors move through them', () => {
    render(<SocialProof />)

    expect(screen.getByRole('heading', { name: 'Opiniones de parejas' })).toBeInTheDocument()
    expect(screen.getByText('Natalia')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Siguiente opinión' }))

    expect(screen.getByText('Sol & Darko')).toBeInTheDocument()
    expect(screen.queryByText('Natalia')).not.toBeInTheDocument()
  })

  it('links to Google reviews and uses optimized award images', () => {
    render(<SocialProof />)

    expect(screen.getByRole('link', { name: 'Ver reseñas en Google' })).toHaveAttribute('target', '_blank')
    expect(screen.getByAltText('Reconocimiento Wedding Awards 2025')).toHaveAttribute('loading', 'lazy')
  })
})
