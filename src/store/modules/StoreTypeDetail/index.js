import StoreTypeDetail from '@/api/modules/StoreTypeDetail/index'

export default {
    state: {
        STORE_TYPE_DETAIL: [],
        SELECTED_STORE_TYPE_DETAILS: null,
        STORE_TYPE_DETAILS_DIALOG: null,
    },
    
    getters: {
        STORE_TYPE_DETAIL:(state) => state.STORE_TYPE_DETAIL,
        SELECTED_STORE_TYPE_DETAILS:(state) => state.SELECTED_STORE_TYPE_DETAILS,
        STORE_TYPE_DETAILS_DIALOG:(state) => state.STORE_TYPE_DETAILS_DIALOG,
    },

    mutations: {
        STORE_TYPE_DETAIL:(state, data)=>{state.STORE_TYPE_DETAIL = data},
        SELECTED_STORE_TYPE_DETAILS:(state, data) => {state.SELECTED_STORE_TYPE_DETAILS = data},
        STORE_TYPE_DETAILS_DIALOG:(state, data) => {state.STORE_TYPE_DETAILS_DIALOG = data},
    },

    actions: {
        GET_STORE_TYPE_DETAIL({commit}){
            return new Promise((resolve,reject)=>{
                StoreTypeDetail.GET_STORE_TYPE_DETAIL().then((response)=>{
                commit('STORE_TYPE_DETAIL', response.data)
                resolve(response.data)
            }).catch((error)=>{
                  reject(error)
                });
            })
        },
        STORE_STORE_TYPE_DETAIL({commit}, payload){
            return new Promise((resolve,reject)=>{
                StoreTypeDetail.STORE_STORE_TYPE_DETAIL(payload).then((response)=>{
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
        },
       
        GET_STORE_TYPE_DETAIL_BY_ID({commit}, payload){
            return new Promise((resolve,reject)=>{
                StoreTypeDetail. GET_STORE_TYPE_DETAIL_BY_ID(payload).then((response)=>{
                commit('STORE_TYPE_DETAIL', response.data)
                resolve(response.data)
            }).catch((error)=>{
                  reject(error)
                });
            })
        },
        UPDATE_STORE_TYPE_DETAIL_BY_ID({commit}, payload){
            return new Promise((resolve,reject)=>{
                StoreTypeDetail.UPDATE_STORE_TYPE_DETAIL_BY_ID(payload).then((response)=>{
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
        },
        
        DELETE_STORE_TYPE_DETAIL_BY_ID({commit},payload){
            return new Promise((resolve,reject)=>{
                StoreTypeDetail.DELETE_STORE_TYPE_DETAIL_BY_ID(payload).then((response)=>{
                    commit('SELECTED_STORE_TYPE_DETAILS', response.data)
                resolve(response.data)
            }).catch((error)=>{
                  reject(error)
                });
            })
        },
        
        
    }
}