import api from '@/api/index'

export default {
    ApproveUserRole(params){
        return api.patch(`api/ApproveUserRole/${params}`);
    },
    DissaproveUserRole(params){
        return api.patch(`api/DissaproveUserRole/${params}`);
    },
    GET_USER_ROLE_WITH_ACCESSESS_AND_REQUIREMENTS(){
        return api.get('api/Get_UserRole_With_Accessess_And_Requirements');
    },
    GetApplicants(){
        return api.get('api/GetApplicants');
    },
    GET_USER_ROLE(){
        return api.get('api/UserRole');
    },
    GET_USER_ROLE_BY_ID(params){
        return api.get(`api/UserRole/${params}`);
    },
    STORE_USER_ROLE(params){
        return api.post('api/UserRole',params);
    },
    UPDATE_USER_ROLE_BY_ID(params){
        return api.put(`api/UserRole/${params.id}`,params);
    },
    DELETE_USER_ROLE_BY_ID(params){
        return api.delete(`api/UserRole/${params}`);
    },
}