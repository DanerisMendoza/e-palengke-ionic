import api from '@/api/index'

export default {
    GET_PRODUCT(){
        return api.get('api/Product');
    },
    GET_PRODUCT_BY_ID(params){
        return api.get(`api/Product/${params}`);
    },
    STORE_PRODUCT(params,config){
        return api.post('api/Product',params,config.headers);
    },
    UPDATE_PRODUCT_BY_ID(params){
        return api.put(`api/Product/${params.id}`,params.request);
    },
    DELETE_PRODUCT_BY_ID(params){
        return api.delete(`api/Product/${params}`);
    }
}