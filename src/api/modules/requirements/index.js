import api from '@/api/index'

export default {
    GET_REQUIREMENTS(){
        return api.get('api/requirements');
    },
    GET_REQUIREMENTS_BY_ID(params){
        return api.get(`api/requirements/${params}`);
    },
    CREATE_REQUIREMENT(params){
        return api.post('api/requirements',params);
    },
    UPDATE_REQUIREMENT_BY_ID(params){
        return api.put(`api/requirements/${params.id}`,params.request);
    },
    DELETE_REQUIREMENT_BY_ID(params){
        return api.delete(`api/requirements/${params}`);
    }
}