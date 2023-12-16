import api from '@/api/index'

export default {
    GetOrdersByStoreId(params){
        return api.get(`api/GetOrdersByStoreId/${params}`);
    },
    GetOrdersByUserId(params){
        return api.get('api/GetOrdersByUserId',{params});
    },
    Order(params){
        return api.post('api/Order',params);
    },
}