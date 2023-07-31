import {get} from "./callAPIService";

export const fetchDataWithParams = async (url, params) => {
    try {
        return await get(url, params);
    } catch (e) {
        console.error('Unable to fetch data', e);
        return null;
    }
};


export const fetchData = async (url) => {
    try {
        return await get(url);
    } catch (e) {
        console.error('Unable to fetch data', e);
        return null;
    }
};
