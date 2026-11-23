import { Link } from 'react-router-dom'
import { CONFIG } from '../config'
import Logo from './Logo'

const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div><Logo /><p>{CONFIG.subTagline}</p></div>
        <div><span className="footer-label">FIND US</span><p>{CONFIG.address}</p><a href={`tel:${CONFIG.phoneDisplay}`}>{CONFIG.phoneDisplay}</a></div>
        <div><span className="footer-label">EXPLORE</span><a href="/#menu">Our menu</a><a href="/#story">Our story</a><a href={CONFIG.instagramUrl} target="_blank" rel="noreferrer">Instagram ↗</a><a href={CONFIG.facebookUrl} target="_blank" rel="noreferrer">Facebook ↗</a><Link to="/checkout">Checkout</Link></div>
      </div>
      <div className="footer-bottom"><span>© {currentYear} {CONFIG.name}. Made with love.</span><span>Good Food, Good Mood</span></div>
    </footer>
  )
}
