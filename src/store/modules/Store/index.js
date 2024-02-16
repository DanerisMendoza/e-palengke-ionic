import Store from '@/api/modules/Store/index'

export default {
    state: {
        STORES: [],
        STORES_LAT_LNG: [],
        SELECTED_STORE: null,
        STORE_TYPE_FILTER: 'All',
    },

    getters: {
        STORES: (state) => state.STORES,
        STORES_LAT_LNG: (state) => state.STORES_LAT_LNG,
        SELECTED_STORE: (state) => state.SELECTED_STORE,
        STORE_TYPE_FILTER: (state) => state.STORE_TYPE_FILTER,
    },

    mutations: {
        STORES: (state, data) => { state.STORES = data },
        STORES_LAT_LNG: (state, data) => { state.STORES_LAT_LNG = data },
        SELECTED_STORE: (state, data) => { state.SELECTED_STORE = data },
        STORE_TYPE_FILTER: (state, data) => { state.STORE_TYPE_FILTER = data },
    },

    actions: {
        GetActiveStore({ commit }) {
            return new Promise((resolve, reject) => {
                Store.GetActiveStore().then((response) => {
                    commit('STORES', response.data)
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },
    }
}