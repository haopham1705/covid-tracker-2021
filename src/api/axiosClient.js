
import axios from 'axios';
// Axios Tracker
const axiosNews = axios.create({
    baseURL: 'https://api.coronatracker.com',
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

const axiosTracker = axios.create({
    baseURL: 'https://disease.sh/v3/covid-19',
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosTracker.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);
// Add a response interceptor
axiosTracker.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
);

export { axiosNews, axiosTracker};