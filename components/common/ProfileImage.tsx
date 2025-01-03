import React, {useState} from 'react';
import Image from 'next/image';
import DropDown from './DropDown';
import {useRouter} from 'next/navigation';
import {useAuthStore} from '@/service/authStore';

interface ProfileImageProps {
  src: string;
  size?: number;
  inset?: number; // 테두리가 안으로 들어간 정도
}

export default function ProfileImage({src, size = 32, inset = 1}: ProfileImageProps) {
  const router = useRouter();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const clearUser = useAuthStore(state => state.clearUser);

  const handleDropDownOpen = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };
  const handleMoveMyPage = () => {
    router.push('/myprofile');
  };
  const handleLogOut = () => {
    clearUser();
    const currentPath = window.location.pathname;
    const isRestricted = /^\/wines\/\d+$/.test(currentPath) || currentPath === '/myprofile';
    if (isRestricted) {
      router.push('/');
    } else {
      router.refresh();
    }
  };

  const dropDownButtons = [
    {name: '마이페이지', onClick: handleMoveMyPage},
    {name: '로그아웃', onClick: handleLogOut},
  ];

  return (
    <div className="relative" style={{width: size, height: size, cursor: 'pointer'}} onClick={handleDropDownOpen}>
      <Image src={src} alt="프로필 이미지" width={size} height={size} className="w-full h-full object-cover rounded-full" />
      <div className="absolute inset-0 rounded-full border border-gray-300" style={{margin: inset}} />
      {isDropDownOpen && (
        <div
          style={{
            position: 'absolute',
            zIndex: 50,
            top: size, // 약간 위로 이동
            left: '100%', // 오른쪽으로 이동
            transform: 'translateX(-50%)',
          }}
        >
          <DropDown buttons={dropDownButtons} />
        </div>
      )}
    </div>
  );
}
