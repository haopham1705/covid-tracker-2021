import axiosClient from "./axiosClient";

const newsApi = { 
    getNewsTrending(params){
        const url = '/news/trending?offset';
        return axiosClient.get(url, {params});
    }
};

export default newsApi; 