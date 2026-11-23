import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { categories, menu } from '../data/menu'
import CategoryTabs from '../components/CategoryTabs'
import MenuCard from '../components/MenuCard'
import SectionTitle from '../components/SectionTitle'

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('Paratha')
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()
  const filtered = useMemo(() => {
    if (!normalizedQuery) return menu.filter((item) => item.category === activeCategory)
    const compactQuery = normalizedQuery.replace(/[^a-z0-9]+/g, '')
    const variants = compactQuery === 'briyani' || compactQuery === 'biriyani'
      ? [compactQuery, 'biryani']
      : [compactQuery]
    const terms = normalizedQuery.split(/[\s-&]+/).filter(Boolean)
    return menu.filter((item) => {
      const searchable = `${item.name} ${item.category} ${item.description}`.toLowerCase()
        .replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim()
      const normalizedItem = searchable.replace(/\s+/g, '')
      return variants.some((variant) => normalizedItem.includes(variant))
        || terms.every((term) => searchable.includes(term))
    })
  }, [activeCategory, normalizedQuery])

  return (
    <section className="section menu-section" id="menu">
      <div className="section-wrap">
        <SectionTitle eyebrow="MADE FRESH, JUST FOR YOU" description="Find your new favourite, or come back to the one you love.">A menu full of <em>comfort</em></SectionTitle>
        <div className="menu-toolbar">
          <CategoryTabs categories={categories} activeCategory={activeCategory} onSelect={(category) => { setQuery(''); setActiveCategory(category) }} />
          <label className="menu-search">
            <span aria-hidden="true">⌕</span>
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search all dishes" aria-label="Search the complete menu" />
            {query && <button type="button" className="menu-search-clear" onClick={() => setQuery('')} aria-label="Clear menu search">×</button>}
          </label>
        </div>
        {normalizedQuery && <p className="menu-search-status" role="status" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'dish' : 'dishes'} found</p>}
        <motion.div className="menu-grid" layout>
          {filtered.map((item) => <motion.div key={item.id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><MenuCard item={item} /></motion.div>)}
        </motion.div>
        {!filtered.length && <p className="no-results">{normalizedQuery ? `No dishes found for "${query.trim()}". Try another name or dish.` : `No dishes found in ${activeCategory}.`}</p>}
        <p className="menu-footnote"><span className="veg-mark"><i /></span> Vegetarian and non-vegetarian dishes available.</p>
      </div>
    </section>
  )
}
