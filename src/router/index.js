import { createRouter, createWebHistory } from 'vue-router'

import Mainpage from '@/views/Mainpage.vue'
import Profiles from '@/views/Profiles.vue'

const routes = [
  {
    path: '/',
    component: Mainpage
  },
  {
    path:'/profiles',
    component: Profiles,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
