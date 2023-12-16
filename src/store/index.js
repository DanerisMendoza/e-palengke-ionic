// store/index.js
import { createStore } from 'vuex';
import User from './modules/User';
import RequirementDetail from './modules/RequirementDetail';
import Map from './modules/Map';
import StoreTypeDetail from './modules/StoreTypeDetail';
import ProductTypeDetail from './modules/ProductTypeDetail';
import UserRole from './modules/UserRole';
import UserRoleDetail from './modules/UserRoleDetail';
import ApplicantCredential from './modules/ApplicantCredential';
import Store from './modules/Store';
import Product from './modules/Product';
import Cart from './modules/Cart';
import Order from './modules/Order';
import Queue from './modules/Queue';
import Analysis from './modules/Analysis';

export default createStore({
  strict: false,
  modules: {
    User,
    RequirementDetail,
    Map,
    StoreTypeDetail,
    ProductTypeDetail,
    UserRole,
    ApplicantCredential,
    UserRoleDetail,
    Store,
    Product,
    Cart,
    Order,
    Queue,
    Analysis,
  },
});
