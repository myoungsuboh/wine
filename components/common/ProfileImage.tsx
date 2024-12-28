import React, { useState } from 'react';
import Image from 'next/image';
import DropDown from './DropDown';
import { useRouter } from 'next/navigation';

interface ProfileImageProps {
  src: string;
  size?: number;
  inset?: number; // 테두리가 안으로 들어간 정도
}

// size
// 헤더에서 20, 45, 45
// 프로필에서 60, 80, 164
export default function ProfileImage({src, size = 32, inset = 1}: ProfileImageProps) {
  const router = useRouter()
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)

  const handleDropDownOpen = () => {
    setIsDropDownOpen(!isDropDownOpen)
  }
  const handleMoveMyPage = () => {
    router.push('/myprofile')
  }
  const handleLogOut = () => {
    //TODO: 로그아웃 기능 연결
    console.log('log out')
  }

  const dropDownButtons = [
    { name: '마이페이지', onClick: handleMoveMyPage },
    { name: '로그아웃', onClick: handleLogOut },
  ];

  return (
    <div className="relative" style={{width: size, height: size, cursor: 'pointer'}} onClick={handleDropDownOpen}>
      <Image src={src} alt="프로필 이미지" width={size} height={size} className="w-full h-full object-cover rounded-full" />
      <div className="absolute inset-0 rounded-full border border-gray-300" style={{margin: inset}} />
      {
        isDropDownOpen && <DropDown buttons={dropDownButtons} />
      }
    </div>
  ); 
} 