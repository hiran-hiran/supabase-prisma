import axios from 'axios';

export const axiosClient = axios.create({
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});
