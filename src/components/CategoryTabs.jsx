export default function CategoryTabs({ categories, activeCategory, onSelect }) {
  return (
    <div className="category-tabs" role="tablist" aria-label="Menu categories">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          role="tab"
          aria-selected={activeCategory === category}
          className={activeCategory === category ? 'active' : ''}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
