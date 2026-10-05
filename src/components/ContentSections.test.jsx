// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import About from './About'
import Contact from './Contact'
import DroneSection from './DroneSection'
import Services from './Services'

beforeAll(() => {
  class IntersectionObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  window.IntersectionObserver = IntersectionObserverMock
})

afterEach(cleanup)

describe('content sections', () => {
  it('shows the approved prices and services', () => {
    render(<Services />)

    expect(screen.getByText('Desde USD 500')).toBeInTheDocument()
    expect(screen.getByText('Desde USD 200')).toBeInTheDocument()
    expect(screen.getByText('Desde USD 350')).toBeInTheDocument()
    expect(screen.getByText('Bodas íntimas o elopements.')).toBeInTheDocument()
  })

  it('uses the professional presentation from the PDF', () => {
    render(<About />)

    expect(
      screen.getByRole('heading', { name: 'Melisa Santa Cruz, Fotógrafa Profesional' }),
    ).toBeInTheDocument()
    expect(screen.getByText(/llenos de emociones a través del arte/i)).toBeInTheDocument()
  })

  it('provides a labelled contact form and complete contact data', () => {
    render(<Contact />)

    expect(screen.getByLabelText('Nombre completo')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Servicio')).toBeInTheDocument()
    expect(screen.getByText(/Bariloche, Patagonia, Argentina/i)).toBeInTheDocument()
    expect(screen.getByText('+54 9 3541-521405')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Enviar por WhatsApp' })).toBeInTheDocument()
  })

  it('uses lazy video loading and the correct source types', () => {
    const { container } = render(<DroneSection />)
    const videos = container.querySelectorAll('video')
    const sources = container.querySelectorAll('source')

    expect(videos).toHaveLength(2)
    expect(videos[0]).toHaveAttribute('preload', 'metadata')
    expect(sources[0]).toHaveAttribute('type', 'video/webm')
    expect(sources[1]).toHaveAttribute('type', 'video/mp4')
  })
})
