import ApplicantCredential from '@/api/modules/ApplicantCredential/index'

export default {
    state: {
        SELECTED_CREDENTIAL: null
    },
    
    getters: {
        SELECTED_CREDENTIAL:(state) => state.SELECTED_CREDENTIAL,
    },

    mutations: {
        SELECTED_CREDENTIAL:(state, data)=>{state.SELECTED_CREDENTIAL = data},
    },

    actions: {
        SUBMIT_APPLICANT_CREDENTIAL({commit}, payload){
            return new Promise((resolve,reject)=>{
                ApplicantCredential.SUBMIT_APPLICANT_CREDENTIAL(payload.params,payload.config).then((response)=>{
                resolve(response.data)
            }).catch((error)=>{
                  reject(error)
                });
            })
        },
        GET_APPLICANT_CREDENTIAL_BY_ID({commit}, payload){
            return new Promise((resolve,reject)=>{
                ApplicantCredential.GET_APPLICANT_CREDENTIAL_BY_ID(payload).then((response)=>{
                commit('SELECTED_CREDENTIAL')
                resolve(response.data)
            }).catch((error)=>{
                  reject(error)
                });
            })
        },
    }
}