<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />
    
    <main class="flex-1 container mx-auto px-4 py-8">
      <router-view />
    </main>

    <footer class="bg-gray-900 text-white text-center py-6 mt-auto">
      <p>© 2026 Smart Solutions — Tecnología para tu hogar</p>
    </footer>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
</script>