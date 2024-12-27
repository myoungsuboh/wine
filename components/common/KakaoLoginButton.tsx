'use client';
import React, {useEffect} from 'react';
import Button from './Button';
import Image from 'next/image';
import {kakaoLogin} from '@/service/api';
import {useAuthStore} from '@/service/authStore';

export default function KakaoLoginButton() {
  const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const REDIRECT_URI = 'http://localhost:3000/oauth/kakao'; // 로그인 후 이동

  const {setTokens, setUser} = useAuthStore();

  const handleKakaoLogin = () => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
    window.open(KAKAO_AUTH_URL, 'Kakao 로그인', 'width=600,height=700,scrollbars=yes');
  };

  const handleLogin = async (authCode: string) => {
    try {
      const loginData = await kakaoLogin(authCode);
      console.log('간편로그인 성공: ', loginData);
      setTokens(loginData.accessToken, loginData.refreshToken);
      setUser(loginData.user);
    } catch (error) {
      console.error('간편로그인 실패:', error);
      alert('로그인에 실패했습니다');
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data.type === 'authCode') {
        handleLogin(event.data.authCode);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <Button
      onClick={handleKakaoLogin}
      className="mt-15pxr rounded-[12px] tablet:rounded-[16px] border border-gray-300 font-sans font-medium text-lg text-gray-800 normal-case w-full flex flex-row justify-center items-center py-14pxr gap-[10px] bg-white"
    >
      <Image src="/kakao.svg" alt="카카오톡 아이콘" width={24} height={24} />
      kakao로 시작하기
    </Button>
  );
}
