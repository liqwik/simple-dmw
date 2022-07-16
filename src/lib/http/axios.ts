import axios from 'axios';
import { APIBaseAdmin } from 'config';
import { AppStorage } from 'utils';

const clientHttp = (baseURL?: string) => {
  const instance = axios.create({
    baseURL: baseURL || APIBaseAdmin,
    headers: {
      'Content-type': 'application/json',
    },
  });

  // Request Interceptors:
  instance.interceptors.request.use(config => {
    const token = AppStorage.getUserToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  // Response Interceptors:
  instance.interceptors.response.use(
    response => {
      return response.data;
    },
    err => {
      return Promise.reject(err.response);
    },
  );

  return instance;
};

export default clientHttp;
