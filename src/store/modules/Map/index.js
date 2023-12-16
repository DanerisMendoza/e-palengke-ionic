import requirement from '@/api/modules/requirements/index'

export default {
    state: {
        ZOOM: 7,
        CENTER: [14.653341002411047,120.99472379571777],
        MARKER_LAT_LNG:  null,
        CIRCLE_RADIUS: 50,
    },
    
    getters: {
        ZOOM:(state) => state.ZOOM,
        CENTER:(state) => state.CENTER,
        CIRCLE_RADIUS:(state) => state.CIRCLE_RADIUS,
        MARKER_LAT_LNG:(state) => state.MARKER_LAT_LNG,
    },

    mutations: {
        ZOOM:(state, data)=>{state.ZOOM = data},
        CENTER:(state, data)=>{state.CENTER = data},
        CIRCLE_RADIUS:(state, data)=>{state.CIRCLE_RADIUS = data},
        MARKER_LAT_LNG:(state, data)=>{state.MARKER_LAT_LNG = data},
    },

    actions: {

    }
}