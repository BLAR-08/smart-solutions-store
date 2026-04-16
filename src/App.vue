<template>
  <!-- Si la ruta es login o register usa AuthLayout, sino DefaultLayout -->
  <AuthLayout v-if="isAuthPage" />
  <DefaultLayout v-else />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from './layouts/DefaultLayout.vue'
import AuthLayout from './layouts/AuthLayout.vue'

const route = useRoute()

// Detecta si estamos en una página de autenticación
const isAuthPage = computed(() => 
  route.path === '/login' || route.path === '/register'
)
</script>