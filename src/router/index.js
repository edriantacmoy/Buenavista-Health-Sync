import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/auth/LoginView.vue'
import RegisterView from '@/views/auth/auth/RegisterView.vue'
import DashboardView from '@/components/auth/DashboardView.vue'
import RecordsView from '@/components/auth/RecordsView.vue'
import BhwView from '@/components/auth/BhwView.vue' 
import ProfileView from '@/components/auth/ProfileView.vue'  // Correct import


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
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },{
      path: '/records',
      name: 'records',
      component: RecordsView,
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
