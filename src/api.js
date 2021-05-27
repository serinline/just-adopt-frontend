import axios from 'axios';

const baseURL = 'http://localhost:8080'

const api = axios.create({
    baseURL: baseURL,
});

api.interceptors.request.use(function (config) {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.accessToken
    console.log(token)
    config.headers.Authorization = token ? `Bearer ${token}` : '';

    return config;
});

api.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
)

export { api };
