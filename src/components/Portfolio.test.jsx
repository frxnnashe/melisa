// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import Portfolio from './Portfolio'

afterEach(cleanup)

describe('Portfolio', () => {
  it('renders the PDF categories and the approved wedding selection', () => {
    render(<Portfolio />)

    expect(screen.getByRole('tab', { name: 'Historias de Bodas' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Sesiones y Retratos' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Cobertura de eventos' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Arquitectura y Producto' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Video & Dron' })).toBeInTheDocument()

    expect(screen.getByText('Sol & Darko')).toBeInTheDocument()
    expect(screen.getByText('Marcelo & Michelli')).toBeInTheDocument()
    expect(screen.getByText('Emma & Dante')).toBeInTheDocument()
    expect(screen.queryByText('Taty & Eloy')).not.toBeInTheDocument()
    expect(screen.queryByText('Maxi & Cami')).not.toBeInTheDocument()
    expect(screen.queryByText('Natalia & Pablo')).not.toBeInTheDocument()
  })

  it('renders only the active category content', () => {
    render(<Portfolio />)

    fireEvent.click(screen.getByRole('tab', { name: 'Sesiones y Retratos' }))
    expect(
      screen.getByText(/tours fotográficos, books y pedidas de mano/i),
    ).toBeInTheDocument()
    expect(screen.queryByText('Sol & Darko')).not.toBeInTheDocument()
  })
})
