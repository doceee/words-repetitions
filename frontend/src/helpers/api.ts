import axios from 'axios';
import { config } from '@/config';

const { apiUrl } = config;

axios.defaults.baseURL = apiUrl;
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
    ({ data }) => data,
    error => {
        throw error;
    }
);

export default axios;
