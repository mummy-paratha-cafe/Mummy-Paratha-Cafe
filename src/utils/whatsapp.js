import { CONFIG } from '../config'
import { formatOrderDate } from './format'

export function buildWhatsAppMessage(order) {
  const itemLines = order.items
    .map((item, index) => `${index + 1}. ${item.name} x ${item.quantity} - Rs. ${item.price * item.quantity}`)
    .join('\n')
  const addressLine = order.orderType === 'Delivery' ? `Address: ${order.address}` : 'Address: Pickup (at cafe)'
  const notesLine = order.notes ? `\nNotes: ${order.notes}` : ''

  return [
    `*New Order - ${CONFIG.name}*`,
    `Order ID: ${order.id}`,
    `Date: ${formatOrderDate(order.timestamp)}`,
    '',
    '*Customer Details*',
    `Name: ${order.name}`,
    `Phone: ${order.phone}`,
    `Order Type: ${order.orderType}`,
    addressLine,
    '',
    '*Order Items*',
    itemLines,
    '',
    `*Total Amount: Rs. ${order.total}*${notesLine}`,
    '',
    'Please confirm my order and share estimated preparation time. Thank you!',
  ].join('\n')
}

export function createWhatsAppUrl(order) {
  const rawNumber = import.meta.env.VITE_WHATSAPP_NUMBER
  const number = (rawNumber || '').toString().trim().replace(/[^0-9]/g, '')
  if (!number || number.length < 10) return null

  return `https://wa.me/${number}?text=${encodeURIComponent(buildWhatsAppMessage(order))}`
}
