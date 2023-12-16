import api from '@/api/index'

export default {
    GetActiveStore(){
        return api.get('api/GetActiveStore');
    },
}