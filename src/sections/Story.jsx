import { motion } from 'framer-motion'
import { CONFIG } from '../config'
import SectionTitle from '../components/SectionTitle'

export default function Story() {
  return (
    <section className="section story-section section-wrap" id="story">
      <div className="story-art"><div className="story-plate"><img src="/images/cafe-front.jpeg" alt="Mummy Paratha & Cafe storefront" loading="lazy" /></div><span className="story-stamp">MADE<br />WITH<br />LOVE</span><span className="story-spark">✳</span></div>
      <motion.div className="story-copy" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.6 }}>
        <SectionTitle eyebrow="A LITTLE ABOUT US">Food that feels like <em>home</em></SectionTitle>
        <p>At {CONFIG.name}, we believe the best meals are the ones made with care. We bring together the comfort of home-style cooking and the joy of sharing something delicious.</p>
        <p>Every paratha, every cup of chai, and every plate is prepared with love—so you can slow down, take a bite, and feel right at home.</p>
        <strong className="story-signoff">{CONFIG.subTagline}</strong>
        <a className="text-link" href="#menu">Come hungry <span>→</span></a>
      </motion.div>
    </section>
  )
}
