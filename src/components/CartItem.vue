<!-- ============================================ -->
<!-- CART ITEM — Fila de un producto del carrito  -->
<!-- Muestra imagen, nombre, precio, cantidad      -->
<!-- editable y botón para eliminar.               -->
<!-- Responsable: Jason Rodríguez                  -->
<!-- ============================================ -->

<template>
  <div class="flex items-center gap-4 bg-white rounded-lg shadow-sm p-4 border border-gray-100">

    <!-- Imagen del producto — si no hay o falla al cargar, muestra un placeholder -->
    <img
      :src="item.image || 'https://placehold.co/100x100?text=Producto'"
      :alt="item.name"
      @error="onImgError"
      class="w-20 h-20 object-cover rounded"
    />

    <!-- Info principal del producto -->
    <div class="flex-1">
      <h3 class="font-semibold text-gray-800">{{ item.name }}</h3>
      <p class="text-sm text-gray-500">Precio unitario: S/ {{ item.price.toFixed(2) }}</p>
    </div>

    <!-- Controles de cantidad — +/- y número -->
    <div class="flex items-center gap-2">
      <button
        @click="cambiarCantidad(item.quantity - 1)"
        class="w-8 h-8 rounded border border-gray-300 hover:bg-gray-100">
        −
      </button>
      <span class="w-8 text-center font-medium">{{ item.quantity }}</span>
      <button
        @click="cambiarCantidad(item.quantity + 1)"
        class="w-8 h-8 rounded border border-gray-300 hover:bg-gray-100">
        +
      </button>
    </div>

    <!-- Subtotal de este producto (precio × cantidad) -->
    <div class="w-24 text-right font-semibold text-gray-800">
      S/ {{ (item.price * item.quantity).toFixed(2) }}
    </div>

    <!-- Botón de eliminar producto del carrito -->
    <button
      @click="cartStore.removeItem(item.id)"
      class="text-red-500 hover:text-red-700 text-sm">
      Eliminar
    </button>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cartStore'

// Recibimos el producto como prop desde Cart.vue
const props = defineProps({
  item: { type: Object, required: true }
})

const cartStore = useCartStore()

// Cambia la cantidad llamando al store — si es 0 o menos, lo elimina
function cambiarCantidad(nuevaCantidad) {
  cartStore.updateQuantity(props.item.id, nuevaCantidad)
}

// Si la imagen remota falla, muestra un placeholder en su lugar
function onImgError(e) {
  e.target.src = 'https://placehold.co/100x100?text=Producto'
}
</script>
