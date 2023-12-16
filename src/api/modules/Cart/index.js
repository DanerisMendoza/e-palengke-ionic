import api from '@/api/index'

export default {
    GetCart(){
        return api.get('api/GetCart');
    },
    AddCartProduct(params){
        return api.post('api/AddCartProduct',params);
    },
    IncreaseCartProduct(params){
        return api.post('api/IncreaseCartProduct',params);
    },
    DecreaseCartProduct(params){
        return api.post('api/DecreaseCartProduct',params);
    },
    RemoveCartProduct(params){
        return api.delete('api/RemoveCartProduct',{params});
    },
}