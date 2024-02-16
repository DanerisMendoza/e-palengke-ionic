import api from '@/api/index'

export default {
    state: {
        ORDERS: [],
        ORDER_DETAILS: [],
        SELECTED_ORDER_DETAILS: null,
        SELECTED_ORDER_STATUS: null,
        ORDERS_TABLE_MODE: null,
        TRANSACTION: [],
        CURRENT_TRANSACTION_ID: null,
        ORDER_STORE_LAT_LNG: [],
        ORDER_DETAILS_DIALOG: false,
        SELECTED_ORDER_STATUS: null,
        IS_ORDERS_CHANGE: false,
    },

    getters: {
        SELECTED_ORDER_STATUS: (state) => state.SELECTED_ORDER_STATUS,
        CURRENT_TRANSACTION_ID: (state) => state.CURRENT_TRANSACTION_ID,
        TRANSACTION: (state) => state.TRANSACTION,
        ORDERS: (state) => state.ORDERS,
        ORDER_DETAILS: (state) => state.ORDER_DETAILS,
        SELECTED_ORDER_DETAILS: (state) => state.SELECTED_ORDER_DETAILS,
        ORDERS_TABLE_MODE: (state) => state.ORDERS_TABLE_MODE,
        ORDER_STORE_LAT_LNG: (state) => state.ORDER_STORE_LAT_LNG,
        ORDER_DETAILS_DIALOG: (state) => state.ORDER_DETAILS_DIALOG,
        SELECTED_ORDER_STATUS: (state) => state.SELECTED_ORDER_STATUS,
        IS_ORDERS_CHANGE: (state) => state.IS_ORDERS_CHANGE,
    },

    mutations: {
        SELECTED_ORDER_STATUS: (state, data) => { state.SELECTED_ORDER_STATUS = data },
        CURRENT_TRANSACTION_ID: (state, data) => { state.CURRENT_TRANSACTION_ID = data },
        TRANSACTION: (state, data) => { state.TRANSACTION = data },
        ORDERS: (state, data) => { state.ORDERS = data },
        ORDER_DETAILS: (state, data) => { state.ORDER_DETAILS = data },
        SELECTED_ORDER_DETAILS: (state, data) => { state.SELECTED_ORDER_DETAILS = data },
        ORDERS_TABLE_MODE: (state, data) => { state.ORDERS_TABLE_MODE = data },
        ORDER_STORE_LAT_LNG: (state, data) => { state.ORDER_STORE_LAT_LNG = data },
        ORDER_DETAILS_DIALOG: (state, data) => { state.ORDER_DETAILS_DIALOG = data },
        SELECTED_ORDER_STATUS: (state, data) => { state.SELECTED_ORDER_STATUS = data },
        IS_ORDERS_CHANGE: (state, data) => { state.IS_ORDERS_CHANGE = data },
    },

    actions: {
        ORDER({ commit }, payload) {
            return new Promise((resolve, reject) => {
                api.post('api/ORDER', payload).then((response) => {
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },
        FIND_ORDER_WITHIN_RADIUS({ commit }, payload) {
            return new Promise((resolve, reject) => {
                api.post('api/FIND_ORDER_WITHIN_RADIUS', payload).then((response) => {
                    if (response.data.length > 0) {
                        commit('CURRENT_TRANSACTION_ID', response.data[0].transaction_id)
                    }
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },
        REMOVE_TRANSACTION_DELIVERY_ID({ commit }, payload) {
            return new Promise((resolve, reject) => {
                api.post('api/REMOVE_TRANSACTION_DELIVERY_ID', payload).then((response) => {
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },
        GET_IN_PROGRESS_TRANSACTION({ commit }, payload) {
            return new Promise((resolve, reject) => {
                api.get('api/GET_IN_PROGRESS_TRANSACTION', payload).then((response) => {
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },
        GET_TRANSACTION_BY_ID({ commit }, payload) {
            return new Promise((resolve, reject) => {
                api.get('api/GET_TRANSACTION_BY_ID', payload).then((response) => {
                    commit('TRANSACTION', response.data)
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },
        ACCEPT_TRANSACTION({ commit }, payload) {
            return new Promise((resolve, reject) => {
                api.post('api/ACCEPT_TRANSACTION', payload).then((response) => {
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },
        CANCEL_ORDER({ commit }, payload) {
            return new Promise((resolve, reject) => {
                api.post('api/CANCEL_ORDER', payload).then((response) => {
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },
        PICKUP_ORDERS({ commit }, payload) {
            return new Promise((resolve, reject) => {
                api.post('api/PICKUP_ORDERS', payload).then((response) => {
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },
        DROP_OFF({ commit }, payload) {
            return new Promise((resolve, reject) => {
                api.post('api/DROP_OFF', payload).then((response) => {
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },
        DECLINE_ORDER({ commit }, payload) {
            return new Promise((resolve, reject) => {
                api.post('api/DECLINE_ORDER', payload).then((response) => {
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },
        CANCEL_ORDER_DETAIL({ commit }, payload) {
            return new Promise((resolve, reject) => {
                api.post('api/CANCEL_ORDER_DETAIL', payload).then((response) => {
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },
        ACCEPT_ORDER({ commit }, payload) {
            return new Promise((resolve, reject) => {
                api.post('api/ACCEPT_ORDER', payload).then((response) => {
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },
        ORDER_TO_SHIP({ commit }, payload) {
            return new Promise((resolve, reject) => {
                api.post('api/ORDER_TO_SHIP', payload).then((response) => {
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },
        COMPLETE_ORDER({ commit }, payload) {
            return new Promise((resolve, reject) => {
                api.post('api/COMPLETE_ORDER', payload).then((response) => {
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },
        GET_ORDERS_BY_STORE_ID({ commit }, payload) {
            return new Promise((resolve, reject) => {
                api.get(`api/GET_ORDERS_BY_STORE_ID/${payload}`).then((response) => {
                    commit('ORDERS', response.data)
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },

        GET_ORDERS({ commit }, payload) {
            return new Promise((resolve, reject) => {
                api.get('api/GET_ORDERS', payload).then((response) => {
                    commit('ORDERS', response.data)
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },
        
        GET_ORDER_DETAILS({ commit }, payload) {
            return new Promise((resolve, reject) => {
                api.get('api/GET_ORDER_DETAILS', payload).then((response) => {
                    commit('ORDER_DETAILS', response.data)
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },
    }
}