import React from 'react';
import Image from 'next/image';

interface ProfileImageProps {
  src: string;
  alt: string;
  size?: number;
  inset?: number; // 테두리가 안으로 들어간 정도
}

// size
// 헤더에서 20, 45, 45
// 프로필에서 60, 80, 164
export default function ProfileImage({src, size = 32, inset = 1}: ProfileImageProps) {
  return (
    <div className="relative" style={{width: size, height: size}}>
      <Image src={src} alt="프로필 이미지" width={size} height={size} className="w-full h-full object-cover rounded-full" />
      <div className="absolute inset-0 rounded-full border border-gray-300" style={{margin: inset}} />
    </div>
  );
} 
