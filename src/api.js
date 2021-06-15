import axios from 'axios';

const baseURL = 'https://justadopt-6ygf3gqmiq-uc.a.run.app/'

const api = axios.create({
    baseURL: baseURL,
});

api.interceptors.request.use(function (config) {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.token
    console.log("user " + user)
    console.log("token " + token)
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
