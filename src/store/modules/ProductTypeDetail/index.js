import ProductTypeDetail from '@/api/modules/ProductTypeDetail/index'

export default {
    state: {
        PRODUCT_TYPE_DETAIL: [],
        SELECTED_PRODUCT_TYPE_DETAILS: null,
        PRODUCT_TYPE_DETAILS_DIALOG: null,
        
    },
    
    getters: {
        PRODUCT_TYPE_DETAIL:(state) => state.PRODUCT_TYPE_DETAIL,
        SELECTED_PRODUCT_TYPE_DETAILS:(state) => state.SELECTED_PRODUCT_TYPE_DETAILS,
        PRODUCT_TYPE_DETAILS_DIALOG:(state) => state.PRODUCT_TYPE_DETAILS_DIALOG,
    },

    mutations: {
        PRODUCT_TYPE_DETAIL:(state, data)=>{state.PRODUCT_TYPE_DETAIL = data},
        SELECTED_PRODUCT_TYPE_DETAILS:(state, data) => {state.SELECTED_PRODUCT_TYPE_DETAILS = data},
        PRODUCT_TYPE_DETAILS_DIALOG:(state, data) => {state.PRODUCT_TYPE_DETAILS_DIALOG = data},
    },

    actions: {
        GET_PRODUCT_TYPE_DETAIL({commit}){
            return new Promise((resolve,reject)=>{
                ProductTypeDetail.GET_PRODUCT_TYPE_DETAIL().then((response)=>{
                commit('PRODUCT_TYPE_DETAIL', response.data)
                resolve(response.data)
            }).catch((error)=>{
                  reject(error)
                });
            })
        },
        
        STORE_PRODUCT_TYPE_DETAIL({commit}, payload){
            return new Promise((resolve,reject)=>{
                ProductTypeDetail.STORE_PRODUCT_TYPE_DETAIL(payload).then((response)=>{
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
        },
       
        GET_PRODUCT_TYPE_DETAIL_BY_ID({commit}, payload){
            return new Promise((resolve,reject)=>{
                ProductTypeDetail. GET_PRODUCT_TYPE_DETAIL_BY_ID(payload).then((response)=>{
                commit('PRODUCT_TYPE_DETAIL', response.data)
                resolve(response.data)
            }).catch((error)=>{
                  reject(error)
                });
            })
        },
  
        DELETE_PRODUCT_TYPE_DETAIL_BY_ID({commit},payload){
            return new Promise((resolve,reject)=>{
                ProductTypeDetail.DELETE_PRODUCT_TYPE_DETAIL_BY_ID(payload).then((response)=>{
                    commit('SELECTED_PRODUCT_TYPE_DETAILS', response.data)
                resolve(response.data)
            }).catch((error)=>{
                  reject(error)
                });
            })
        },
        UPDATE_PRODUCT_TYPE_DETAIL_BY_ID({commit}, payload){
            return new Promise((resolve,reject)=>{
                ProductTypeDetail.UPDATE_PRODUCT_TYPE_DETAIL_BY_ID(payload).then((response)=>{
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
        },
        
        
    }
}