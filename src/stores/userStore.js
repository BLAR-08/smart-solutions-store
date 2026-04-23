// ============================================
// USER STORE — Gestión del estado del usuario
// Responsable: Ana Paula Garzón
// ============================================

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// defineStore recibe un nombre único ('user') y una función que retorna el estado
export const useUserStore = defineStore('user', () => {

  // --- ESTADO ---
  const user = ref(null)  // Datos del usuario (nombre, email, etc.)
  const token = ref(localStorage.getItem('token') || null) // Token de sesión — persiste en localStorage

  // --- COMPUTED ---
  // isLoggedIn es true si existe un token, false si no
  // !! convierte el valor a booleano (null → false, 'token-123' → true)
  const isLoggedIn = computed(() => !!token.value)

  // --- FUNCIONES ---

  // Login: guarda los datos del usuario y el token en memoria y en localStorage
  function login(userData, userToken) {
    user.value = userData
    token.value = userToken
    localStorage.setItem('token', userToken) // Persiste la sesión aunque se recargue la página
  }

  // Register: solo guarda los datos del usuario en memoria
  function register(userData) {
    user.value = userData
  }

  // Logout: limpia todos los datos de sesión
  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('token') // Elimina el token del navegador
  }

  // Exponemos solo lo que otros componentes necesitan usar
  return { user, token, isLoggedIn, login, register, logout }
})