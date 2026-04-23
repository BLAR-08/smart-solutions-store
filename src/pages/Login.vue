<!-- ============================================ -->
<!-- LOGIN — Página de inicio de sesión          -->
<!-- Usa AuthLayout como contenedor.             -->
<!-- Responsable: Ana Paula Garzón               -->
<!-- ============================================ -->

<template>
  <div>
    <h2 class="text-xl font-semibold text-gray-700 mb-4">Iniciar sesión</h2>

    <!-- Campo de correo electrónico -->
    <!-- v-model conecta el input con form.email automáticamente -->
    <div class="mb-4">
      <label class="block text-gray-600 text-sm mb-1">Correo electrónico</label>
      <input
        v-model="form.email"
        type="email"
        placeholder="correo@ejemplo.com"
        class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
      />
    </div>

    <!-- Campo de contraseña -->
    <div class="mb-6">
      <label class="block text-gray-600 text-sm mb-1">Contraseña</label>
      <input
        v-model="form.password"
        type="password"
        placeholder="••••••••"
        class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
      />
    </div>

    <!-- Mensaje de error — solo aparece si hay un error -->
    <p v-if="error" class="text-red-500 text-sm mb-4">{{ error }}</p>

    <!-- Botón de login — llama a handleLogin al hacer click -->
    <button
      @click="handleLogin"
      class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
      Ingresar
    </button>

    <!-- Link para ir al registro -->
    <p class="text-center text-sm text-gray-500 mt-4">
      ¿No tienes cuenta?
      <router-link to="/register" class="text-blue-500 hover:underline">Regístrate</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const userStore = useUserStore()

// Datos del formulario — ref() los hace reactivos
const form = ref({ email: '', password: '' })
const error = ref('') // Mensaje de error que se muestra al usuario

function handleLogin() {
  // Validación básica — verifica que los campos no estén vacíos
  if (!form.value.email || !form.value.password) {
    error.value = 'Por favor completa todos los campos.'
    return
  }

  // Login simulado — en producción esto sería una llamada a una API real
  userStore.login({ email: form.value.email }, 'token-simulado-123')
  
  // Redirige al inicio después del login
  router.push('/')
}
</script>