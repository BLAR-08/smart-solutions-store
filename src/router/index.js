import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', component: () => import('../pages/Home.vue') },
      { path: '/products', component: () => import('../pages/Products.vue') },
      { path: '/product/:id', component: () => import('../pages/ProductDetail.vue') },
      { path: '/cart', component: () => import('../pages/Cart.vue') },
      { path: '/profile', component: () => import('../pages/Profile.vue'), meta: { requiresAuth: true } },
      { path: '/checkout', component: () => import('../pages/Checkout.vue'), meta: { requiresAuth: true } },
    ]
  },
  {
    path: '/login',
    component: AuthLayout,
    children: [
      { path: '', component: () => import('../pages/Login.vue') },
    ]
  },
  {
    path: '/register',
    component: AuthLayout,
    children: [
      { path: '', component: () => import('../pages/Register.vue') },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router