export const WHATSAPP_NUMBER = '5493541521405'

const contextualMessages = {
  portfolio: 'Hola, quiero consultar disponibilidad para mi boda en Bariloche.',
  retratos: 'Hola, quiero informacion sobre una sesion de fotos en la Patagonia.',
  eventos: 'Hola, quiero consultar por la cobertura audiovisual de un evento.',
  services: 'Hola, quiero conocer disponibilidad y valores de tus servicios.',
  drone: 'Hola, quiero consultar por el servicio de video y dron.',
  default: 'Hola, quiero conocer mas sobre tus servicios de fotografia.',
}

export const getContextualMessage = (sectionId) =>
  contextualMessages[sectionId] ?? contextualMessages.default

export const buildWhatsAppUrl = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

export const buildContactMessage = ({
  name,
  email,
  phone,
  service,
  date,
  message,
}) =>
  [
    'Nueva consulta desde melisasantacruz.com',
    `Nombre: ${name}`,
    `Email: ${email}`,
    phone ? `Telefono: ${phone}` : '',
    service ? `Servicio: ${service}` : '',
    date ? `Fecha: ${date}` : '',
    message ? `Mensaje: ${message}` : '',
  ]
    .filter(Boolean)
    .join('\n')
