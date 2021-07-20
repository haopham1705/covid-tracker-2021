import axiosClient from "./axiosClient";

const countriesApi = {
    getAll(params) {
        const url = '/countries';
        return axiosClient.get(url, { params });
    },
    getLookupId(country) {
        const url = `/country${country}`;
        return axiosClient.get(url);
    }
};

export default countriesApi;