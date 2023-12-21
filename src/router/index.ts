import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView'
import UserView from '@/views/UserView'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/users/:id',
      name: 'user',
      component: UserView
    }
  ]
})

export default router
