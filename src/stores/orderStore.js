// ============================================
// ORDER STORE — Historial de pedidos del usuario
// Guarda los pedidos realizados y los mantiene
// entre sesiones usando localStorage.
// Responsable: Jason Rodríguez
// ============================================

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useOrderStore = defineStore('order', () => {
  // --- Estado ---
  // Cargamos los pedidos guardados en localStorage al iniciar
  const orders = ref(JSON.parse(localStorage.getItem('orders') || '[]'))

  // Total de pedidos realizados — útil para mostrar en el perfil
  const totalOrders = computed(() => orders.value.length)

  // --- Acciones ---

  // Guarda un nuevo pedido en el historial
  // orderData incluye: items, total, dirección, método de pago, etc.
  function addOrder(orderData) {
    const newOrder = {
      id: 'ORD-' + Date.now(),                  // id simple basado en la fecha
      fecha: new Date().toISOString(),          // fecha del pedido
      estado: 'Confirmado',                     // estado inicial
      ...orderData
    }
    orders.value.unshift(newOrder)              // agrega al inicio (más reciente primero)
    persistir()
    return newOrder
  }

  // Devuelve un pedido por su id — usado para ver el detalle
  function getOrderById(id) {
    return orders.value.find(o => o.id === id)
  }

  // Guarda el arreglo de pedidos en localStorage
  function persistir() {
    localStorage.setItem('orders', JSON.stringify(orders.value))
  }

  return { orders, totalOrders, addOrder, getOrderById }
})
