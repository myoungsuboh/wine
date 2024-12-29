import axios from 'axios';
import {useAuthStore} from './authStore';

// const baseURL = process.env.NEXT_PUBLIC_API_URL;

//api주소는 env로 관리할 필요 없어서 직접 삽입
const baseURL = 'https://winereview-api.vercel.app/11-1';

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

//---- AUTH ----
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
//----

//---- IMAGE ----
export const uploadImg = async (file: File) => {
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('파일크기가 5MB를 초과합니다!');
  }

  const formData = new FormData();
  formData.append('image', file);

  const response = await apiClient.post('/images/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
//----

//---- USER ----
// PATCH 사용자 정보 업데이트
export const patchUser = async (data: { image: string; nickname: string }) => {
  const response = await apiClient.patch('/users/me', data);
  return response.status;
};
// GET 사용자 리뷰 호출
export const getUserReviews = async (limit: number) => {
  const response = await apiClient.get(`/users/me/reviews?limit=${limit}`);
  return response.data;
};
// GET 사용자 와인 호출
export const getUserWines = async (limit: number) => {
  const response = await apiClient.get(`/users/me/wines?limit=${limit}`);
  return response.data;
};
//----



//---- REVIEW ----
// PATCH  리뷰 수정
export const patchReview = async (id: number, data: REVIEWS_DATA) => {
  const response = await apiClient.patch(`/reviews/${id}`, data);
  return response.status;
};

// DELETE  리뷰 삭제
export const deleteReview = async (id: number) => {
  const response = await apiClient.delete(`/reviews/${id}`);
  return response.status;
};
//----

//---- WINE ----
// PATCH  와인 수정
export const patchWine = async (id: number, data: WINES_DATA) => {
  const response = await apiClient.patch(`/wines/${id}`, data);
  return response.status;
};
// DELETE  와인 삭제
export const deleteWine = async (id: number) => {
  const response = await apiClient.delete(`/wines/${id}`);
  return response.status;
};
//----
