import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { CONFIG } from '../config'
import { useCartStore } from '../store/cartStore'
import { getLastOrder, saveOrder } from '../utils/storage'
import { generateOrderId } from '../utils/orderId'
import { createWhatsAppUrl } from '../utils/whatsapp'
import { formatPrice } from '../utils/format'
import SectionTitle from '../components/SectionTitle'
import { FoodVisual } from '../components/MenuCard'

const initialForm = { name: '', phone: '', address: '', orderType: 'Delivery', notes: '' }

export default function Checkout() {
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clear)
  const navigate = useNavigate()
  const orderPlaced = useRef(false)
  const [form, setForm] = useState(() => {
    const last = getLastOrder()
    return {
      ...initialForm,
      name: last?.name || '',
      phone: last?.phone || '',
      address: last?.address || '',
    }
  })
  const [errors, setErrors] = useState({})
  const subtotal = useMemo(() => items.reduce((total, item) => total + item.price * item.quantity, 0), [items])
  const total = subtotal + CONFIG.deliveryFee

  useEffect(() => {
    if (!items.length && !orderPlaced.current) {
      navigate('/', { replace: true })
    }
  }, [items.length, navigate])

  const update = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  const validate = () => {
    const next = {}
    if (form.name.trim().length < 2) next.name = 'Please enter your full name (at least 2 characters).'
    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) next.phone = 'Enter a valid 10-digit Indian mobile number.'
    if (form.orderType === 'Delivery' && form.address.trim().length < 8) next.address = 'Add your house or flat, street, area and a nearby landmark.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = (event) => {
    event.preventDefault()
    if (!validate()) {
      toast.error('Please check the highlighted details.')
      return
    }

    const timestamp = new Date().toISOString()
    const order = {
      id: generateOrderId(new Date(timestamp)),
      timestamp,
      items: items.map(({ id, name, price, quantity, category, image }) => ({ id, name, price, quantity, category, image })),
      subtotal,
      deliveryFee: CONFIG.deliveryFee,
      total,
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.orderType === 'Delivery' ? form.address.trim() : '',
      orderType: form.orderType,
      notes: form.notes.trim(),
    }
    const url = createWhatsAppUrl(order)
    if (!url) {
      toast.error('WhatsApp is not configured. Please add VITE_WHATSAPP_NUMBER to your .env file.')
      return
    }

    try {
      saveOrder(order)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not save your order. Please try again.')
      return
    }
    window.open(url, '_blank', 'noopener,noreferrer')
    orderPlaced.current = true
    clearCart()
    navigate('/order-success', { state: { order } })
  }

  return (
    <main className="checkout-page section-wrap">
      <Link to="/" className="back-link">← Back to the cafe</Link>
      <SectionTitle eyebrow="ALMOST THERE">Let’s make it <em>yours</em></SectionTitle>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={submit} noValidate>
          <div className="form-section-heading"><span>01</span><div><h2>Your details</h2><p>We’ll use these to get your order to you.</p></div></div>
          <label className="form-field">Full name <span>*</span><input name="name" value={form.name} onChange={update} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />{errors.name && <small id="name-error" className="field-error">{errors.name}</small>}</label>
          <label className="form-field">Phone number <span>*</span><div className="phone-input"><span>+91</span><input name="phone" type="tel" inputMode="numeric" value={form.phone} onChange={update} autoComplete="tel-national" maxLength={10} placeholder="10-digit mobile number" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} /></div>{errors.phone && <small id="phone-error" className="field-error">{errors.phone}</small>}</label>
          <fieldset className="order-type-field"><legend>How would you like your order?</legend><div className="order-type-options">
            {['Delivery', 'Pickup'].map((type) => <label key={type} className={form.orderType === type ? 'order-type-option selected' : 'order-type-option'}><input type="radio" name="orderType" value={type} checked={form.orderType === type} onChange={update} /><span>{type === 'Delivery' ? '🛵' : '🏠'} {type}</span></label>)}
          </div></fieldset>
          {form.orderType === 'Delivery' && <>
            <label className="form-field">Delivery address <span>*</span><textarea name="address" value={form.address} onChange={update} rows="4" placeholder="House or flat, street, area, landmark" autoComplete="street-address" aria-invalid={Boolean(errors.address)} aria-describedby={errors.address ? 'address-error' : 'delivery-note'} />{errors.address && <small id="address-error" className="field-error">{errors.address}</small>}<small id="delivery-note" className="field-hint">Free delivery within {CONFIG.freeDeliveryRadiusKm} km of Knowledge Park 3. Outside this area, we will confirm the charge on WhatsApp.</small></label>
          </>}
          {form.orderType === 'Pickup' && <p className="pickup-note">You can pick up your order from {CONFIG.address}.</p>}
          <label className="form-field">Notes for the cafe <small className="optional">(optional)</small><textarea name="notes" value={form.notes} onChange={update} rows="3" placeholder="Anything else we should know?" /></label>
          <button className="button button--primary button--full checkout-submit" type="submit">Place order on WhatsApp <span aria-hidden="true">↗</span></button>
          <p className="checkout-disclaimer">Your order is sent to the cafe through WhatsApp. No payment is collected on this website.</p>
        </form>

        <aside className="order-summary">
          <div className="summary-title"><span className="eyebrow">YOUR ORDER</span><h2>Order summary <span>({items.reduce((sum, item) => sum + item.quantity, 0)})</span></h2></div>
          <div className="summary-items">{items.map((item) => <div className="summary-item" key={item.id}><FoodVisual item={item} /><div><b>{item.name}</b><span>Qty {item.quantity}</span></div><strong>{formatPrice(item.price * item.quantity)}</strong></div>)}</div>
          <div className="summary-total"><div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><div><span>Delivery</span><strong>{CONFIG.deliveryFee ? formatPrice(CONFIG.deliveryFee) : 'FREE'}</strong></div><div className="summary-grand"><span>Total</span><strong>{formatPrice(total)}</strong></div></div>
          <p className="summary-edit"><Link to="/">← Add something else</Link></p>
        </aside>
      </div>
    </main>
  )
}
