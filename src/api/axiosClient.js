import axios from 'axios'

// Axios Tracker
const axiosTracker = axios.create({
    baseURL: 'https://api.covid19api.com',
    header: {
        'Content-type': 'application/json',
    },
})

//request interceptor
axiosTracker.interceptors.request.use(function (config) {
    //before request
    return config;
}, function (error) {
    return Promise.reject(error);
});
//response interceptor
axiosTracker.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

// Axios News
const axiosNews = axios.create({
    baseURL: 'https://newsapi.org/v2',
    header: {
        'Content-type': 'application/json',
    },
})

//request interceptor
axiosNews.interceptors.request.use(function (config) {
    //before request
    return config;
}, function (error) {
    return Promise.reject(error);
});
//response interceptor
axiosNews.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

export { axiosTracker, axiosNews };