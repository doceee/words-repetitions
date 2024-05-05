import axios, { AxiosError } from 'axios';
import { config } from '@/config';

const { apiUrl, publicPath } = config;

axios.defaults.baseURL = apiUrl;
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
    ({ data }) => data,
    error => {
        console.error(error);
        console.error('!start');

        if (!(error instanceof AxiosError)) {
            console.error('!AxiosError');
            throw error;
        }

        if (error.response && error.response.status === 401) {
            const { responseURL = '' } = error.response.request;

            if (responseURL.slice(config.apiUrl.length + 1).includes('login')) {
                console.error('includes');
                throw error;
            } else {
                console.error('window location');
                window.location.href = `${publicPath}login`;
            }
        }

        console.error('!end');
        throw error;
    }
);

export default axios;
