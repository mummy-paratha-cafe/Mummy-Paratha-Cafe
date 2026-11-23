import { CONFIG } from '../config'

export default function DeliveryInfo() {
  return (
    <section className="delivery-banner section-wrap">
      <div className="delivery-banner-icon">🛵</div>
      <div>
        <span className="eyebrow">GOODNESS, TO YOUR DOOR</span>
        <h2>Home delivery <em>FREE</em></h2>
        <p>Within {CONFIG.freeDeliveryRadiusKm} km of Knowledge Park 3. Outside this area, we’ll confirm the charge on WhatsApp.</p>
      </div>
      <div className="delivery-partners">
        <span>Also find us on</span>
        <div><a href={CONFIG.swiggyUrl} target="_blank" rel="noreferrer">Swiggy ↗</a><a href={CONFIG.zomatoUrl} target="_blank" rel="noreferrer">Zomato ↗</a></div>
      </div>
    </section>
  )
}
