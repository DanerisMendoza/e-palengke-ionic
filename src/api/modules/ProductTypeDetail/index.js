import api from '@/api/index'

export default {
    GET_PRODUCT_TYPE_DETAIL(){
        return api.get('api/ProductTypeDetail');
    },
    GET_PRODUCT_TYPE_DETAIL_BY_ID(params){
        return api.get(`api/ProductTypeDetail/${params}`);
    },
    PRODUCT_PRODUCT_TYPE_DETAIL(params){
        return api.post('api/ProductTypeDetail',params);
    },
    STORE_PRODUCT_TYPE_DETAIL(params){
        return api.post('api/ProductTypeDetail',params);
    },
    UPDATE_PRODUCT_TYPE_DETAIL_BY_ID(params){
        return api.put(`api/ProductTypeDetail/${params.id}`,params.request);
    },
    DELETE_PRODUCT_TYPE_DETAIL_BY_ID(params){
        return api.delete(`api/ProductTypeDetail/${params}`);
    }
}