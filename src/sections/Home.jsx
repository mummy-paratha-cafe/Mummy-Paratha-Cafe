import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { CONFIG } from '../config'
import { categories, menu } from '../data/menu'
import { gallery } from '../data/gallery'
import { reviews } from '../data/reviews'
import { useCartStore } from '../store/cartStore'
import { useUiStore } from '../store/uiStore'
import { formatPrice } from '../utils/format'
import { useReducedMotion } from '../hooks/useReducedMotion'
import CategoryTabs from '../components/CategoryTabs'
import MenuCard, { FoodVisual } from '../components/MenuCard'
import SectionTitle from '../components/SectionTitle'
import ScrollSection from '../components/ScrollSection'
import Hero from './Hero'
import TawaMoment from './TawaMoment'

const featuredItems = menu.filter((item) => item.isFeatured)

function TrustStrip() {
  const badges = [
    { icon: '🌿', label: 'Fresh Ingredients' },
    { icon: '🏠', label: 'Homely Food' },
    { icon: '🧡', label: 'Made With Love' },
    { icon: '✨', label: 'Hygienic Kitchen' },
  ]
  return (
    <ScrollSection className="trust-strip" id="trust" aria-label="Our quality promise">
      <div className="trust-inner">
        {badges.map(({ icon, label }) => (
          <div key={label}>
            <span aria-hidden="true">{icon}</span>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </ScrollSection>
  )
}

function Signature() {
  const add = useCartStore((state) => state.add)
  const openCart = useUiStore((state) => state.openCart)

  const quickAdd = (item) => {
    add(item)
    toast.success(`${item.name} added to your cart`)
    openCart()
  }

  return (
    <ScrollSection className="section section-wrap signature-section" id="signature">
      <SectionTitle eyebrow="THE HOUSE FAVOURITES" description="A few feel-good favourites, made fresh and served with love.">
        Meet the <em>Signatures</em>
      </SectionTitle>
      <div className="signature-grid">
        {featuredItems.map((item, index) => (
          <motion.article
            className={`signature-card signature-card--${index + 1}`}
            key={item.id}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            whileHover={{ y: -7, rotate: index % 2 ? 0.5 : -0.5 }}
            transition={{ type: 'spring', stiffness: 220 }}
          >
            <FoodVisual item={item} large />
            <span className="signature-number">0{index + 1}</span>
            <div className="signature-card-info">
              <span>{item.category}</span>
              <h3>{item.name}</h3>
              <div>
                <strong>{formatPrice(item.price)}</strong>
                <button type="button" onClick={() => quickAdd(item)} aria-label={`Add ${item.name} to cart`}>
                  +
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </ScrollSection>
  )
}

function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('Paratha')
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()
  const filtered = useMemo(() => {
    if (!normalizedQuery) {
      return menu.filter((item) => item.category === activeCategory)
    }

    const compactQuery = normalizedQuery.replace(/[^a-z0-9]+/g, '')
    const queryVariants = compactQuery === 'briyani' || compactQuery === 'biriyani'
      ? [compactQuery, 'biryani']
      : [compactQuery]
    const terms = normalizedQuery.split(/[\s-&]+/).filter(Boolean)

    return menu.filter((item) => {
      const searchable = `${item.name} ${item.category} ${item.description}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
      const normalizedItem = searchable.replace(/\s+/g, '')
      const matchesVariant = queryVariants.some((variant) => variant && normalizedItem.includes(variant))
      const matchesTerms = terms.every((term) => searchable.includes(term))
      return matchesVariant || matchesTerms
    })
  }, [activeCategory, normalizedQuery])

  return (
    <ScrollSection className="section menu-section" id="menu">
      <div className="section-wrap">
        <SectionTitle eyebrow="MADE FRESH, JUST FOR YOU" description="Find your new favourite, or come back to the one you love.">
          A menu full of <em>comfort</em>
        </SectionTitle>
        <div className="menu-toolbar">
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onSelect={(category) => {
              setQuery('')
              setActiveCategory(category)
            }}
          />
          <label className="menu-search">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search all dishes"
              aria-label="Search the complete menu"
            />
            {query && (
              <button type="button" className="menu-search-clear" onClick={() => setQuery('')} aria-label="Clear menu search">
                ×
              </button>
            )}
          </label>
        </div>
        {normalizedQuery && (
          <p className="menu-search-status" role="status" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? 'dish' : 'dishes'} found
          </p>
        )}
        <motion.div className="menu-grid" layout>
          {filtered.map((item) => (
            <motion.div key={item.id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <MenuCard item={item} />
            </motion.div>
          ))}
        </motion.div>
        {!filtered.length && (
          <p className="no-results">
            {normalizedQuery
              ? `No dishes found for "${query.trim()}". Try another name or dish.`
              : `No dishes found in ${activeCategory}.`}
          </p>
        )}
        <p className="menu-footnote">
          <span className="veg-mark" aria-hidden="true"><i /></span>
          Vegetarian and non-vegetarian dishes available.
        </p>
      </div>
    </ScrollSection>
  )
}

function Story() {
  return (
    <ScrollSection className="section story-section section-wrap" id="story">
      <div className="story-art">
        <div className="story-plate"><img src="/images/cafe-front.jpeg" alt="Mummy Paratha & Cafe storefront" loading="lazy" /></div>
        <span className="story-stamp">MADE<br />WITH<br />LOVE</span>
        <span className="story-spark" aria-hidden="true">✳</span>
      </div>
      <motion.div
        className="story-copy"
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
      >
        <SectionTitle eyebrow="A LITTLE ABOUT US">
          Food that feels like <em>home</em>
        </SectionTitle>
        <p>
          At {CONFIG.name}, we believe the best meals are the ones prepared with genuine warmth and care. We bring together the nostalgia of home cooking and the joy of sharing delicious flavours.
        </p>
        <p>
          Every paratha, every bowl of dal, and every cup of kadak chai is prepared from fresh, wholesome ingredients—so you can pause, savour every bite, and feel right at home.
        </p>
        <strong className="story-signoff">{CONFIG.subTagline}</strong>
        <a className="text-link" href="#menu">Browse our kitchen favourites <span>→</span></a>
      </motion.div>
    </ScrollSection>
  )
}

function Gallery() {
  const reducedMotion = useReducedMotion()

  return (
    <ScrollSection className="section gallery-section" id="gallery">
      <div className="section-wrap">
        <SectionTitle eyebrow="A TASTE OF OUR PLACE" description="Good food is even better when shared with friends and family.">
          A little look <em>around</em>
        </SectionTitle>
        <div className="gallery-grid">
          {gallery.map((image, index) => (
            <motion.div
              className={`gallery-tile gallery-tile--${index + 1}`}
              key={image.label}
              initial={reducedMotion ? false : { opacity: 0, y: 24, scale: 0.97 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.16 }}
              transition={{ delay: reducedMotion ? 0 : index * 0.08, duration: 0.55, type: 'spring', stiffness: 150, damping: 20 }}
              whileHover={reducedMotion ? undefined : { y: -8, rotateZ: index % 2 ? 0.45 : -0.45 }}
            >
              <img src={image.image} alt={image.label} loading="lazy" />
              <span className="gallery-caption">
                <span className="gallery-caption-index">0{index + 1}</span>
                <span>{image.label}</span>
                <span className="gallery-caption-mark" aria-hidden="true">↗</span>
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </ScrollSection>
  )
}

function Reviews() {
  const [active, setActive] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % reviews.length), 6000)
    return () => window.clearInterval(timer)
  }, [])
  const review = reviews[active]
  return (
    <ScrollSection className="section reviews-section" id="reviews">
      <div className="section-wrap review-content">
        <SectionTitle eyebrow="KIND WORDS, WARM HEARTS" centered>
          Good food makes <em>memories</em>
        </SectionTitle>
        <div className="review-stars" aria-label={`${review.rating} out of 5 stars`}>★★★★★</div>
        <blockquote
          onTouchStart={(event) => setTouchStart(event.changedTouches[0].clientX)}
          onTouchEnd={(event) => {
            if (touchStart === null) return
            const distance = event.changedTouches[0].clientX - touchStart
            if (Math.abs(distance) > 40) setActive((current) => (current + (distance < 0 ? 1 : reviews.length - 1)) % reviews.length)
            setTouchStart(null)
          }}
        >
          “{review.quote}”
        </blockquote>
        <span className="review-author">{review.name}</span>
        <div className="review-dots" role="group" aria-label="Choose a review">
          {reviews.map((entry, index) => (
            <button
              key={entry.name}
              type="button"
              className={index === active ? 'active' : ''}
              onClick={() => setActive(index)}
              aria-label={`Show review ${index + 1}`}
            />
          ))}
        </div>
        <small className="review-note">Customer feedback from our cafe regulars.</small>
      </div>
    </ScrollSection>
  )
}

function DeliveryInfo() {
  return (
    <ScrollSection className="delivery-banner section-wrap">
      <div className="delivery-banner-icon" aria-hidden="true">🛵</div>
      <div>
        <span className="eyebrow">FAST &amp; WARM DELIVERY</span>
        <h2>Home delivery <em>FREE up to 2 km</em></h2>
        <p>Enjoy free doorstep delivery within 2 km of Knowledge Park 3, Greater Noida. Swiggy and Zomato delivery available.</p>
      </div>
      <div className="delivery-partners">
        <span>Order on partners</span>
        <div>
          <a href={CONFIG.swiggyUrl} target="_blank" rel="noreferrer" aria-label="Order on Swiggy (opens in new tab)">Swiggy ↗</a>
          <a href={CONFIG.zomatoUrl} target="_blank" rel="noreferrer" aria-label="Order on Zomato (opens in new tab)">Zomato ↗</a>
        </div>
      </div>
    </ScrollSection>
  )
}

function Contact() {
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(CONFIG.address)}&output=embed`
  return (
    <ScrollSection className="section contact-section section-wrap" id="contact">
      <div className="contact-content">
        <SectionTitle eyebrow="COME SAY HELLO">Your table is <em>waiting</em></SectionTitle>
        <div className="contact-details">
          <div>
            <span className="contact-icon" aria-hidden="true">📍</span>
            <div>
              <b>Find us</b>
              <p>{CONFIG.address}</p>
            </div>
          </div>
          <div>
            <span className="contact-icon" aria-hidden="true">📞</span>
            <div>
              <b>Give us a ring</b>
              <p><a href={`tel:${CONFIG.phoneDisplay}`}>{CONFIG.phoneDisplay}</a></p>
            </div>
          </div>
          <div>
            <span className="contact-icon" aria-hidden="true">🕒</span>
            <div>
              <b>Timings</b>
              <p>{CONFIG.timings}</p>
            </div>
          </div>
        </div>
        <a className="button button--primary" href={`tel:${CONFIG.phoneDisplay}`}>
          Call Cafe: {CONFIG.phoneDisplay} <span>↗</span>
        </a>
      </div>
      <div className="map-frame">
        <iframe
          title={`Map showing location of ${CONFIG.name}`}
          src={mapUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </ScrollSection>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Signature />
      <TawaMoment />
      <MenuSection />
      <Story />
      <Gallery />
      <Reviews />
      <DeliveryInfo />
      <Contact />
    </>
  )
}
