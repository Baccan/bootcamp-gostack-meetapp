import axios from 'axios';

export const baseURL = 'http://192.168.0.5:3333';

const api = axios.create({
  baseURL,
});

export default api;
