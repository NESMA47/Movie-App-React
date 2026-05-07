import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3', 
});

axiosInstance.interceptors.request.use((config) => {
    config.params = {
        ...config.params,
        api_key: '083a6243dfe701eb1fa9b9aa22cadc53', 
    };
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;