import axios from 'axios'

// Axios Tracker
const axiosClient = axios.create({
    baseURL: 'https://api.coronatracker.com',
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

export default axiosClient
// Axios News
// const axiosNews = axios.create({
//     baseURL: 'https://newsapi.org/v2',
//     header: {
//         'Content-type': 'application/json',
//     },
// })

// //request interceptor
// axiosNews.interceptors.request.use(function (config) {
//     //before request
//     return config;
// }, function (error) {
//     return Promise.reject(error);
// });
// //response interceptor
// axiosNews.interceptors.response.use(function (response) {
//     return response.data;
// }, function (error) {
//     return Promise.reject(error);
// });

// export { axiosTracker, axiosNews };