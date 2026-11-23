export default function QuantityStepper({ value, onDecrease, onIncrease, label = 'Quantity' }) {
  return (
    <div className="quantity-stepper" aria-label={label}>
      <button type="button" onClick={onDecrease} aria-label="Decrease quantity">−</button>
      <span aria-live="polite">{value}</span>
      <button type="button" onClick={onIncrease} aria-label="Increase quantity" disabled={value >= 20}>+</button>
    </div>
  )
}
