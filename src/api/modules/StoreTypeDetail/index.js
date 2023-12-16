import api from '@/api/index'

export default {
    GET_STORE_TYPE_DETAIL(){
        return api.get('api/StoreTypeDetail');
    },
    GET_STORE_TYPE_DETAIL_BY_ID(params){
        return api.get(`api/StoreTypeDetail/${params}`);
    },
    STORE_STORE_TYPE_DETAIL(params){
        return api.post('api/StoreTypeDetail',params);
    },
    UPDATE_STORE_TYPE_DETAIL_BY_ID(params){
        return api.put(`api/StoreTypeDetail/${params.id}`,params.request);
    },
    DELETE_STORE_TYPE_DETAIL_BY_ID(params){
        return api.delete(`api/StoreTypeDetail/${params}`);
    }
}