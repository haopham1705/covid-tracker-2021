import axiosClient from "./axiosClient";

const newsApi = { 
    getNewsTrending(params){
        const url = '/news/trending?';
        return axiosClient.get(url, {params});
    },
    getNewsHightlights(params) {
        const url = '/news/trending?';
        return axiosClient.get(url, { params });
    },
};

export default newsApi; 