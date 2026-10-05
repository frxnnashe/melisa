import { describe, expect, it } from 'vitest'
import {
  buildContactMessage,
  buildWhatsAppUrl,
  getContextualMessage,
} from './whatsapp'

describe('WhatsApp links', () => {
  it('always uses the complete international number', () => {
    expect(buildWhatsAppUrl('Hola')).toBe(
      'https://wa.me/5493541521405?text=Hola',
    )
  })

  it('changes the enquiry according to the visible service', () => {
    expect(getContextualMessage('services')).toContain('servicios')
    expect(getContextualMessage('portfolio')).toContain('boda en Bariloche')
    expect(getContextualMessage('retratos')).toContain('sesion de fotos')
  })

  it('builds a readable form message with supplied fields only', () => {
    const message = buildContactMessage({
      name: 'Ana',
      email: 'ana@example.com',
      phone: '',
      service: 'Fotografia de Boda',
      date: '2027-02-14',
      message: 'Consulta por disponibilidad',
    })

    expect(message).toContain('Nombre: Ana')
    expect(message).toContain('Email: ana@example.com')
    expect(message).toContain('Servicio: Fotografia de Boda')
    expect(message).not.toContain('Telefono:')
  })
})
