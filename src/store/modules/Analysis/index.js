import api from '@/api/index'

export default {
    state: {
        USER_ROLES_ANALYSIS: null,
        USER_ROLES_STATUS_ANALYSIS: null,
        ORDERS_ANALYSIS: null,
    },

    getters: {
        USER_ROLES_ANALYSIS: (state) => state.USER_ROLES_ANALYSIS,
        USER_ROLES_STATUS_ANALYSIS: (state) => state.USER_ROLES_STATUS_ANALYSIS,
        ORDERS_ANALYSIS: (state) => state.ORDERS_ANALYSIS,
    },

    mutations: {
        USER_ROLES_ANALYSIS: (state, data) => { state.USER_ROLES_ANALYSIS = data },
        USER_ROLES_STATUS_ANALYSIS: (state, data) => { state.USER_ROLES_STATUS_ANALYSIS = data },
        ORDERS_ANALYSIS: (state, data) => { state.ORDERS_ANALYSIS = data },
    },

    actions: {
        GET_USER_ROLES_ANALYSIS({ commit }, payload) {
            return new Promise((resolve, reject) => {
                api.get('api/GET_USER_ROLES_ANALYSIS').then((response) => {
                    commit('USER_ROLES_ANALYSIS', response.data)
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },
        GET_USER_ROLES_STATUS_ANALYSIS({ commit }, payload) {
            return new Promise((resolve, reject) => {
                api.get('api/GET_USER_ROLES_STATUS_ANALYSIS').then((response) => {
                    commit('USER_ROLES_STATUS_ANALYSIS', response.data)
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },
        GET_ORDERS_ANALYSIS({ commit }, payload) {
            return new Promise((resolve, reject) => {
                api.get('api/GET_ORDERS_ANALYSIS').then((response) => {
                    commit('ORDERS_ANALYSIS', response.data)
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },
    }
}