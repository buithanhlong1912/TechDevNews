import axios from "axios";


axios.defaults.baseURL = 'http://localhost:3000'

axios.interceptors.request.use(function (config) {
    config.headers = {
        ...config.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json'
    };
    return config;
}, function (error) {
    return Promise.reject(error);
});