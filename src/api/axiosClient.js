import axios from 'axios'

const axiosClient = axios.create({
    baseURL: 'https://api.covid19api.com',
    header: {
        'Content-type': 'application/json',
    },
})

 //request interceptor
axiosClient.interceptors.request.use(function (config) {
   //before request
    return config;
}, function (error) {
    return Promise.reject(error);
});
//response interceptor
axiosClient.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

export default axiosClient;