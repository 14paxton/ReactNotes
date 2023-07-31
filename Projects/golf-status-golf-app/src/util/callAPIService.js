import axios from 'axios';
import qs from 'qs';



export const get = async (url, urlParams) => {
    const config = {
        headers: { },
        params: urlParams || {},
        paramsSerializer: (params) => {
            return qs.stringify(params, { arrayFormat: 'repeat' });
        }
    };
    try {
        const res = await axios.get(url, config);
        return res.data;
    } catch (error) {
        throw error;
    }
};
