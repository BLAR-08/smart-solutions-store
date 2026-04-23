<!-- ============================================ -->
<!-- MY ORDERS — Lista de pedidos del usuario    -->
<!-- Muestra todos los pedidos confirmados        -->
<!-- usando el componente OrderCard.              -->
<!-- Responsable: Jason Rodríguez                 -->
<!-- ============================================ -->

<template>
  <div class="max-w-4xl mx-auto">

    <!-- Encabezado con título y link de regreso al perfil -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-800">Mis pedidos</h1>
      <router-link to="/profile" class="text-blue-500 hover:underline text-sm">
        ← Volver al perfil
      </router-link>
    </div>

    <!-- Estado vacío — cuando el usuario no ha comprado nada todavía -->
    <div
      v-if="orderStore.orders.length === 0"
      class="bg-white rounded-lg shadow-sm p-10 text-center border border-gray-100">
      <p class="text-5xl mb-4">📦</p>
      <p class="text-gray-600 mb-4">Aún no tienes pedidos realizados.</p>
      <router-link
        to="/products"
        class="inline-block bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition">
        Explorar productos
      </router-link>
    </div>

    <!-- Lista de tarjetas de pedidos — se renderiza OrderCard por cada uno -->
    <div v-else class="space-y-4">
      <OrderCard
        v-for="order in orderStore.orders"
        :key="order.id"
        :order="order"
      />
    </div>
  </div>
</template>

<script setup>
import { useOrderStore } from '../stores/orderStore'
import OrderCard from '../components/OrderCard.vue'

const orderStore = useOrderStore()
</script>
