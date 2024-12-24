import axios from 'axios';
import {useAuthStore} from './authStore';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API요청에 Authorization 헤더 추가
apiClient.interceptors.request.use(config => {
  const {accessToken} = useAuthStore.getState();

  // 인증 필요 없는 URL은 예외 처리
  const publicEndpoints: {url: string; method: string}[] = [
    {url: '/wines', method: 'GET'},
    {url: '/wines/recommended', method: 'GET'},
    {url: '/oauthApps', method: 'POST'},
    {url: '/auth/signUp', method: 'POST'},
    {url: '/auth/signIn', method: 'POST'},
    {url: '/auth/refresh-token', method: 'POST'},
    {url: '/auth/signIn/', method: 'POST'}, // 동적 경로 처리
  ];

  // publicEndpoints와 일치하지 않을 경우 Authorization 헤더에 Bear ${accessToken} 추가
  if (!publicEndpoints.some(endpoint => config.url?.startsWith(endpoint.url) && config.method?.toUpperCase() === endpoint.method) && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// 예시
export const get = async (endpoint: string) => {
  const response = await apiClient.get(endpoint);
  return response.data;
};

// POST 회원가입
export const signUp = async (data: {email: string; nickname: string; password: string; passwordConfirmation: string}) => {
  const response = await apiClient.post('/auth/signUp', data);
  return response.data;
};
