import axios from 'axios';

const ajax = axios.create({
    baseURL: process.env.API_ROOT,
    timeout: 20000,
})

ajax.interceptors.response.use(response => {
    if (response) {
        return response.data;
    }

}, err => {
    console.log('error', err);
    if (err && err.response) {
        return err;
    }

});

export default ajax;