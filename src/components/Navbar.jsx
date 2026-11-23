import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { useUiStore } from '../store/uiStore'
import Logo from './Logo'

const links = [
  ['Menu', 'menu'],
  ['Our Story', 'story'],
  ['Gallery', 'gallery'],
  ['Reviews', 'reviews'],
  ['Contact', 'contact'],
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const count = useCartStore((state) => state.items.reduce((total, item) => total + item.quantity, 0))
  const toggleCart = useUiStore((state) => state.toggleCart)
  const location = useLocation()

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="nav-inner">
        <Logo compact />
        <nav className={`nav-links${mobileOpen ? ' nav-links--open' : ''}`} aria-label="Main navigation">
          {links.map(([label, id]) => (
            <a key={id} href={location.pathname === '/' ? `#${id}` : `/#${id}`} onClick={() => setMobileOpen(false)}>{label}</a>
          ))}
        </nav>
        <div className="nav-actions">
          <a className="nav-order button button--primary" href={location.pathname === '/' ? '#menu' : '/#menu'} onClick={() => setMobileOpen(false)}>
            Order Now <span aria-hidden="true">↗</span>
          </a>
          <button className="cart-button" type="button" onClick={toggleCart} aria-label={`Open cart, ${count} items`}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L21 8H6" /><circle cx="10" cy="20" r="1" /><circle cx="18" cy="20" r="1" /></svg>
            <span>Cart</span><b className={count ? 'cart-count cart-count--bounce' : 'cart-count'}>{count}</b>
          </button>
          <button className="mobile-menu-button" type="button" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} onClick={() => setMobileOpen((open) => !open)}>
            <span /><span />
          </button>
        </div>
      </div>
    </header>
  )
}
