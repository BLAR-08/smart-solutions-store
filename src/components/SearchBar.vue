<!-- ============================================ -->
<!-- SEARCH BAR — Campo de búsqueda de productos -->
<!-- Emite lo que escribe el usuario al padre     -->
<!-- usando v-model.                              -->
<!-- Responsable: Mayerly Aranibar                -->
<!-- ============================================ -->

<template>
  <div class="relative">
    <!-- Ícono de lupa posicionado dentro del input -->
    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>

    <!-- Input conectado al v-model del padre -->
    <input
      v-model="texto"
      type="text"
      :placeholder="placeholder"
      class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
    />
  </div>
</template>

<script setup>
// defineModel permite que el padre use v-model sobre este componente
const texto = defineModel({ default: '' })

defineProps({
  placeholder: { type: String, default: 'Buscar productos...' }
})
</script>
