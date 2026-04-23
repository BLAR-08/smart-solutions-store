<!-- ============================================ -->
<!-- HOME — Página de inicio de Smart Solutions  -->
<!-- Banner principal, categorías destacadas y    -->
<!-- productos recomendados.                      -->
<!-- Responsable: Mayerly Aranibar                -->
<!-- ============================================ -->

<template>
  <div class="space-y-12">

    <!-- ================================ -->
    <!-- BANNER PRINCIPAL                 -->
    <!-- ================================ -->
    <section class="bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-xl p-10 md:p-16 shadow-md">
      <div class="max-w-2xl">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">
          Tecnología inteligente para tu hogar
        </h1>
        <p class="text-lg md:text-xl text-blue-50 mb-6">
          Seguridad, ahorro energético y comodidad en un solo lugar.
          Descubre productos pensados para modernizar tu casa.
        </p>
        <router-link
          to="/products"
          class="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition">
          Explorar productos
        </router-link>
      </div>
    </section>

    <!-- ================================ -->
    <!-- CATEGORÍAS DESTACADAS            -->
    <!-- ================================ -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Categorías</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        <!-- Saltamos "todos" porque no es una categoría real -->
        <router-link
          v-for="cat in categoriasDestacadas"
          :key="cat.id"
          :to="`/products?cat=${cat.id}`"
          class="bg-white rounded-lg border border-gray-100 p-5 text-center hover:shadow-md transition">
          <p class="text-4xl mb-2">{{ cat.icono }}</p>
          <p class="font-medium text-gray-700">{{ cat.nombre }}</p>
        </router-link>
      </div>
    </section>

    <!-- ================================ -->
    <!-- PRODUCTOS DESTACADOS             -->
    <!-- ================================ -->
    <section>
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold text-gray-800">Productos destacados</h2>
        <router-link to="/products" class="text-blue-500 hover:underline text-sm">
          Ver todos →
        </router-link>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <ProductCard
          v-for="producto in destacados"
          :key="producto.id"
          :product="producto"
        />
      </div>
    </section>

    <!-- ================================ -->
    <!-- INFO — ¿POR QUÉ SMART SOLUTIONS? -->
    <!-- ================================ -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div class="bg-white rounded-lg border border-gray-100 p-6 text-center">
        <p class="text-4xl mb-2">🚚</p>
        <h3 class="font-semibold text-gray-800 mb-1">Envío gratis</h3>
        <p class="text-sm text-gray-500">En todas tus compras dentro de la ciudad.</p>
      </div>
      <div class="bg-white rounded-lg border border-gray-100 p-6 text-center">
        <p class="text-4xl mb-2">🛡️</p>
        <h3 class="font-semibold text-gray-800 mb-1">Garantía real</h3>
        <p class="text-sm text-gray-500">12 meses de garantía en todos los productos.</p>
      </div>
      <div class="bg-white rounded-lg border border-gray-100 p-6 text-center">
        <p class="text-4xl mb-2">💬</p>
        <h3 class="font-semibold text-gray-800 mb-1">Soporte 24/7</h3>
        <p class="text-sm text-gray-500">Te ayudamos a configurar tus dispositivos.</p>
      </div>
    </section>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { products, categorias } from '../data/products'
import ProductCard from '../components/ProductCard.vue'

// Solo los productos marcados como "featured" aparecen en la home
const destacados = computed(() => products.filter(p => p.featured).slice(0, 4))

// Quitamos la opción "todos" del listado de categorías destacadas
const categoriasDestacadas = computed(() => categorias.filter(c => c.id !== 'todos'))
</script>
