'use client';

import React, {useEffect} from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import InputWithLabel from '@/components/common/InputWithLabel';
import Button from '@/components/common/Button';
import ContentBox from '@/components/common/ContentBox';
import Image from 'next/image';
import Link from 'next/link';
import {signIn} from '@/service/api';
import {useAuthStore} from '@/service/authStore';
import {useRouter} from 'next/navigation';

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginFormInputs>({mode: 'onBlur'});
  const {setTokens, setUser, user} = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const onSubmit: SubmitHandler<LoginFormInputs> = async data => {
    try {
      console.log('로그인 요청 데이터:', data);
      const result = await signIn(data);

      setTokens(result.accessToken, result.refreshToken);
      setUser(result.user);

      console.log('로그인 성공:', result);
      router.push('/');
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-[16px] tablet:px-[124px]">
      <ContentBox className="p-56pxr px-20pxr tablet:p-64pxr tablet:px-48pxr pc:p-80pxr pc:px-48pxr w-full max-w-[375px] tablet:max-w-[496px] bg-white shadow-[0px_2px_20px_rgba(0,0,0,0.04)]">
        <Link href="/">
          <Image src="/logo-black.svg" alt="로고 이미지" width={104} height={30} className="mx-auto mb-56pxr tablet:mb-64pxr" priority />
        </Link>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputWithLabel
            label="이메일"
            type="email"
            wrapperClassName="gap-[10px]"
            labelClassName="text-md font-medium tablet:text-lg text-gray-800"
            inputClassName="h-42pxr tablet:h-48pxr placeholder:text-gray-500 placeholder:text-md tablet:placeholder:text-lg"
            placeholder="이메일 입력"
            register={register('email', {
              required: '이메일은 필수 입력입니다.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: '이메일 형식으로 작성해 주세요.',
              },
            })}
            error={errors.email?.message}
          />
          <InputWithLabel
            label="비밀번호"
            type="password"
            wrapperClassName="gap-[10px] mt-10pxr"
            labelClassName="text-md font-medium tablet:text-lg text-gray-800"
            inputClassName="h-42pxr tablet:h-48pxr placeholder:text-gray-500 placeholder:text-md tablet:placeholder:text-lg"
            placeholder="비밀번호 입력"
            register={register('password', {required: '비밀번호는 필수 입력입니다.'})}
            error={errors.password?.message}
          />
          <Button
            className="mt-40pxr tablet:mt-56pxr rounded-[12px] tablet:rounded-[16px] font-sans font-bold text-lg text-white"
            style={{
              height: '50px',
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '16px 0',
              background: '#6A42DB',
            }}
            variant="text"
            type="submit"
          >
            로그인
          </Button>
        </form>
        <Button
          className="mt-15pxr rounded-[12px] tablet:rounded-[16px] border border-gray-300 font-sans font-medium text-lg text-gray-800 normal-case"
          style={{
            height: '50px',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '14px 0',
            gap: '10px',
            background: '#FFFFFF',
          }}
          variant="outlined"
        >
          <Image src="/kakao.svg" alt="카카오톡 아이콘" width={24} height={24} />
          kakao로 시작하기
        </Button>
        <div className="flex flex-row justify-center mt-24pxr tablet:mt-32pxr gap-[8px] tablet:gap-[14px]  text-[14px] tablet:text-[16px]">
          <p className="text-gray-500 font-regular">계정이 없으신가요?</p>
          <Link href="/signup" className="text-purple-100 font-medium underline">
            회원가입하기
          </Link>
        </div>
      </ContentBox>
    </div>
  );
}
