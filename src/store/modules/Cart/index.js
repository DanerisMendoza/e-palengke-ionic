import Cart from '@/api/modules/Cart/index'

export default {
    state: {
        CART: [],
        CART_DIALOG: false,
    },
    
    getters: {
        CART:(state) => state.CART,
        CART_DIALOG:(state) => state.CART_DIALOG,
    },

    mutations: {
        CART:(state, data)=>{state.CART = data},
        CART_DIALOG:(state, data)=>{state.CART_DIALOG = data},
    },

    actions: {
        GET_CART({commit}){
            return new Promise((resolve,reject)=>{
            Cart.GetCart().then((response)=>{
                // commit('CART',response.data)
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
        },
        ADD_CART_PRODUCT({commit},payload){
            return new Promise((resolve,reject)=>{
            Cart.AddCartProduct(payload).then((response)=>{
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
        },
        INCREASE_CART_PRODUCT({commit},payload){
            return new Promise((resolve,reject)=>{
            Cart.IncreaseCartProduct(payload).then((response)=>{
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
        },
        DECREASE_CART_PRODUCT({commit},payload){
            return new Promise((resolve,reject)=>{
            Cart.DecreaseCartProduct(payload).then((response)=>{
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
        },
        REMOVE_CART_PRODUCT({commit},payload){
            return new Promise((resolve,reject)=>{
            Cart.RemoveCartProduct(payload).then((response)=>{
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
        },
    }
}