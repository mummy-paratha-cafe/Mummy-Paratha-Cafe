import { motion } from 'framer-motion'
import SmokeWave from '../components/SmokeWave'
import ScrollSection from '../components/ScrollSection'

export default function TawaMoment() {
  return (
    <ScrollSection className="section tawa-moment" id="tawa" aria-labelledby="tawa-heading">
      <div className="section-wrap tawa-moment-inner">
        <div className="tawa-moment-visual">
          <motion.div
            className="tawa-moment-card"
            initial={{ opacity: 0, y: 24, rotateY: -8, rotateX: 2 }}
            whileInView={{ opacity: 1, y: 0, rotateY: -4, rotateX: 1 }}
            whileHover={{ y: -5, rotateY: 0, rotateX: 0, scale: 1.015 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: 'spring', stiffness: 150, damping: 22 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <img
              className="tawa-moment-photo"
              src="/images/tawa-action.jpg"
              alt="A chef cooking in a smoky iron pan over an open flame"
              loading="lazy"
            />
            <SmokeWave className="tawa-smoke-wave" />
            <div className="tawa-photo-shade" />
            <span className="tawa-live-badge"><i /> HOT OFF THE TAWA</span>
            <span className="tawa-photo-caption">Freshly made, full of flavour</span>
          </motion.div>
        </div>
        <div className="tawa-moment-copy">
          <span className="eyebrow"><i /> THE HEART OF OUR KITCHEN</span>
          <h2 id="tawa-heading">Fresh from the <em>tawa</em></h2>
          <p>
            Watch the heat, hear the sizzle, and taste the comfort. Every order is made fresh and served warm, just the way you love it.
          </p>
          <a className="button button--primary" href="#menu">Explore the menu <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </ScrollSection>
  )
}
