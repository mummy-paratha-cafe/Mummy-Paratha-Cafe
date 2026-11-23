import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { useUiStore } from '../store/uiStore'
import { CONFIG } from '../config'
import { formatPrice } from '../utils/format'
import QuantityStepper from './QuantityStepper'
import { FoodVisual } from './MenuCard'

export default function CartDrawer() {
  const { items, increase, decrease, remove } = useCartStore()
  const { cartOpen, closeCart } = useUiStore()
  const navigate = useNavigate()
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const total = subtotal + CONFIG.deliveryFee

  useEffect(() => {
    if (!cartOpen) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') closeCart()
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [cartOpen, closeCart])

  const goToCheckout = () => {
    closeCart()
    navigate('/checkout')
  }

  const browseMenu = () => {
    closeCart()
    window.setTimeout(() => {
      document.getElementById('menu')?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      })
    }, 0)
  }

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.button className="drawer-backdrop" aria-label="Close cart" onClick={closeCart} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 260 }}>
            <div className="drawer-heading">
              <div><span className="eyebrow">YOUR ORDER</span><h2 id="cart-title">Your cart <span>({items.length})</span></h2></div>
              <button className="icon-button" type="button" onClick={closeCart} aria-label="Close cart">×</button>
            </div>
            <div className="cart-lines">
              {items.length === 0 ? (
                <div className="empty-cart"><span>🛒</span><h3>Your cart is waiting</h3><p>Add something delicious from our menu.</p><button className="button button--outline" type="button" onClick={browseMenu}>Browse menu</button></div>
              ) : items.map((item) => (
                <article className="cart-line" key={item.id}>
                  <FoodVisual item={item} />
                  <div className="cart-line-info"><h3>{item.name}</h3><span>{formatPrice(item.price)} each</span><QuantityStepper value={item.quantity} onDecrease={() => decrease(item.id)} onIncrease={() => increase(item.id)} label={`${item.name} cart quantity`} /></div>
                  <div className="cart-line-total"><strong>{formatPrice(item.price * item.quantity)}</strong><button type="button" onClick={() => remove(item.id)} aria-label={`Remove ${item.name}`}>Remove</button></div>
                </article>
              ))}
            </div>
            <div className="cart-summary">
              <div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
              <div><span>Delivery</span><strong>{CONFIG.deliveryFee === 0 ? 'FREE' : formatPrice(CONFIG.deliveryFee)}</strong></div>
              <div className="cart-grand-total"><span>Total</span><strong>{formatPrice(total)}</strong></div>
              <button className="button button--primary button--full" type="button" onClick={goToCheckout} disabled={!items.length}>Proceed to checkout <span aria-hidden="true">→</span></button>
              <p>Delivery is free within {CONFIG.freeDeliveryRadiusKm} km.</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
