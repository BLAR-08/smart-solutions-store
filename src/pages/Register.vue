<!-- ============================================ -->
<!-- REGISTER — Página de registro de usuario   -->
<!-- Usa AuthLayout como contenedor.             -->
<!-- Responsable: Ana Paula Garzón               -->
<!-- ============================================ -->

<template>
  <div>
    <h2 class="text-xl font-semibold text-gray-700 mb-4">Crear cuenta</h2>

    <!-- Campo de nombre completo -->
    <div class="mb-4">
      <label class="block text-gray-600 text-sm mb-1">Nombre completo</label>
      <input
        v-model="form.name"
        type="text"
        placeholder="Ana Paula Garzón"
        class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
      />
    </div>

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

    <!-- Botón de registro — llama a handleRegister al hacer click -->
    <button
      @click="handleRegister"
      class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
      Registrarse
    </button>

    <!-- Link para ir al login -->
    <p class="text-center text-sm text-gray-500 mt-4">
      ¿Ya tienes cuenta?
      <router-link to="/login" class="text-blue-500 hover:underline">Inicia sesión</router-link>
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
const form = ref({ name: '', email: '', password: '' })
const error = ref('') // Mensaje de error que se muestra al usuario

function handleRegister() {
  // Validación básica — verifica que todos los campos estén llenos
  if (!form.value.name || !form.value.email || !form.value.password) {
    error.value = 'Por favor completa todos los campos.'
    return
  }

  // Registro simulado — en producción esto sería una llamada a una API real
  userStore.register({ name: form.value.name, email: form.value.email })
  
  // Login automático después del registro
  userStore.login({ name: form.value.name, email: form.value.email }, 'token-simulado-123')
  
  // Redirige al inicio después del registro
  router.push('/')
}
</script>