import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import login from '../views/modules/login.vue';
import home from '../views/modules/home.vue';
import store from '../views/modules/store.vue';
import TEST from '../views/modules/test.vue';
import TESTCAMERA from '../views/modules/TESTCAMERA.vue';
import TESTGPS from '../views/modules/TESTGPS.vue';
import TESTPUSHNOTIFICATION from '../views/modules/TESTPUSHNOTIFICATION.vue';
import CustomerOrders from '../views/modules/children/CustomerOrders.vue';
import StoreOrders from '../views/modules/children/StoreOrders.vue';
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
    meta: { requiresAuth: false },
  },
  {
    path: '/HOME',
    name: 'HOME',
    component: home,
    meta: { requiresAuth: true }, 
  },
  {
    path: '/STORE',
    name: 'STORE',
    component: store,
    meta: { requiresAuth: true },
  },
  {
    path: '/CUSTOMER%20ORDERS',
    name: 'CUSTOMER ORDERS',
    component: CustomerOrders,
    meta: { requiresAuth: true },
  },
  {
    path: '/STORE%20ORDERS',
    name: 'STORE ORDERS',
    component: StoreOrders,
    meta: { requiresAuth: true },
  },
  {
    path: '/TEST',
    name: 'TEST',
    component: TEST,
    meta: { requiresAuth: true }, 
  },
  {
    path: '/TESTCAMERA',
    name: 'TESTCAMERA',
    component: TESTCAMERA,
    meta: { requiresAuth: null }, 
  },
  {
    path: '/TESTGPS',
    name: 'TESTGPS',
    component: TESTGPS,
    meta: { requiresAuth: null }, 
  },
  {
    path: '/TESTPUSHNOTIF',
    name: 'TESTPUSHNOTIF',
    component: TESTPUSHNOTIFICATION,
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
