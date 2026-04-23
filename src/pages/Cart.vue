<!-- ============================================ -->
<!-- CART — Página del carrito de compras        -->
<!-- Lista productos, permite cambiar cantidades, -->
<!-- eliminarlos y muestra totales. Lleva a       -->
<!-- checkout si el carrito no está vacío.        -->
<!-- Responsable: Jason Rodríguez                 -->
<!-- ============================================ -->

<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Mi carrito</h1>

    <!-- Estado vacío — cuando no hay productos en el carrito -->
    <div
      v-if="cartStore.items.length === 0"
      class="bg-white rounded-lg shadow-sm p-10 text-center border border-gray-100">
      <p class="text-5xl mb-4">🛒</p>
      <p class="text-gray-600 mb-4">Tu carrito está vacío.</p>
      <router-link
        to="/products"
        class="inline-block bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition">
        Ver productos
      </router-link>
    </div>

    <!-- Vista con productos — se divide en lista (izq) y resumen (der) -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <!-- Lista de productos en el carrito -->
      <div class="lg:col-span-2 space-y-3">
        <CartItem
          v-for="item in cartStore.items"
          :key="item.id"
          :item="item"
        />

        <!-- Botón para vaciar todo el carrito -->
        <button
          @click="cartStore.clearCart()"
          class="text-sm text-gray-500 hover:text-red-500 underline mt-2">
          Vaciar carrito
        </button>
      </div>

      <!-- Resumen de la compra a la derecha -->
      <div class="bg-white rounded-lg shadow-sm p-6 h-fit border border-gray-100">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Resumen</h2>

        <div class="space-y-2 text-gray-600 border-b border-gray-100 pb-3 mb-3">
          <div class="flex justify-between">
            <span>Productos</span>
            <span>{{ cartStore.totalItems }}</span>
          </div>
          <div class="flex justify-between">
            <span>Subtotal</span>
            <span>S/ {{ cartStore.totalPrice.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span>Envío</span>
            <span>Gratis</span>
          </div>
        </div>

        <!-- Total final de la compra -->
        <div class="flex justify-between font-bold text-lg text-gray-800 mb-4">
          <span>Total</span>
          <span>S/ {{ cartStore.totalPrice.toFixed(2) }}</span>
        </div>

        <!-- Botón para ir al checkout — si no hay sesión, el router redirige a login -->
        <button
          @click="irAlCheckout"
          class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
          Proceder al pago
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore'
import CartItem from '../components/CartItem.vue'

const router = useRouter()
const cartStore = useCartStore()

// Navega al checkout — la ruta está protegida, si no hay sesión manda a login
function irAlCheckout() {
  router.push('/checkout')
}
</script>
