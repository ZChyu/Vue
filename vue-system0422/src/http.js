
import router from './router'
import axios from 'axios'
import store from './store/store'

axios.interceptors.request.use(
    config => {	
/*        console.log(store.state.token)
        store.commit('del_token')
        console.log(store.state.token)*/
        if (localStorage.getItem('token')) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.headers = `${localStorage.getItem('token')}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

axios.interceptors.response.use(
response => {

    return response;


},
error => { 
    if (error.response) {
    localStorage.clear();
    store.commit('del_token');
    switch (error.response.status) {
        case 401:
        error.message = '未授权，请登录';
        router.push('/login');
        break
        default:
    }
    }
    return Promise.reject(error)
});
export default axios