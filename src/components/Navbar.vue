<!-- ============================================ -->
<!-- NAVBAR — Barra de navegación principal      -->
<!-- Muestra links de navegación y contador      -->
<!-- del carrito. Cambia según si hay sesión.    -->
<!-- Responsable: Ana Paula Garzón               -->
<!-- ============================================ -->

<template>
  <nav class="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
    
    <!-- Logo / nombre de la tienda — lleva al inicio -->
    <router-link to="/" class="text-2xl font-bold text-blue-400">
      Smart Solutions
    </router-link>

    <div class="flex gap-6 items-center">
      
      <!-- Links de navegación principales -->
      <router-link to="/" class="hover:text-blue-400 transition">Inicio</router-link>
      <router-link to="/products" class="hover:text-blue-400 transition">Productos</router-link>

      <!-- Ícono del carrito con contador de productos -->
      <router-link to="/cart" class="relative hover:text-blue-400 transition">
        🛒 Carrito
        <!-- El contador solo aparece si hay productos en el carrito -->
        <span
          v-if="cartStore.totalItems > 0"
          class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {{ cartStore.totalItems }}
        </span>
      </router-link>

      <!-- Si el usuario está logueado muestra Perfil y Salir -->
      <template v-if="userStore.isLoggedIn">
        <router-link to="/profile" class="hover:text-blue-400 transition">Mi Perfil</router-link>
        <button @click="handleLogout" class="hover:text-red-400 transition">Salir</button>
      </template>

      <!-- Si no está logueado muestra Ingresar y Registrarse -->
      <template v-else>
        <router-link to="/login" class="hover:text-blue-400 transition">Ingresar</router-link>
        <router-link to="/register" class="bg-blue-500 px-5 py-2 rounded-lg hover:bg-blue-600 transition">
          Registrarse
        </router-link>
      </template>

    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import { useCartStore } from '../stores/cartStore'

const router = useRouter()
const userStore = useUserStore()   // Para verificar si hay sesión activa
const cartStore = useCartStore()   // Para mostrar el contador del carrito

// Cierra la sesión y redirige al login
const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}
</script>