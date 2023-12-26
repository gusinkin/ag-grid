import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/Home')
    },
    {
      path: '/users/:id',
      name: 'user',
      component: () => import('@/pages/User')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/pages/PageNotFound')
    }
  ]
})

export default router
