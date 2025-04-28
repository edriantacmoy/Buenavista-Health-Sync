import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/auth/LoginView.vue'
import RegisterView from '@/views/auth/auth/RegisterView.vue'
import BhwView from '@/views/BhwView.vue' 
import ProfileView from '@/views/ProfileView.vue'  // Correct import

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
    {
      path: '/bhw',
      name: 'bhw',
      component: BhwView, 
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,  // Correct component reference
    },
  ],
})

export default router
