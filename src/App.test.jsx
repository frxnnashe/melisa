// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

beforeAll(() => {
  class IntersectionObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  window.IntersectionObserver = IntersectionObserverMock
})

describe('App startup', () => {
  it('renders the page without waiting for the complete hero gallery', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'Melisa Santa Cruz' }),
    ).toBeInTheDocument()
    expect(screen.queryByText('Cargando...')).not.toBeInTheDocument()
  })
})
