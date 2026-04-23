<!-- ============================================ -->
<!-- ORDER CARD — Tarjeta que muestra un pedido  -->
<!-- Se usa en la página "Mis Pedidos".           -->
<!-- Muestra id, fecha, total y lista de items.   -->
<!-- Responsable: Jason Rodríguez                 -->
<!-- ============================================ -->

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-5">

    <!-- Encabezado con id, fecha y estado -->
    <div class="flex flex-wrap justify-between items-start gap-2 border-b border-gray-100 pb-3 mb-3">
      <div>
        <p class="font-semibold text-gray-800">Pedido {{ order.id }}</p>
        <p class="text-sm text-gray-500">{{ fechaFormateada }}</p>
      </div>

      <!-- Etiqueta del estado — verde si está confirmado -->
      <span class="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
        {{ order.estado }}
      </span>
    </div>

    <!-- Lista resumida de productos del pedido -->
    <ul class="space-y-1 mb-3">
      <li
        v-for="item in order.items"
        :key="item.id"
        class="flex justify-between text-sm text-gray-700">
        <span>{{ item.name }} × {{ item.quantity }}</span>
        <span>S/ {{ (item.price * item.quantity).toFixed(2) }}</span>
      </li>
    </ul>

    <!-- Pie con método de pago y total -->
    <div class="flex justify-between items-center border-t border-gray-100 pt-3">
      <p class="text-sm text-gray-500">
        Pago: <span class="font-medium">{{ order.metodoPago }}</span>
      </p>
      <p class="font-bold text-gray-800">Total: S/ {{ order.total.toFixed(2) }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  order: { type: Object, required: true }
})

// Convierte la fecha ISO a un formato legible en español
const fechaFormateada = computed(() => {
  const d = new Date(props.order.fecha)
  return d.toLocaleDateString('es-PE', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
})
</script>
