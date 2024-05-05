import axios, { AxiosError } from 'axios';
import { config } from '@/config';

const { apiUrl, publicPath } = config;xios.defaults.baseURL = apiUrl;
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
    ({ data }) => data,
    error => {
        console.error(error);

        if (!(error instanceof AxiosError)) {
            throw error;
        }

        if (error.response && error.response.status === 401) {
            const { responseURL = '' } = error.response.request;

            if (responseURL.slice(config.apiUrl.length + 1).includes('login')) {
                throw error;
            } else {
                window.location.href = `${publicPath}login`;
            }
        }

        throw error;
    }
);

export default axios;
