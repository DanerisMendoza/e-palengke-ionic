import api from '@/api/index'

export default {
    GET_REQUIREMENT_DETAILS(){
        return api.get('api/requirements');
    },
    GET_REQUIREMENT_DETAILS_BY_ID(params){
        return api.get(`api/requirements/${params}`);
    },
    CREATE_REQUIREMENT_DETAILS(params){
        return api.post('api/RequirementDetail',params);
    },
    UPDATE_REQUIREMENT_DETAILS_BY_ID(params){
        return api.put(`api/RequirementDetail/${params.id}`,params.request);
    },
    DELETE_REQUIREMENT_DETAILS_BY_ID(params){
        return api.delete(`api/requirements/${params}`);
    }
}