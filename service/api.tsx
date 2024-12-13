import axios from 'axios';

const baseURL = process.env.API_BASE_URL;

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const get = async (endpoint: string) => {
  const response = await apiClient.get(endpoint);
  return response.data;
};

export {get};
