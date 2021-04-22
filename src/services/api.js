import axios from 'axios';

import { baseURL, secret } from '../keys';

const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    api_key: secret,
  };
  return config;
});

export default api;
