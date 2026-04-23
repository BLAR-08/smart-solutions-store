// ============================================
// CART STORE — Gestión del estado del carrito
// Responsable: Ana Paula Garzón
// ============================================

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {

  // --- ESTADO ---
  const items = ref([]) // Lista de productos en el carrito

  // --- COMPUTED ---

  // Suma total de unidades en el carrito (para el contador del Navbar)
  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  // Suma total del precio de todos los productos
  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0)
  )

  // --- FUNCIONES ---

  // Agregar producto al carrito
  // Si el producto ya existe, aumenta su cantidad en 1
  // Si es nuevo, lo agrega con quantity: 1
  function addItem(product) {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
  }

  // Eliminar producto del carrito por su id
  function removeItem(productId) {
    items.value = items.value.filter(i => i.id !== productId)
  }

  // Modificar la cantidad de un producto
  // Si la cantidad llega a 0 o menos, elimina el producto
  function updateQuantity(productId, quantity) {
    const item = items.value.find(i => i.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeItem(productId)
      } else {
        item.quantity = quantity
      }
    }
  }

  // Vaciar el carrito completamente
  function clearCart() {
    items.value = []
  }

  // Exponemos todo lo que otros componentes necesitan
  return {
    items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  }
})