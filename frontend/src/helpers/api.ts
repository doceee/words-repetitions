import axios, { AxiosError } from 'axios';
import { config } from '@/config';
import { getSavedState, saveState } from './storage';

const { apiUrl, publicPath } = config;

axios.defaults.baseURL = apiUrl;
axios.defaults.withCredentials = true;

axios.interceptors.request.use(requestConfig => {
    const { url, method, headers } = requestConfig;

    if (
        url &&
        method &&
        headers &&
        ['post', 'put', 'patch', 'delete'].includes(method) &&
        !url.split('/').some(part => ['login', 'register'].includes(part))
    ) {
        headers['csrf-token'] = getSavedState('csrfToken') ?? '';
    }

    return requestConfig;
});

axios.interceptors.response.use(
    response => {
        const { headers, request } = response;

        const responseURL =
            typeof request.responseURL === 'string'
                ? request.responseURL
                : undefined;

        if (!responseURL) {
            return response.data;
        }

        if (
            responseURL
                .split('/')
                .some((part: string) => ['login', 'register'].includes(part))
        ) {
            if (headers['csrf-token']) {
                saveState('csrfToken', headers['csrf-token']);
            }
        }

        return response.data;
    },
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
