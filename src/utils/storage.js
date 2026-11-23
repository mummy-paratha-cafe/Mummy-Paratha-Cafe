const safeStorage = {
  getItem(key) {
    try {
      const value = localStorage.getItem(key)
      return value ? JSON.parse(value) : null
    } catch {
      localStorage.removeItem(key)
      return null
    }
  },
  setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      throw new Error('Your browser could not save this information. Please check available storage.')
    }
  },
  removeItem(key) {
    localStorage.removeItem(key)
  },
}

export function saveOrder(order) {
  const existing = safeStorage.getItem('orders')
  const orders = Array.isArray(existing) ? existing : []
  safeStorage.setItem('orders', [...orders, order])
  safeStorage.setItem('lastOrder', order)
}

export function getLastOrder() {
  const order = safeStorage.getItem('lastOrder')
  const validItems =
    Array.isArray(order?.items) &&
    order.items.every(
      (item) =>
        item &&
        typeof item.id === 'string' &&
        typeof item.name === 'string' &&
        Number.isFinite(item.price) &&
        Number.isInteger(item.quantity),
    )

  return order &&
    typeof order === 'object' &&
    typeof order.id === 'string' &&
    typeof order.timestamp === 'string' &&
    typeof order.name === 'string' &&
    typeof order.phone === 'string' &&
    (order.orderType === 'Delivery' || order.orderType === 'Pickup') &&
    Number.isFinite(order.total) &&
    validItems
    ? order
    : null
}

export { safeStorage }
