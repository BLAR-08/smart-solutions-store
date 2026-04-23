<!-- ============================================ -->
<!-- PRODUCT DETAIL — Detalle de un producto     -->
<!-- Muestra imagen grande, descripción, precio,  -->
<!-- selector de cantidad y botón agregar.        -->
<!-- Responsable: Mayerly Aranibar                -->
<!-- ============================================ -->

<template>
  <div>
    <!-- Producto no encontrado — cuando el id de la url no existe -->
    <div
      v-if="!producto"
      class="bg-white rounded-lg border border-gray-100 p-10 text-center">
      <p class="text-5xl mb-4">😕</p>
      <h2 class="text-xl font-semibold text-gray-800 mb-2">Producto no encontrado</h2>
      <p class="text-gray-500 mb-4">El producto que buscas no existe o fue retirado.</p>
      <router-link
        to="/products"
        class="inline-block bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition">
        Volver al catálogo
      </router-link>
    </div>

    <!-- Vista normal del producto -->
    <div v-else>

      <!-- Migas de pan para navegación rápida -->
      <nav class="text-sm text-gray-500 mb-4">
        <router-link to="/" class="hover:text-blue-500">Inicio</router-link>
        <span class="mx-1">/</span>
        <router-link to="/products" class="hover:text-blue-500">Productos</router-link>
        <span class="mx-1">/</span>
        <span class="text-gray-700">{{ producto.name }}</span>
      </nav>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

        <!-- Imagen grande del producto -->
        <div class="bg-white rounded-lg border border-gray-100 overflow-hidden">
          <img
            :src="producto.image"
            :alt="producto.name"
            @error="onImgError"
            class="w-full h-96 object-cover"
          />
        </div>

        <!-- Información principal del producto -->
        <div>
          <!-- Categoría como etiqueta -->
          <span class="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            {{ nombreCategoria }}
          </span>

          <h1 class="text-3xl font-bold text-gray-800 mb-3">{{ producto.name }}</h1>

          <!-- Precio destacado -->
          <p class="text-4xl font-bold text-blue-500 mb-4">
            S/ {{ producto.price.toFixed(2) }}
          </p>

          <!-- Stock disponible -->
          <p class="text-sm text-gray-500 mb-4">
            <span v-if="producto.stock > 0" class="text-green-600 font-medium">
              ✓ Disponible ({{ producto.stock }} en stock)
            </span>
            <span v-else class="text-red-500 font-medium">✗ Agotado</span>
          </p>

          <!-- Descripción del producto -->
          <div class="border-t border-gray-100 pt-4 mb-5">
            <h3 class="font-semibold text-gray-800 mb-2">Descripción</h3>
            <p class="text-gray-600 leading-relaxed">{{ producto.description }}</p>
          </div>

          <!-- Selector de cantidad y botón agregar -->
          <div class="flex items-center gap-3 mb-4">
            <label class="text-sm text-gray-600">Cantidad:</label>
            <div class="flex items-center border border-gray-300 rounded">
              <button
                @click="cantidad = Math.max(1, cantidad - 1)"
                class="px-3 py-1 hover:bg-gray-100">
                −
              </button>
              <span class="px-4 py-1 font-medium">{{ cantidad }}</span>
              <button
                @click="cantidad = Math.min(producto.stock, cantidad + 1)"
                class="px-3 py-1 hover:bg-gray-100">
                +
              </button>
            </div>
          </div>

          <!-- Mensaje de confirmación tras agregar -->
          <p v-if="mensaje" class="text-green-600 text-sm mb-3">{{ mensaje }}</p>

          <!-- Botones de acción principales -->
          <div class="flex gap-3">
            <button
              @click="agregarAlCarrito"
              :disabled="producto.stock === 0"
              class="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed">
              🛒 Agregar al carrito
            </button>
            <router-link
              to="/cart"
              class="bg-gray-800 text-white py-3 px-5 rounded-lg hover:bg-gray-900 transition font-medium">
              Ver carrito
            </router-link>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { products, categorias } from '../data/products'
import { useCartStore } from '../stores/cartStore'

const route = useRoute()
const cartStore = useCartStore()

// Busca el producto según el id de la url (/product/:id)
const producto = computed(() =>
  products.find(p => p.id === Number(route.params.id))
)

// Nombre legible de la categoría — usa "Otra" si no la encuentra
const nombreCategoria = computed(() => {
  const cat = categorias.find(c => c.id === producto.value?.category)
  return cat ? cat.nombre : 'Otra'
})

const cantidad = ref(1)     // cantidad a agregar al carrito
const mensaje = ref('')     // feedback al agregar

// Agrega la cantidad elegida al carrito y muestra un mensaje breve
function agregarAlCarrito() {
  for (let i = 0; i < cantidad.value; i++) {
    cartStore.addItem(producto.value)
  }
  mensaje.value = `✓ ${cantidad.value} producto(s) agregado(s) al carrito`
  // El mensaje desaparece a los 2 segundos para no ensuciar la vista
  setTimeout(() => { mensaje.value = '' }, 2000)
}

// Si la imagen remota falla, muestra un placeholder en su lugar
function onImgError(e) {
  e.target.src = 'https://placehold.co/600x400?text=Sin+imagen'
}
</script>
