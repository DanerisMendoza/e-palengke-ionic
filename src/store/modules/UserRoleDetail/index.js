import UserRoleDetail from '@/api/modules/UserRoleDetail/index'

export default {
    state: {
        USER_ROLE_DETAILS: [],
        SELECTED_USER_ROLE_DETAILS: null,
    },
    
    getters: {
        USER_ROLE_DETAILS:(state) => state.USER_ROLE_DETAILS,
        SELECTED_USER_ROLE_DETAILS:(state) => state.SELECTED_USER_ROLE_DETAILS,
    },

    mutations: {
        USER_ROLE_DETAILS:(state, data)=>{state.USER_ROLE_DETAILS = data},
        SELECTED_USER_ROLE_DETAILS:(state, data)=>{state.SELECTED_USER_ROLE_DETAILS = data},
    },

    actions: {
        GET_USER_ROLE_DETAILS({commit}){
            return new Promise((resolve,reject)=>{
            UserRoleDetail.GET_USER_ROLE_DETAILS().then((response)=>{
                commit('USER_ROLE_DETAILS', response.data)
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
        },

    }
}