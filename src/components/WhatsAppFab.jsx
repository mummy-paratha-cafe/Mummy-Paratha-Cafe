import toast from 'react-hot-toast'
import { CONFIG } from '../config'

export default function WhatsAppFab() {
  const rawNumber = import.meta.env.VITE_WHATSAPP_NUMBER
  const number = (rawNumber || '').toString().trim().replace(/[^0-9]/g, '')

  const openChat = () => {
    if (!number || number.length <= 10) {
      toast.error('WhatsApp contact is not configured yet.')
      return
    }
    const defaultText = encodeURIComponent(`Hi ${CONFIG.name}, I would like to inquire about your menu and delivery!`)
    window.open(`https://wa.me/${number}?text=${defaultText}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      className="whatsapp-fab"
      type="button"
      onClick={openChat}
      aria-label={`Chat with ${CONFIG.name} on WhatsApp`}
    >
      <span aria-hidden="true" className="whatsapp-fab-icon">💬</span>
      <span>Chat on WhatsApp</span>
    </button>
  )
}
