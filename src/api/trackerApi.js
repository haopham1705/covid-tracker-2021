import { axiosTracker} from "./axiosClient";

const trackerApi = {
    getSummaryGlobal(params) {
        const url = '/all';
        return axiosTracker.get(url, { params });
    },
    getCountries(params) {
        const url = '/countries';
        return axiosTracker.get(url, { params });
    },
    getStatsByCountry(country, params) {
        const url = `/historical/${country}`;
        return axiosTracker.get(url, { params });
    },
    getStatsByCountry(params){
        const url = '/historical/all'
        return axiosTracker.get(url, { params });
    },

}

export default trackerApi
