<!-- ============================================ -->
<!-- DEFAULT LAYOUT — Layout principal de la app -->
<!-- Se usa en todas las páginas excepto login    -->
<!-- y register. Incluye Navbar y Footer.         -->
<!-- Responsable: Ana Paula Garzón                -->
<!-- ============================================ -->

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    
    <!-- Barra de navegación superior -->
    <Navbar />
    
    <!-- Contenido principal — aquí se renderizan las páginas -->
    <!-- router-view es el "hueco" donde Vue inserta la página actual -->
    <main class="flex-1 container mx-auto px-4 py-8">
      <router-view />
    </main>

    <!-- Pie de página -->
    <footer class="bg-gray-900 text-white text-center py-6 mt-auto">
      <p>© 2026 Smart Solutions — Tecnología para tu hogar</p>
    </footer>

  </div>
</template>

<script setup>
// Importamos el Navbar para usarlo en este layout
import Navbar from '../components/Navbar.vue'
</script>