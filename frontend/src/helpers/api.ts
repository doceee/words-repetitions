import axios, { AxiosError } from 'axios';
import { config } from '@/config';

const { apiUrl, publicPath } = config;

axios.defaults.baseURL = apiUrl;
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
    ({ data }) => data,
    error => {
        console.error(error);

        if (!(error instanceof AxiosError)) {
            throw error;
        }

        if (error.response && error.response.status === 401) {
            window.location.href = `${publicPath}login`;
        }

        throw error;
    }
);

export default axios;
