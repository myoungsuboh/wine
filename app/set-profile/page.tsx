'use client';

import {useForm, SubmitHandler} from 'react-hook-form';
import Button from '@/components/common/Button';
import ContentBox from '@/components/common/ContentBox';
import InputWithLabel from '@/components/common/InputWithLabel';
import {useState} from 'react';
import Image from 'next/image';
import {patchUser, uploadImg} from '@/service/api';
import {useAuthStore} from '@/service/authStore';
import {useRouter} from 'next/navigation';

interface ProfileFormInputs {
  nickname: string;
}

export default function SetProfile() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<ProfileFormInputs>({mode: 'onBlur'});
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const {setUser} = useAuthStore();
  const router = useRouter();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

      if (!allowedTypes.includes(file.type)) {
        alert('JPG, JPEG, PNG 파일만 업로드할 수 있습니다.');
        return;
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        alert('파일 크기는 5MB 이하로 업로드해야 합니다.');
        return;
      }

      try {
        // 이미지 업로드 API 호출
        const imageUrl = await uploadImg(file);

        // 업로드된 이미지 URL을 상태에 저장
        setImageUrl(imageUrl);
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
      }
    }
  };

  const onSubmit: SubmitHandler<ProfileFormInputs> = async data => {
    try {
      console.log('닉네임 저장 요청 데이터:', imageUrl, data);

      const updateUser = await patchUser({image: imageUrl, nickname: data.nickname});

      setUser({
        nickname: updateUser.nickname,
        image: updateUser.image,
      });

      console.log('프로필이 성공적으로 저장되었습니다.');
      router.push('/');
    } catch (error) {
      console.error('프로필 저장 실패:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-[16px] tablet:px-[124px]">
      <ContentBox className="p-56pxr px-20pxr tablet:p-64pxr tablet:px-48pxr pc:p-80pxr pc:px-48pxr w-full max-w-[375px] tablet:max-w-[496px] bg-white shadow-[0px_2px_20px_rgba(0,0,0,0.04)]">
        <h1 className="text-3xl font-bold text-center">프로필 작성</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-48pxr mb-24pxr text-center">
            <label htmlFor="imageUpload" className="cursor-pointer inline-block relative">
              <div className="w-[160px] h-[160px] rounded-full border-1 border-gray-300 flex items-center justify-center overflow-hidden relative group">
                {imageUrl ? (
                  <Image src={imageUrl} alt="업로드한 이미지" width="160" height="160" layout="intrinsic" className="object-cover" />
                ) : (
                  <>
                    <Image
                      src="/profile.svg"
                      alt="기본 이미지"
                      width="160"
                      height="160"
                      layout="intrinsic"
                      className="object-cover group-hover:hidden"
                    />
                    <Image
                      src="/profile-hover.svg"
                      alt="호버 이미지"
                      width="160"
                      height="160"
                      layout="intrinsic"
                      className="object-cover hidden group-hover:block"
                    />
                  </>
                )}
              </div>
            </label>
            <input id="imageUpload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </div>
          <InputWithLabel
            label="닉네임"
            type="text"
            wrapperClassName="gap-[10px] mt-10pxr"
            labelClassName="text-md font-medium tablet:text-lg text-gray-800"
            inputClassName="h-42pxr tablet:h-48pxr placeholder:text-gray-500 placeholder:text-md tablet:placeholder:text-lg"
            placeholder="20자 이하로 입력"
            register={register('nickname', {
              required: '닉네임은 필수 입력입니다.',
              maxLength: {
                value: 20,
                message: '닉네임은 최대 20자까지 가능합니다.',
              },
            })}
            error={errors.nickname?.message}
          />
          <Button
            className="mt-32pxr rounded-[12px] tablet:rounded-[16px] font-sans font-bold text-lg text-white w-full h-48pxr tablet:h-50pxr flex justify-center items-center py-16pxr bg-purple-100"
            type="submit"
          >
            저장하기
          </Button>
        </form>
      </ContentBox>
    </div>
  );
}
