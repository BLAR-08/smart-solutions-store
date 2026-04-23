<!-- ============================================ -->
<!-- PRODUCT CARD — Tarjeta de un producto       -->
<!-- Se usa en Home y en la página de Productos. -->
<!-- Muestra imagen, nombre, precio y botones.    -->
<!-- Responsable: Mayerly Aranibar                -->
<!-- ============================================ -->

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition flex flex-col">

    <!-- Imagen del producto — al hacer click lleva al detalle -->
    <router-link :to="`/product/${product.id}`" class="block">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
      />
    </router-link>

    <!-- Contenido de la tarjeta — crece para alinear botones abajo -->
    <div class="p-4 flex-1 flex flex-col">

      <!-- Nombre del producto — link al detalle -->
      <router-link :to="`/product/${product.id}`" class="block mb-2">
        <h3 class="font-semibold text-gray-800 hover:text-blue-500 transition line-clamp-2">
          {{ product.name }}
        </h3>
      </router-link>

      <!-- Precio y stock disponible -->
      <div class="flex justify-between items-center mb-3">
        <p class="text-xl font-bold text-blue-500">S/ {{ product.price.toFixed(2) }}</p>
        <p class="text-xs text-gray-400">Stock: {{ product.stock }}</p>
      </div>

      <!-- Espaciador para empujar los botones al fondo -->
      <div class="flex-1"></div>

      <!-- Botón de agregar al carrito -->
      <button
        @click="agregarAlCarrito"
        class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition text-sm">
        Agregar al carrito
      </button>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cartStore'

const props = defineProps({
  product: { type: Object, required: true }
})

const cartStore = useCartStore()

// Agrega el producto al carrito y muestra feedback breve
function agregarAlCarrito() {
  cartStore.addItem(props.product)
}
</script>
