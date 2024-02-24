import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import user from '@/api/modules/users/index'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/LOGIN',
  },
  {
    path: '/LOGIN',
    name: 'LOGIN',
    component: () => import('../views/modules/login.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/HOME',
    name: 'HOME',
    component: () => import('../views/modules/home.vue'),
    meta: { requiresAuth: true }, 
  },
  {
    path: '/STORE',
    name: 'STORE',
    component: () => import('../views/modules/store.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/DELIVERY',
    name: 'DELIVERY',
    component: () => import('../views/modules/delivery.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/CUSTOMER%20ORDERS',
    name: 'CUSTOMER ORDERS',
    component: () => import('../views/modules/children/CustomerOrders.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/STORE%20ORDERS',
    name: 'STORE ORDERS',
    component: () => import('../views/modules/children/StoreOrders.vue'),
    meta: { requiresAuth: true },
  },
  // {
  //   path: '/TEST',
  //   name: 'TEST',
  //   component: TEST,
  //   meta: { requiresAuth: null }, 
  // },
  {
    path: '/TESTCAMERA',
    name: 'TESTCAMERA',
    component: () => import('../views/modules/TESTCAMERA.vue'),
    meta: { requiresAuth: null }, 
  },
  {
    path: '/TESTGPS',
    name: 'TESTGPS',
    component: () => import('../views/modules/TESTGPS.vue'),
    meta: { requiresAuth: null }, 
  },
  {
    path: '/TESTPUSHNOTIF',
    name: 'TESTPUSHNOTIF',
    component: () => import('../views/modules/TESTPUSHNOTIFICATION.vue'),
    meta: { requiresAuth: null }, 
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
    else if(to.matched.some((record) => record.meta.requiresAuth == false)) {
      if(isAuthenticated || isAlreadyLoggedIn){
        next({name: 'HOME'});
      }
      else{
        next();
      }
    }
    else{
      next();
    }
  });
});

export default router;
