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
    config.headers.Authorization = `Bearer ${accessToken.trim()}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  response => response,

  // 에러가 발생한 경우
  async error => {
    const originalRequest = error.config;

    // 401에러, refreshToken 있는 경우 (무한 루프 방지를 위해 _retry 체크)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // refreshToken 있으면 accessToken 갱신 요청
      const {refreshToken} = useAuthStore.getState();

      if (refreshToken) {
        try {
          const response = await axios.post(`${baseURL}/auth/refresh-token`, {refreshToken});
          const {accessToken} = response.data;

          useAuthStore.getState().setTokens(accessToken, refreshToken);

          // 실패했던 요청 재시도
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          return apiClient(originalRequest);
        } catch (refreshError) {
          console.error('token 갱신 실패: ', refreshError);
          useAuthStore.getState().clearUser();
          throw refreshError;
        }
      }
    }
    // 401 외 에러 반환
    console.error('401 외 에러:', error);
    return Promise.reject(error);
  },
);

// 예시
export const get = async (endpoint: string) => {
  const response = await apiClient.get(endpoint);
  return response.data;
};

// POST 회원가입 (/auth/signUp)
export const signUp = async (data: {email: string; nickname: string; password: string; passwordConfirmation: string}) => {
  const response = await apiClient.post('/auth/signUp', data);
  return response.data;
};

// POST 로그인 (/auth/signIn)
export const signIn = async (data: {email: string; password: string}) => {
  const response = await apiClient.post('/auth/signIn', data);
  return response.data;
};

// POST 간편 로그인 (/auth/signIn/{provider})
export const kakaoLogin = async (authCode: string) => {
  const state = btoa(new Date().toISOString());

  try {
    const response = await apiClient.post('/auth/signIn/KAKAO', {
      state: state,
      token: authCode,
      redirectUri: 'http://localhost:3000/oauth/kakao',
    });
    return response.data;
  } catch (error) {
    console.error('카카오 로그인 실패:', error);
    throw error;
  }
};
