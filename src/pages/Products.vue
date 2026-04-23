<!-- ============================================ -->
<!-- PRODUCTS — Catálogo completo de productos   -->
<!-- Incluye búsqueda por texto, filtro por       -->
<!-- categoría y ordenamiento por precio/nombre.  -->
<!-- Responsable: Mayerly Aranibar                -->
<!-- ============================================ -->

<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Catálogo de productos</h1>

    <!-- Controles de búsqueda, orden y filtro -->
    <div class="bg-white rounded-lg border border-gray-100 p-4 mb-6 space-y-4">

      <!-- Fila superior — buscar y ordenar -->
      <div class="flex flex-col md:flex-row gap-3">
        <div class="flex-1">
          <SearchBar v-model="busqueda" placeholder="Buscar por nombre o descripción..." />
        </div>

        <!-- Select de ordenamiento -->
        <select
          v-model="orden"
          class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400">
          <option value="default">Ordenar por...</option>
          <option value="precio-asc">Precio: menor a mayor</option>
          <option value="precio-desc">Precio: mayor a menor</option>
          <option value="nombre">Nombre (A-Z)</option>
        </select>
      </div>

      <!-- Chips de categorías -->
      <CategoryFilter v-model="categoriaSeleccionada" :categorias="categorias" />
    </div>

    <!-- Resultado de productos -->
    <div v-if="productosFiltrados.length === 0" class="bg-white rounded-lg border border-gray-100 p-10 text-center">
      <p class="text-5xl mb-4">🔍</p>
      <p class="text-gray-600">No se encontraron productos con esos filtros.</p>
    </div>

    <!-- Grid de productos -->
    <div v-else>
      <p class="text-sm text-gray-500 mb-3">
        Mostrando {{ productosFiltrados.length }} producto(s)
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <ProductCard
          v-for="producto in productosFiltrados"
          :key="producto.id"
          :product="producto"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { products, categorias } from '../data/products'
import ProductCard from '../components/ProductCard.vue'
import SearchBar from '../components/SearchBar.vue'
import CategoryFilter from '../components/CategoryFilter.vue'

const route = useRoute()

// --- Estado de los filtros ---
const busqueda = ref('')                   // texto escrito en el buscador
const categoriaSeleccionada = ref('todos') // chip de categoría activo
const orden = ref('default')               // criterio de ordenamiento

// Si llega con ?cat=xxx desde la home, pre-selecciona esa categoría
onMounted(() => {
  if (route.query.cat) {
    categoriaSeleccionada.value = route.query.cat
  }
})

// Aplica filtros y ordenamiento sobre el listado de productos
const productosFiltrados = computed(() => {
  let resultado = [...products]

  // Filtro por categoría — si es "todos" no filtra nada
  if (categoriaSeleccionada.value !== 'todos') {
    resultado = resultado.filter(p => p.category === categoriaSeleccionada.value)
  }

  // Filtro por búsqueda — revisa nombre y descripción, sin distinguir mayúsculas
  if (busqueda.value.trim()) {
    const texto = busqueda.value.toLowerCase().trim()
    resultado = resultado.filter(p =>
      p.name.toLowerCase().includes(texto) ||
      p.description.toLowerCase().includes(texto)
    )
  }

  // Ordenamiento según el select
  if (orden.value === 'precio-asc') {
    resultado.sort((a, b) => a.price - b.price)
  } else if (orden.value === 'precio-desc') {
    resultado.sort((a, b) => b.price - a.price)
  } else if (orden.value === 'nombre') {
    resultado.sort((a, b) => a.name.localeCompare(b.name))
  }

  return resultado
})
</script>
