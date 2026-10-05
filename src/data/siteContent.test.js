import { describe, expect, it } from 'vitest'
import { portfolioCategories, services, weddings } from './siteContent'

describe('site content from the approved PDF', () => {
  it('keeps only weddings with available approved material', () => {
    expect(weddings.map(({ couple }) => couple)).toEqual([
      'Sol & Darko',
      'Marcelo & Michelli',
      'Barby & Luis',
      'Emma & Dante',
    ])
  })

  it('does not expose weddings the PDF asked to remove', () => {
    const names = weddings.map(({ couple }) => couple)

    expect(names).not.toContain('Taty & Eloy')
    expect(names).not.toContain('Maxi & Cami')
    expect(names).not.toContain('Natalia & Pablo')
  })

  it('exposes every portfolio category requested by the client', () => {
    expect(portfolioCategories.map(({ label }) => label)).toEqual([
      'Historias de Bodas',
      'Sesiones y Retratos',
      'Cobertura de eventos',
      'Arquitectura y Producto',
      'Video & Dron',
    ])
  })

  it('uses the prices specified in the PDF', () => {
    expect(services.map(({ price }) => price)).toEqual([
      'Desde USD 500',
      'Desde USD 200',
      'Desde USD 350',
    ])
  })
})
