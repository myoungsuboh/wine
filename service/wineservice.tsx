import axios from 'axios';
import {useAuthStore} from '@/service/authStore';

type WineType = 'RED' | 'WHITE' | 'SPARKLING';

// 와인 목록 조회 함수
export const fetchWines = async (limit: number = 10, filters?: {type?: WineType; minPrice?: number; maxPrice?: number; rating?: number}) => {
  const {accessToken} = useAuthStore.getState();

  if (!accessToken || typeof accessToken !== 'string' || accessToken.trim() === '') {
    throw new Error('로그인이 필요합니다. Access token is missing or invalid.');
  }

  try {
    // type 값을 대문자로 변환
    const formattedType = filters?.type ? filters.type.toUpperCase() : undefined;

    const response = await axios.get(`https://winereview-api.vercel.app/11-1/wines`, {
      headers: {
        Authorization: `Bearer ${accessToken.trim()}`,
      },
      params: {
        limit,
        type: formattedType, // 대문자로 변환된 type 값
        minPrice: filters?.minPrice,
        maxPrice: filters?.maxPrice,
        rating: filters?.rating,
      },
    });

    return response.data.list; // 반환된 와인 데이터 목록
  } catch (error: any) {
    console.error('Error fetching wines:', error.response || error.message);
    throw error;
  }
};

// 이미지 업로드 함수
export const uploadImage = async (image: File): Promise<string> => {
  const {accessToken} = useAuthStore.getState();

  if (!accessToken || typeof accessToken !== 'string' || accessToken.trim() === '') {
    throw new Error('로그인이 필요합니다. Access token is missing or invalid.');
  }

  if (!image) {
    throw new Error('이미지 파일이 필요합니다.');
  }

  const formData = new FormData();
  formData.append('image', image);

  try {
    const response = await axios.post(`https://winereview-api.vercel.app/11-1/images/upload`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken.trim()}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.url; // 업로드된 이미지 URL 반환
  } catch (error: any) {
    console.error('Error uploading image:', error.response || error.message);
    throw new Error('이미지 업로드 실패');
  }
};

// 와인 등록 함수
export const registerWine = async (data: {name: string; region: string; image: File; price: number; type: WineType}) => {
  const {accessToken} = useAuthStore.getState();

  if (!accessToken || typeof accessToken !== 'string' || accessToken.trim() === '') {
    throw new Error('로그인이 필요합니다. Access token is missing or invalid.');
  }

  // Step 1: type 필드를 대문자로 변환
  const formattedType = data.type.toUpperCase();

  try {
    // Step 2: 이미지 업로드 후 URL 획득
    const imageUrl = await uploadImage(data.image);

    // Step 3: 업로드된 이미지 URL을 사용하여 와인 등록
    const response = await axios.post(
      `https://winereview-api.vercel.app/11-1/wines`,
      {
        name: data.name,
        region: data.region,
        price: data.price,
        type: formattedType, // 변환된 type 값
        image: imageUrl, // 업로드된 이미지 URL 사용
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken.trim()}`,
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('Wine registered successfully:', response.data);
  } catch (error: any) {
    console.error('Error registering wine:', error.response || error.message);

    if (error.response?.status === 401) {
      alert('인증 오류: 로그인 정보를 확인하세요.');
    } else if (error.response?.status === 400) {
      alert('요청 오류: 데이터를 확인하세요.');
    } else {
      alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }

    throw error;
  }
};
