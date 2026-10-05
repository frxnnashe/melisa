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

  it('keeps keyboard focus inside the open mobile menu', () => {
    const { container } = render(<Hero />)
    const menuButton = screen.getByRole('button', { name: /abrir menu/i })
    fireEvent.click(menuButton)

    const mobileLinks = container.querySelectorAll('#mobile-navigation a')
    const lastLink = mobileLinks[mobileLinks.length - 1]
    lastLink.focus()
    fireEvent.keyDown(document, { key: 'Tab' })

    expect(menuButton).toHaveFocus()
  })

  it('restores focus to the menu button when Escape closes the menu', () => {
    const { container } = render(<Hero />)
    const menuButton = screen.getByRole('button', { name: /abrir menu/i })
    fireEvent.click(menuButton)

    container.querySelector('#mobile-navigation a').focus()
    fireEvent.keyDown(document, { key: 'Escape' })

    expect(menuButton).toHaveFocus()
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })
})
