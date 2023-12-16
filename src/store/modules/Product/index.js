import Product from '@/api/modules/Product/index'

export default {
    state: {
        PRODUCT: [],
        PRODUCT_DIALOG: null,
        PRODUCT_TABLE_VIEWER: null,
        SELECTED_PRODUCT_DETAILS: null,
    },
    
    getters: {
        PRODUCT:(state) => state.PRODUCT,
        PRODUCT_DIALOG:(state) => state.PRODUCT_DIALOG,
        SELECTED_PRODUCT_DETAILS:(state) => state.SELECTED_PRODUCT_DETAILS,
        PRODUCT_TABLE_VIEWER:(state) => state.PRODUCT_TABLE_VIEWER,
    },

    mutations: {
        PRODUCT:(state, data)=>{state.PRODUCT = data},
        PRODUCT_DIALOG:(state, data)=>{state.PRODUCT_DIALOG = data},
        SELECTED_PRODUCT_DETAILS:(state, data)=>{state.SELECTED_PRODUCT_DETAILS = data},
        PRODUCT_TABLE_VIEWER:(state, data)=>{state.PRODUCT_TABLE_VIEWER = data},
    },

    actions: {
        STORE_PRODUCT({commit},payload){
            return new Promise((resolve,reject)=>{
                Product.STORE_PRODUCT(payload.params,payload.config).then((response)=>{
                resolve(response.data)
            }).catch((error)=>{
                  reject(error)
                });
            })
        },
        UPDATE_PRODUCT_BY_ID({commit}, payload){
            return new Promise((resolve,reject)=>{
                Product.UPDATE_PRODUCT_BY_ID(payload).then((response)=>{
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
        },
        GET_PRODUCT_BY_ID({commit},payload){
            return new Promise((resolve,reject)=>{
                Product.GET_PRODUCT_BY_ID(payload).then((response)=>{
                commit('PRODUCT',response.data)
                resolve(response.data)
            }).catch((error)=>{
                  reject(error)
                });
            })
        },
        DELETE_PRODUCT_BY_ID({commit},payload){
            return new Promise((resolve,reject)=>{
                Product.DELETE_PRODUCT_BY_ID(payload).then((response)=>{
                    commit('SELECTED_PRODUCT_DETAILS', response.data)
                resolve(response.data)
            }).catch((error)=>{
                  reject(error)
                });
            })
        },
        GET_PRODUCT({commit},payload){
            return new Promise((resolve,reject)=>{
                Product.GET_PRODUCT(payload).then((response)=>{
                commit('PRODUCT',response.data)
                resolve(response.data)
            }).catch((error)=>{
                  reject(error)
                });
            })
        },
        
    }
}