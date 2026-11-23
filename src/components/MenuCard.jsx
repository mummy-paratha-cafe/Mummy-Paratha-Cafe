import { useState } from 'react'
import toast from 'react-hot-toast'
import { useCartStore } from '../store/cartStore'
import { useUiStore } from '../store/uiStore'
import { formatPrice } from '../utils/format'
import QuantityStepper from './QuantityStepper'

const categoryIcons = {
  Paratha: '🫓',
  Thali: '🍛',
  Chicken: '🍗',
  'Tea & Coffee': '☕',
  'Cold Coffee': '🥤',
  'Mocktails & Shakes': '🍹',
  Burger: '🍔',
  Sandwich: '🥪',
  Maggi: '🍜',
  Noodles: '🥢',
  'Fried Rice': '🍚',
  Chinese: '🥡',
  Pasta: '🍝',
  Fries: '🍟',
  'Rice & Dal': '🍲',
}

export function FoodVisual({ item, large = false }) {
  const [hasError, setHasError] = useState(false)
  const showPlaceholder = !item.image || hasError

  return !showPlaceholder ? (
    <img
      className={`food-visual${large ? ' food-visual--large' : ''}`}
      src={item.image}
      alt={item.name}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  ) : (
    <div
      className={`food-placeholder${large ? ' food-placeholder--large' : ''}`}
      aria-label={`${item.name} image placeholder`}
      role="img"
    >
      <span aria-hidden="true">{categoryIcons[item.category] || '🍽️'}</span>
      <small>{item.category}</small>
    </div>
  )
}

export default function MenuCard({ item, featured = false }) {
  const cartQuantity = useCartStore((state) => state.items.find((cartItem) => cartItem.id === item.id)?.quantity ?? 0)
  const add = useCartStore((state) => state.add)
  const increase = useCartStore((state) => state.increase)
  const decrease = useCartStore((state) => state.decrease)
  const remove = useCartStore((state) => state.remove)
  const openCart = useUiStore((state) => state.openCart)

  const addItem = () => {
    add(item)
    toast.success(`${item.name} added to your cart`)
    openCart()
  }

  const decreaseItem = () => {
    if (cartQuantity === 1) {
      remove(item.id)
      return
    }
    decrease(item.id)
  }

  return (
    <article className={`menu-card${featured ? ' menu-card--featured' : ''}`}>
      <div className="menu-card-visual">
        <FoodVisual item={item} large={featured} />
        <span
          className={item.isVeg ? 'veg-mark' : 'nonveg-mark'}
          aria-label={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
          title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
        >
          <i />
        </span>
        {item.isFeatured && <span className="signature-tag">Signature</span>}
      </div>
      <div className="menu-card-content">
        <div className="menu-card-heading">
          <h3>{item.name}</h3>
          <strong>{formatPrice(item.price)}</strong>
        </div>
        {item.description && <p className="menu-description">{item.description}</p>}
        <div className={`menu-card-actions${cartQuantity ? ' menu-card-actions--in-cart' : ''}`}>
          {cartQuantity ? (
            <>
              <span className="menu-cart-status" role="status" aria-label={`${item.name}: ${cartQuantity} in cart`}>
                <i aria-hidden="true" /> In cart
              </span>
              <QuantityStepper
                value={cartQuantity}
                onDecrease={decreaseItem}
                onIncrease={() => increase(item.id)}
                label={`${item.name} cart quantity`}
              />
            </>
          ) : (
            <button
              className="button button--small button--outline"
              type="button"
              onClick={addItem}
              aria-label={`Add ${item.name} to cart`}
            >
              Add to cart <span aria-hidden="true">+</span>
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
