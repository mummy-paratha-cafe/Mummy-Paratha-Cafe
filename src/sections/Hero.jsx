import { CONFIG } from '../config'
import { useIsLowEnd } from '../hooks/useIsLowEnd'
import { useReducedMotion } from '../hooks/useReducedMotion'
import MagneticButton from '../components/MagneticButton'
import SmokeWave from '../components/SmokeWave'

function HeroArtwork({ animateSmoke }) {
  return (
    <div className="hero-photo-wrap">
      <img className="hero-food-photo" src="/images/food/thali-new.webp" alt="Fresh Indian thali with paratha, rice and homestyle curries" fetchPriority="high" />
      {animateSmoke && <SmokeWave className="hero-smoke-wave" />}
    </div>
  )
}

export default function Hero() {
  const reducedMotion = useReducedMotion()
  const lowEnd = useIsLowEnd()
  const animateSmoke = !reducedMotion && !lowEnd

  return (
    <section className="hero section-wrap" id="home">
      <div className="hero-copy">
        <span className="eyebrow"><i /> Mummy's homely kitchen</span>
        <span className="hero-kitchen-list">PARATHA <i /> THALI <i /> CHAI</span>
        <h1>Ghar Ka<br /><em>Swaad</em></h1>
        <p className="hero-subtitle">Every bite feels like home</p>
        <p className="hero-description">Hot-off-the-tawa parathas, comforting thalis and soulful chai—made fresh with the warmth of mummy's kitchen.</p>
        <div className="hero-buttons">
          <MagneticButton className="button button--primary" href="#menu">Order Now <span aria-hidden="true">↗</span></MagneticButton>
          <a className="button button--ghost" href="#menu">View menu <span aria-hidden="true">↓</span></a>
        </div>
        <div className="hero-badges-group">
          <div className="hero-delivery">
            <span className="delivery-icon" aria-hidden="true">🛵</span>
            <span>
              <b>Home delivery FREE up to {CONFIG.freeDeliveryRadiusKm} km</b>
              <small>Knowledge Park 3, Greater Noida</small>
            </span>
          </div>
          <div className="hero-partner-pill">
            <span className="partner-dot" />
            <span>Swiggy and Zomato delivery available</span>
          </div>
        </div>
      </div>
      <div className="hero-art" role="img" aria-label="A bowl of steaming vegetable soup with smoke rising above it">
        <div className="hero-glow" />
        <HeroArtwork animateSmoke={animateSmoke} />
        <div className="hero-stamp" aria-hidden="true"><span>✳</span><b>Made with<br />a little extra love</b></div>
        <div className="hero-note hero-note--top"><span>✦</span> 100% Pure Veg</div>
        <div className="hero-note hero-note--bottom">Warm comfort in every bowl <span>✳</span></div>
      </div>
      <a className="scroll-cue" href="#trust">Scroll to explore <span>↓</span></a>
    </section>
  )
}
