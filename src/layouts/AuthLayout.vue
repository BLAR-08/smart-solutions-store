<!-- ============================================ -->
<!-- AUTH LAYOUT — Layout para páginas de auth   -->
<!-- Se usa en Login y Register.                 -->
<!-- Muestra una caja centrada sin Navbar.       -->
<!-- Responsable: Ana Paula Garzón               -->
<!-- ============================================ -->

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
    
    <!-- Caja blanca centrada que contiene el formulario -->
    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      
      <!-- Encabezado con el nombre de la tienda -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Smart Solutions</h1>
        <p class="text-gray-500 mt-1">Tecnología inteligente para tu hogar</p>
      </div>

      <!-- Aquí se renderiza Login.vue o Register.vue según la ruta -->
      <router-view />

    </div>
  </div>
</template>

<script setup>
// Este layout no necesita importar nada adicional
// router-view se encarga de mostrar el componente correcto
</script>