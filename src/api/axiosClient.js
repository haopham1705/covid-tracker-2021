
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
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
axiosTracker.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export { axiosNews, axiosTracker };