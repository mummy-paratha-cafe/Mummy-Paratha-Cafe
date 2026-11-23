import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getLastOrder } from '../utils/storage'
import { createWhatsAppUrl } from '../utils/whatsapp'
import { formatOrderDate, formatPrice } from '../utils/format'

export default function OrderSuccess() {
  const location = useLocation()
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)
  const order = useMemo(() => location.state?.order || getLastOrder(), [location.state?.order])

  useEffect(() => {
    if (!order) navigate('/', { replace: true })
  }, [navigate, order])

  if (!order) return null

  const copyOrderId = async () => {
    try {
      await navigator.clipboard.writeText(order.id)
      setCopied(true)
      toast.success('Order ID copied')
    } catch {
      toast.error('Could not copy the Order ID. Please select it and copy manually.')
    }
  }

  const reopenWhatsApp = () => {
    const url = createWhatsAppUrl(order)
    if (!url) {
      toast.error('WhatsApp is not configured yet.')
      return
    }
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <main className="success-page section-wrap">
      <div className="success-card">
        <div className="success-check" aria-hidden="true"><svg viewBox="0 0 56 56"><path d="m15 29 9 9 18-21" /></svg></div>
        <span className="eyebrow">THANK YOU, {order.name.split(' ')[0]}</span>
        <h1>Your order is on its way<br /><em>to WhatsApp</em></h1>
        <p className="success-reminder">Your order is confirmed only after you press Send in WhatsApp.</p>
        <div className="order-id-panel"><span>YOUR ORDER ID</span><strong>{order.id}</strong><button type="button" onClick={copyOrderId}>{copied ? 'Copied ✓' : 'Copy'}</button></div>
        <div className="success-meta"><span>{formatOrderDate(order.timestamp)}</span><span>{order.orderType}</span></div>
        <div className="success-customer"><span><small>ORDER FOR</small>{order.name}</span><span><small>PHONE</small>{order.phone}</span></div>
        <div className="success-summary">
          <h2>Here’s what you ordered</h2>
          {order.items.map((item) => <div key={item.id}><span>{item.name} <small>× {item.quantity}</small></span><strong>{formatPrice(item.price * item.quantity)}</strong></div>)}
          <div className="success-total"><span>Total</span><strong>{formatPrice(order.total)}</strong></div>
          {order.orderType === 'Delivery' && <p className="success-address">{order.address}</p>}
        </div>
        <div className="success-actions"><button className="button button--primary" type="button" onClick={reopenWhatsApp}>Open WhatsApp again <span>↗</span></button><Link className="button button--ghost" to="/">Back to home</Link><Link className="text-link" to="/#menu">Order again <span>→</span></Link></div>
      </div>
    </main>
  )
}
