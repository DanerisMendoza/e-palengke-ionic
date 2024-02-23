import user from '@/api/modules/users/index'
import api from '@/api/index'

export default {
  state: {
    SIDE_NAV: [],
    ALL_SIDE_NAV: [],
    USER_DETAILS: { name: null },
    USER_INSIDE_RADIUS: [],
    PROFILE_PATH: null,
    DELIVERY_PERSON_DETAILS: null,
  },

  getters: {
    SIDE_NAV: (state) => state.SIDE_NAV,
    ALL_SIDE_NAV: (state) => state.ALL_SIDE_NAV,
    USER_DETAILS: (state) => state.USER_DETAILS,
    USER_INSIDE_RADIUS: (state) => state.USER_INSIDE_RADIUS,
    PROFILE_PATH: (state) => state.PROFILE_PATH,
    DELIVERY_PERSON_DETAILS: (state) => state.DELIVERY_PERSON_DETAILS,
  },

  mutations: {
    SIDE_NAV: (state, data) => { state.SIDE_NAV = data },
    ALL_SIDE_NAV: (state, data) => { state.ALL_SIDE_NAV = data },
    USER_DETAILS: (state, data) => { state.USER_DETAILS = data },
    USER_INSIDE_RADIUS: (state, data) => { state.USER_INSIDE_RADIUS = data },
    PROFILE_PATH: (state, data) => { state.PROFILE_PATH = data },
    DELIVERY_PERSON_DETAILS: (state, data) => { state.DELIVERY_PERSON_DETAILS = data },
  },

  actions: {
    GetUserDetailsById({ commit }, payload) {
      return new Promise((resolve, reject) => {
        api.get('api/GetUserDetailsById', payload).then((response) => {
          commit('DELIVERY_PERSON_DETAILS', response.data)
          resolve(response.data)
        }).catch((error) => {
          reject(error)
        });
      })
    },

    GetUserDetails({ commit }) {
      return new Promise((resolve, reject) => {
        user.GetUserDetails().then((response) => {
          commit('USER_DETAILS', response.data)
          resolve(response.data)
        }).catch((error) => {
          reject(error)
        });
      })
    },
    GetSideNav({ commit }) {
      return new Promise((resolve, reject) => {
        user.GetSideNav().then((response) => {
          commit('SIDE_NAV', response.data)
          resolve(response.data)
        }).catch((error) => {
          reject(error)
        });
      })
    },
    GetAllSideNav({ commit }) {
      return new Promise((resolve, reject) => {
        user.GetAllSideNav().then((response) => {
          commit('ALL_SIDE_NAV', response.data)
          resolve(response.data)
        }).catch((error) => {
          reject(error)
        });
      })
    },
    Logout() {
      return new Promise((resolve, reject) => {
        user.Logout().then((response) => {
          resolve(response.data)
        }).catch((error) => {
          reject(error)
        });
      })
    },
    LOGIN({ commit }, payload) {
      return new Promise((resolve, reject) => {
        user.LOGIN(payload).then((response) => {
          resolve(response.data)
        }).catch((error) => {
          reject(error)
        });
      })
    },
    Register({ commit }, payload) {
      return new Promise((resolve, reject) => {
        user.Register(payload.params, payload.config).then((response) => {
          resolve(response.data)
        }).catch((error) => {
          reject(error)
        });
      })
    },

    UpdateUserBalance({ commit }, payload) {
      return new Promise((resolve, reject) => {
        user.UpdateUserBalance(payload).then((response) => {
          resolve(response.data)
        }).catch((error) => {
          reject(error)
        });
      })
    },

    FIND_USER_WITHIN_RADIUS({ commit }, payload) {
      return new Promise((resolve, reject) => {
        api.post('api/FIND_USER_WITHIN_RADIUS', payload).then((response) => {
          commit('USER_INSIDE_RADIUS', response.data)
          resolve(response.data)
        }).catch((error) => {
          reject(error)
        });
      })
    },

    UpdateDeviceToken({ commit }, payload) {
      return new Promise((resolve, reject) => {
        api.post('api/UpdateDeviceToken', payload).then((response) => {
          resolve(response.data)
        }).catch((error) => {
          reject(error)
        });
      })
    },

  }
}