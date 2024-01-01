import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import login from '../views/modules/login.vue';
import home from '../views/modules/home.vue';
import store from '../views/modules/store.vue';
import TEST from '../views/modules/test.vue';
import user from '@/api/modules/users/index'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/LOGIN',
  },
  {
    path: '/LOGIN',
    name: 'LOGIN',
    component: login,
    meta: { requiresAuth: false }, // add this meta field for non-protected routes
  },
  {
    path: '/HOME',
    name: 'HOME',
    component: home,
    meta: { requiresAuth: true }, // add this meta field for protected routes
  },
  {
    path: '/STORE',
    name: 'STORE',
    component: store,
    meta: { requiresAuth: true }, // add this meta field for protected routes
  },
  {
    path: '/TEST',
    name: 'TEST',
    component: TEST,
    meta: { requiresAuth: true }, // add this meta field for protected routes
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Add a beforeEach hook
router.beforeEach((to, from, next) => {
  let isAuthenticated = false;
  let isAlreadyLoggedIn = false
  user.authenticated().then((response) => {
    const hasPermission = response.data.some((permission: any) => permission.name === to.name);
    if (hasPermission) {
      isAuthenticated = true;
    }
    isAlreadyLoggedIn = true
  }).catch((error) => {
    isAuthenticated = false;
  }).finally(() => {
    // already log in block
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (isAuthenticated) {
        next();
      }
      else {
        next({name: 'LOGIN'});
      }
    }
    // not log in block
    else {
      if(isAuthenticated || isAlreadyLoggedIn){
        next({name: 'HOME'});
      }
      else{
        next();
      }
    }
  });
});

export default router;
