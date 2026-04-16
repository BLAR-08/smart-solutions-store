import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)

  const isLoggedIn = computed(() => !!token.value)

  function login(userData, userToken) {
    user.value = userData
    token.value = userToken
    localStorage.setItem('token', userToken)
  }

  function register(userData) {
    user.value = userData
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
  }

  return { user, token, isLoggedIn, login, register, logout }
})