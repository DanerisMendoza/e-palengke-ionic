import api from '@/api/index'

export default {
    authenticated(){
        return api.get('api/authenticate');
    },
    GetSideNav(){
        return api.get('api/GetSideNav');
    },

    GetAllSideNav(){
        return api.get('api/GetAllSideNav');
    },

    Register(params,config){
        return api.post('api/Register',params,config.headers);
    },

    LOGIN(params){
        return api.post('api/Login',params);
    },
    Logout(){
        return api.get('api/Logout');
    },
    GetUserDetails(){
        return api.get('api/GetUserDetails');
    },
    GET_USER(){
        return api.get('api/User');
    },
    GET_USER_ROLE_BY_ID(params){
        return api.get(`api/User/${params}`);
    },
    STORE_USER(params){
        return api.post('api/User',params);
    },
    UPDATE_USER_BY_ID(params){
        return api.put(`api/User/${params.id}`,params.request);
    },
    DELETE_USER_BY_ID(params){
        return api.delete(`api/User/${params}`);
    },
    UpdateUserBalance(params){
        return api.post('api/UpdateUserBalance',params);
    },
}