import api from '@/api/index'

export default {
    GET_REQUIREMENT_DETAIL(){
        return api.get('api/RequirementDetail');
    },
    GET_REQUIREMENT_DETAIL_BY_ID(params){
        return api.get(`api/RequirementDetail/${params}`);
    },
    GET_REQUIREMENT_DETAIL_BY_USER_ROLE_DETAILS_ID(params){
        return api.get(`api/GET_REQUIREMENT_DETAIL_BY_USER_ROLE_DETAILS_ID/${params}`);
    },
    STORE_REQUIREMENT_DETAIL(params){
        // debugger
        return api.post('api/RequirementDetail',params);
    },
    UPDATE_REQUIREMENT_DETAIL_BY_ID(params){
        return api.put(`api/RequirementDetail/${params.id}`,params.request);
    },
    DELETE_REQUIREMENT_DETAIL_BY_ID(params){
        return api.delete(`api/RequirementDetail/${params}`);
    }
}