import api from '@/api/index'

export default {
    state: {
        RESTART: false,
    },

    getters: {
        RESTART: (state) => state.RESTART,

    },

    mutations: {
        RESTART: (state, data) => { state.RESTART = data },
    },

    actions: {
        MarkOnline({commit},payload) {
            return new Promise((resolve, reject) => {
                api.post('api/MarkOnline', payload).then((response) => {
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },
        MarkOffline({commit},payload) {
            return new Promise((resolve, reject) => {
                api.post('api/MarkOffline', payload).then((response) => {
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },
    }
}