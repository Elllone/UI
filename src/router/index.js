import { createRouter, createWebHistory } from 'vue-router'

import Boss from '@/views/Boss.vue'
import Profiles from '@/views/Profiles.vue'

const routes = [
  {
    path: '/',
    component:Boss
  },
  {
    path:'/profiles',
    component:Profiles,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
