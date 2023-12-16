import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import login from '../views/modules/login.vue'
import home from '../views/modules/home.vue'
import store from '../views/modules/store.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/LOGIN'
  },
  {
    path: '/LOGIN',
    name: 'LOGIN',
    component: login,
  },
  {
    path: '/HOME',
    name: 'HOME',
    component: home
  },
  {
    path: '/STORE',
    name: 'STORE',
    component: store
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
