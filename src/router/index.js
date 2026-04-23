// ============================================
// ROUTER — Configuración de rutas de la app
// Responsable: Ana Paula Garzón
// ============================================

import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'

const routes = [
  {
    // Rutas que usan el layout principal (con Navbar y Footer)
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', component: () => import('../pages/Home.vue') },                // Página de inicio
      { path: '/products', component: () => import('../pages/Products.vue') },   // Catálogo
      { path: '/product/:id', component: () => import('../pages/ProductDetail.vue') }, // Detalle de producto
      { path: '/cart', component: () => import('../pages/Cart.vue') },           // Carrito
      { 
        path: '/profile', 
        component: () => import('../pages/Profile.vue'), 
        meta: { requiresAuth: true }  // Ruta protegida — solo usuarios logueados - definicion de metadata
      },
      { 
        path: '/checkout', 
        component: () => import('../pages/Checkout.vue'), 
        meta: { requiresAuth: true }  // Ruta protegida — solo usuarios logueados
      },
    ]
  },
  {
    // Rutas que usan el layout de autenticación (caja centrada sin Navbar)
    path: '/login',
    component: AuthLayout,
    children: [
      { path: '', component: () => import('../pages/Login.vue') }
    ]
  },
  {
    path: '/register',
    component: AuthLayout,
    children: [
      { path: '', component: () => import('../pages/Register.vue') }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(), // Usa URLs limpias sin el símbolo #
  routes
})

// Guard de navegación — se ejecuta antes de cada cambio de ruta
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  // Si la ruta requiere autenticación y no hay sesión activa, redirige al login
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    //     ^^^^^^^^^^^^^^^^^^^
    //     Aquí se accede a la metadata
    //     to.meta = metadata de la ruta a la que vas
    //     to.meta.requiresAuth = el valor true que pusimos en la ruta
    
    next('/login')
  } else {
    next() // Permite la navegación normal
  }
})

export default router