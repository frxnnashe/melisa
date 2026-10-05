// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import Hero from './Hero'

afterEach(cleanup)

describe('Hero', () => {
  it('shows the approved introduction and Instagram action', () => {
    render(<Hero />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'Melisa Santa Cruz' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/viajo a donde el amor y el arte me lleven/i),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /instagram/i })).toHaveAttribute(
      'href',
      'https://www.instagram.com/fotosmelisasantacruz/',
    )
  })

  it('announces the mobile menu state', () => {
    render(<Hero />)
    const menuButton = screen.getByRole('button', { name: /abrir menu/i })

    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')
  })
})
