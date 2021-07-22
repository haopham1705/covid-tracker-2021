import {axiosNews} from "./axiosClient";

const newsApi = { 
    getNewsPoplularity(params){
        const url = '/everything?sortBy=popularity';
        return axiosNews.get(url, {params});
    }
};

export default newsApi; 