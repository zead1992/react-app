import axios, {AxiosError} from 'axios';
import logService from './log-service';
import {toast} from "react-toastify";


//default base url
axios.defaults.baseURL = "http://localhost:3900/api";

//handle unexpected error
axios.interceptors.response.use(null, (error: AxiosError) => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;
    if (!expectedError) {
        logService.log(error);
        toast('an unexpected error occured');
    }

    return Promise.reject(error);
});



export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
}