import { axiosNews} from "./axiosClient";

const newsApi = { 
    getNewsTrending(params){
        const url = '/news/trending?';
        return axiosNews.get(url, {params});
    },
    getNewsHightlights(params) {
        const url = '/news/trending?';
        return axiosNews.get(url, { params });
    },
};

export default newsApi; 