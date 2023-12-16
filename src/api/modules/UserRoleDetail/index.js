import api from '@/api/index'

export default {
    GET_USER_ROLE_DETAILS(){
        return api.get('api/UserRoleDetail');
    },
    GET_USER_ROLE_DETAILS_BY_ID(params){
        return api.get(`api/UserRoleDetail/${params}`);
    },
    CREATE_USER_ROLE_DETAILS(params){
        return api.post('api/UserRoleDetail',params);
    },
    UPDATE_USER_ROLE_DETAILS_BY_ID(params){
        return api.put(`api/UserRoleDetail/${params.id}`,params.request);
    },
    DELETE_USER_ROLE_DETAILS_BY_ID(params){
        return api.delete(`api/UserRoleDetail/${params}`);
    }
}