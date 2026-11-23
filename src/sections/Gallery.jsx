import { motion } from 'framer-motion'
import { gallery } from '../data/gallery'
import SectionTitle from '../components/SectionTitle'

export default function Gallery() {
  return (
    <section className="section gallery-section" id="gallery">
      <div className="section-wrap">
        <SectionTitle eyebrow="A TASTE OF OUR PLACE" description="Good food is even better when shared.">A little look <em>around</em></SectionTitle>
        <div className="gallery-grid">
          {gallery.map((image, index) => (
            <motion.div className={`gallery-tile gallery-tile--${index + 1}`} key={image.label} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.05 }} whileHover={{ scale: 1.025 }}>
              <img src={image.image} alt={image.label} loading="lazy" />
              <span className="gallery-caption">{image.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
