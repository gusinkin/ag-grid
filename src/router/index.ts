import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView'
import UserView from '@/views/UserView'
import PageNotFound from '@/components/PageNotFound'

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
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: PageNotFound
    }
  ]
})

export default router
