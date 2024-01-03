import axios from 'axios';

const axiosInstance =
    process.env.NODE_ENV === 'development'
        ? axios.create({
              // http://localhost:5006/
              baseURL: 'http://localhost:3000/'
          })
        : axios.create({
              baseURL: 'https://api.hellokompass.com/'
          });

axiosInstance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        if (!config.headers.Authorization) {
            const usersInfo = JSON.parse(sessionStorage.getItem('usersInfo'));
            if (usersInfo) {
                config.headers.Authorization = `Bearer ${usersInfo}`;
            }
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

export default axiosInstance;