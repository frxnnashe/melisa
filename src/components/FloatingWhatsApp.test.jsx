// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { act, cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import FloatingWhatsApp from './FloatingWhatsApp'

describe('FloatingWhatsApp', () => {
  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  it('uses the section in view to prepare a contextual message', () => {
    let callback
    const observe = vi.fn()
    const disconnect = vi.fn()

    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(next) {
          callback = next
        }

        observe = observe
        disconnect = disconnect
      },
    )

    const section = document.createElement('section')
    section.id = 'retratos'
    document.body.appendChild(section)

    render(<FloatingWhatsApp />)
    act(() => callback([{ isIntersecting: true, target: section }]))

    const link = screen.getByRole('link', { name: 'Consultar por WhatsApp' })
    expect(link.href).toContain('sesion%20de%20fotos')
    expect(disconnect).not.toHaveBeenCalled()

    section.remove()
  })

  it('accepts an initial context for focused landing pages', () => {
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        observe() {}
        disconnect() {}
      },
    )

    render(<FloatingWhatsApp initialContext="bodas" />)

    expect(screen.getByRole('link', { name: 'Consultar por WhatsApp' }).href).toContain(
      'disponibilidad%20para%20mi%20boda',
    )
  })
})
