'use client';

import React from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import InputWithLabel from '@/components/common/InputWithLabel';
import Button from '@/components/common/Button';
import ContentBox from '@/components/common/ContentBox';
import Image from 'next/image';
import Link from 'next/link';
import {signUp} from '@/service/api';
import {AxiosError} from 'axios';
import {useAuthStore} from '@/service/authStore';

interface SignupFormInputs {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<SignupFormInputs>({mode: 'onBlur'});

  const {setTokens, setUser} = useAuthStore();

  const onSubmit: SubmitHandler<SignupFormInputs> = async data => {
    try {
      const payload = {
        email: data.email,
        nickname: data.nickname,
        password: data.password,
        passwordConfirmation: data.confirmPassword,
      };
      console.log('Request payload:', payload);

      const result = await signUp(payload);
      console.log('회원가입 성공:', result);

      setTokens(result.accessToken, result.refreshToken);
      setUser(result.user);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('회원가입 실패:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const password = watch('password');

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
            placeholder="whyne@email.com"
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
            label="닉네임"
            type="text"
            wrapperClassName="gap-[10px] mt-10pxr"
            labelClassName="text-md font-medium tablet:text-lg text-gray-800"
            inputClassName="h-42pxr tablet:h-48pxr placeholder:text-gray-500 placeholder:text-md tablet:placeholder:text-lg"
            placeholder="whyne"
            register={register('nickname', {
              required: '닉네임은 필수 입력입니다.',
              maxLength: {
                value: 20,
                message: '닉네임은 최대 20자까지 가능합니다.',
              },
            })}
            error={errors.nickname?.message}
          />
          <InputWithLabel
            label="비밀번호"
            type="password"
            wrapperClassName="gap-[10px] mt-10pxr"
            labelClassName="text-md font-medium tablet:text-lg text-gray-800"
            inputClassName="h-42pxr tablet:h-48pxr placeholder:text-gray-500 placeholder:text-md tablet:placeholder:text-lg"
            placeholder="영문, 숫자, 특수문자(!@#$%^&*) 제한"
            register={register('password', {
              required: '비밀번호는 필수 입력입니다.',
              minLength: {
                value: 8,
                message: '비밀번호는 최소 8자 이상입니다.',
              },
              pattern: {
                value: /^[a-zA-Z0-9!@#$%^&*]+$/,
                message: '비밀번호는 숫자, 영문, 특수문자로만 가능합니다.',
              },
            })}
            error={errors.password?.message}
          />
          <InputWithLabel
            label="비밀번호 확인"
            type="password"
            wrapperClassName="gap-[10px] mt-10pxr"
            labelClassName="text-md font-medium tablet:text-lg text-gray-800"
            inputClassName="h-42pxr tablet:h-48pxr placeholder:text-gray-500 placeholder:text-md tablet:placeholder:text-lg"
            placeholder="비밀번호 확인"
            register={register('confirmPassword', {
              required: '비밀번호 확인을 입력해주세요.',
              validate: value => value === password || '비밀번호가 일치하지 않습니다.',
            })}
            error={errors.confirmPassword?.message}
          />
          <Button
            className="mt-40pxr tablet:mt-32pxr rounded-[12px] tablet:rounded-[16px] font-sans font-bold text-lg text-white"
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
            가입하기
          </Button>
        </form>
        <div className="flex flex-row justify-center mt-24pxr tablet:mt-32pxr gap-[8px] tablet:gap-[14px]  text-[14px] tablet:text-[16px]">
          <p className="text-gray-500 font-regular">계정이 이미 있으신가요?</p>
          <Link href="/login" className="text-purple-100 font-medium underline">
            로그인하기
          </Link>
        </div>
      </ContentBox>
    </div>
  );
}
