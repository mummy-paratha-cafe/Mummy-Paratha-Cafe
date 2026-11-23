import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { safeStorage } from '../utils/storage'

const validItems = (items) =>
  Array.isArray(items)
    ? items
        .filter((item) => item && typeof item === 'object' && typeof item.id === 'string' && typeof item.name === 'string')
        .map((item) => ({
          ...item,
          price: Number.isFinite(item.price) && item.price >= 0 ? Number(item.price) : 0,
          quantity: Math.min(20, Math.max(1, Number.isInteger(item.quantity) ? item.quantity : 1)),
        }))
    : []

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      add: (product, quantity = 1) =>
        set((state) => {
          const qtyToAdd = Math.min(20, Math.max(1, Number.isInteger(quantity) ? quantity : 1))
          const current = state.items.find((item) => item.id === product.id)
          if (current) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: Math.min(20, item.quantity + qtyToAdd) }
                  : item,
              ),
            }
          }
          return {
            items: [
              ...state.items,
              {
                ...product,
                price: Number.isFinite(product.price) && product.price >= 0 ? Number(product.price) : 0,
                quantity: qtyToAdd,
              },
            ],
          }
        }),
      remove: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      increase: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.min(20, item.quantity + 1) } : item,
          ),
        })),
      decrease: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item,
          ),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: 'mummy-paratha-cart',
      storage: safeStorage,
      partialize: (state) => ({ items: state.items }),
      merge: (persisted, current) => ({
        ...current,
        items: validItems(persisted?.items),
      }),
    },
  ),
)
