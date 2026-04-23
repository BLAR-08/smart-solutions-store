<!-- ============================================ -->
<!-- CATEGORY FILTER — Filtro por categoría      -->
<!-- Muestra botones tipo "chip" para filtrar     -->
<!-- la lista de productos por categoría.         -->
<!-- Responsable: Mayerly Aranibar                -->
<!-- ============================================ -->

<template>
  <div class="flex flex-wrap gap-2">
    <!-- Cada categoría es un botón tipo chip -->
    <!-- Se resalta el botón de la categoría seleccionada -->
    <button
      v-for="cat in categorias"
      :key="cat.id"
      @click="seleccion = cat.id"
      :class="[
        'px-4 py-2 rounded-full text-sm border transition flex items-center gap-2',
        seleccion === cat.id
          ? 'bg-blue-500 text-white border-blue-500'
          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
      ]">
      <span>{{ cat.icono }}</span>
      <span>{{ cat.nombre }}</span>
    </button>
  </div>
</template>

<script setup>
// Recibe la categoría seleccionada del padre vía v-model
const seleccion = defineModel({ default: 'todos' })

defineProps({
  categorias: { type: Array, required: true }
})
</script>
