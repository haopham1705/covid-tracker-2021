import { axiosTracker } from "./axiosClient";

const trackerApi = {
    getSummaryTracker(params) {
        const url = '/summary';
        return axiosTracker.get(url, { params });
    },
    getCountryName(params) {
        const url = '/countries';
        return axiosTracker.get(url, { params });
    },
    getStats(params) {
        const url = '/stats';
        return axiosTracker.get(url, { params });
    }

}

export default trackerApi
