import api from '@/api/index'

export default {
    GET_APPLICANT_CREDENTIAL(){
        return api.get('api/ApplicantCrendential');
    },
    GET_APPLICANT_CREDENTIAL_BY_ID(params){
        return api.get(`api/ApplicantCrendential/${params}`);
    },
    STORE_APPLICANT_CREDENTIAL(params){
        return api.post('api/ApplicantCrendential',params);
    },
    UPDATE_APPLICANT_CREDENTIAL_BY_ID(params){
        return api.put(`api/ApplicantCrendential/${params.id}`,params.request);
    },
    DELETE_APPLICANT_CREDENTIAL_BY_ID(params){
        return api.delete(`api/ApplicantCrendential/${params}`);
    },
    SUBMIT_APPLICANT_CREDENTIAL(params,config){
        return api.post('api/SubmitApplicantCrendential',params,config.headers);
    }
}