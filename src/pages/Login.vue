<template>
  <div>
    <h2 class="text-xl font-semibold text-gray-700 mb-4">Iniciar sesión</h2>

    <div class="mb-4">
      <label class="block text-gray-600 text-sm mb-1">Correo electrónico</label>
      <input
        v-model="form.email"
        type="email"
        placeholder="correo@ejemplo.com"
        class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
      />
    </div>

    <div class="mb-6">
      <label class="block text-gray-600 text-sm mb-1">Contraseña</label>
      <input
        v-model="form.password"
        type="password"
        placeholder="••••••••"
        class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
      />
    </div>

    <p v-if="error" class="text-red-500 text-sm mb-4">{{ error }}</p>

    <button
      @click="handleLogin"
      class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
      Ingresar
    </button>

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

const form = ref({ email: '', password: '' })
const error = ref('')

function handleLogin() {
  if (!form.value.email || !form.value.password) {
    error.value = 'Por favor completa todos los campos.'
    return
  }
  userStore.login({ email: form.value.email }, 'token-simulado-123')
  router.push('/')
}
</script>