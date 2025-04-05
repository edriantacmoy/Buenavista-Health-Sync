import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/auth/LoginView.vue'
import RegisterView from '@/views/auth/auth/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
  ],
})

export default router
