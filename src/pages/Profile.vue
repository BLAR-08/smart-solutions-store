<!-- ============================================ -->
<!-- PROFILE — Página de perfil del usuario      -->
<!-- Muestra datos de la sesión y accesos rápidos -->
<!-- a los pedidos y al cierre de sesión.         -->
<!-- Responsable: Jason Rodríguez                 -->
<!-- ============================================ -->

<template>
  <div class="max-w-3xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Mi perfil</h1>

    <!-- Tarjeta principal con los datos del usuario -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">

      <!-- Avatar con la inicial del nombre o email -->
      <div class="flex items-center gap-4 mb-4">
        <div class="w-16 h-16 bg-blue-500 text-white text-2xl font-bold rounded-full flex items-center justify-center">
          {{ inicial }}
        </div>
        <div>
          <h2 class="text-xl font-semibold text-gray-800">
            {{ userStore.user?.name || 'Usuario' }}
          </h2>
          <p class="text-gray-500">{{ userStore.user?.email }}</p>
        </div>
      </div>

      <!-- Detalles adicionales del usuario -->
      <div class="border-t border-gray-100 pt-4 space-y-2 text-sm text-gray-600">
        <p><strong>Correo:</strong> {{ userStore.user?.email || 'No disponible' }}</p>
        <p><strong>Pedidos realizados:</strong> {{ orderStore.totalOrders }}</p>
      </div>
    </div>

    <!-- Tarjetas de accesos rápidos — pedidos y cerrar sesión -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

      <!-- Acceso a Mis pedidos -->
      <router-link
        to="/orders"
        class="bg-white rounded-lg shadow-sm border border-gray-100 p-5 hover:shadow-md transition block">
        <p class="text-3xl mb-2">📦</p>
        <h3 class="font-semibold text-gray-800">Mis pedidos</h3>
        <p class="text-sm text-gray-500">Revisa el historial de tus compras.</p>
      </router-link>

      <!-- Cerrar sesión -->
      <button
        @click="cerrarSesion"
        class="bg-white rounded-lg shadow-sm border border-gray-100 p-5 hover:shadow-md transition text-left">
        <p class="text-3xl mb-2">🚪</p>
        <h3 class="font-semibold text-gray-800">Cerrar sesión</h3>
        <p class="text-sm text-gray-500">Sal de tu cuenta de forma segura.</p>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import { useOrderStore } from '../stores/orderStore'

const router = useRouter()
const userStore = useUserStore()
const orderStore = useOrderStore()

// Primera letra del nombre o del correo, en mayúscula — para el avatar
const inicial = computed(() => {
  const fuente = userStore.user?.name || userStore.user?.email || 'U'
  return fuente.charAt(0).toUpperCase()
})

// Cierra la sesión y vuelve al login
function cerrarSesion() {
  userStore.logout()
  router.push('/login')
}
</script>
