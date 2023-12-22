import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView')
    },
    {
      path: '/users/:id',
      name: 'user',
      component: () => import('@/views/UserView')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/PageNotFoundView')
    }
  ]
})

export default router
