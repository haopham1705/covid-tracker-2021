import axiosClient from "./axiosClient";

const trackerApi = {
    getSummaryTracker(params) {
        const url = '/summary';
        return axiosClient.get(url, { params });
    },
    getCountryName(params) {
        const url = '/countries';
        return axiosClient.get(url, { params });
    },
    getStats(params) {
        const url = '/stats';
        return axiosClient.get(url, { params });
    } 
}

export default trackerApi
