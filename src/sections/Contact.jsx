import { CONFIG } from '../config'
import SectionTitle from '../components/SectionTitle'

export default function Contact() {
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(CONFIG.address)}&output=embed`
  return (
    <section className="section contact-section section-wrap" id="contact">
      <div className="contact-content">
        <SectionTitle eyebrow="COME SAY HELLO">Your table is <em>waiting</em></SectionTitle>
        <div className="contact-details">
          <div><span className="contact-icon">⌖</span><div><b>Find us</b><p>{CONFIG.address}</p></div></div>
          <div><span className="contact-icon">☎</span><div><b>Give us a ring</b><p><a href={`tel:${CONFIG.phoneDisplay}`}>{CONFIG.phoneDisplay}</a></p></div></div>
          <div><span className="contact-icon">◷</span><div><b>Opening hours</b><p>{CONFIG.timings}</p></div></div>
        </div>
        <a className="button button--primary" href={`tel:${CONFIG.phoneDisplay}`}>Call the cafe <span>↗</span></a>
      </div>
      <div className="map-frame"><iframe title={`Map showing ${CONFIG.name}`} src={mapUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
    </section>
  )
}
