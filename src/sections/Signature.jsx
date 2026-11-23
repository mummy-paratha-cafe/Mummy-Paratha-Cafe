import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { menu } from '../data/menu'
import { useCartStore } from '../store/cartStore'
import { useUiStore } from '../store/uiStore'
import { formatPrice } from '../utils/format'
import { FoodVisual } from '../components/MenuCard'
import SectionTitle from '../components/SectionTitle'

const featuredItems = menu.filter((item) => item.isFeatured)

export default function Signature() {
  const add = useCartStore((state) => state.add)
  const openCart = useUiStore((state) => state.openCart)

  const quickAdd = (item) => {
    add(item)
    toast.success(`${item.name} added to your cart`)
    openCart()
  }

  return (
    <section className="section section-wrap signature-section" id="signature">
      <SectionTitle eyebrow="THE HOUSE FAVOURITES" description="A few feel-good favourites, made fresh and served with love.">Meet the <em>signatures</em></SectionTitle>
      <div className="signature-grid">
        {featuredItems.map((item, index) => (
          <motion.article className={`signature-card signature-card--${index + 1}`} key={item.id} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} whileHover={{ y: -7, rotate: index % 2 ? 0.5 : -0.5 }} transition={{ type: 'spring', stiffness: 220 }}>
            <FoodVisual item={item} large />
            <span className="signature-number">0{index + 1}</span>
            <div className="signature-card-info"><span>{item.category}</span><h3>{item.name}</h3><div><strong>{formatPrice(item.price)}</strong><button type="button" onClick={() => quickAdd(item)} aria-label={`Add ${item.name} to cart`}>+</button></div></div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
