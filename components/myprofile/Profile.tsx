"use client";
import { patchUser } from "@/service/api";
import Image from "next/image";
import { useState } from "react";

interface ProfileProps {
  userData: {
    id: string;
    image: string;
    nickname: string;
    email: string;
  }
}

export default function Profile({userData}:ProfileProps) {
  const SAMPLE = 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  const [inputValue, setInputValue] = useState<string>('');

  const handleNicknameChange = async () => {
    try {
      //TODO: 이미지수정기능에 추가기획, 디자인 필요 
      const response = await patchUser({ image: SAMPLE, nickname: inputValue });
      console.log('User updated:', response);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }
  
  return (
    <div className="profileBox lg:w-[280px] lg:h-[530px] md:w-full md:h-[247px] w-full h-[241px] border rounded-lg p-5 md:px-10 md:py-6 lg:p-5 shadow-sm bg-white ">
      <div className="flex flex-col items-center">
        <div className="w-full flex flex-col md:flex-row lg:flex-col items-center">
          <div className="flex flex-row md:flex-row lg:flex-col items-center w-full">
            <div className="relative lg:w-40 lg:h-40 md:w-20 md:h-20 w-[60px] h-[60px] rounded-full overflow-hidden aspect-square lg:mt-5">
              <Image 
                src={userData.image || '/default-profile.svg'}
                alt="Profile"
                fill
                sizes="(max-width: 768px) 60px, (max-width: 1024px) 80px, 164px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col ml-4 md:ml-4 lg:ml-0 lg:mt-5 lg:text-center">
              <div className="text-lg font-bold text-gray-800 md:mt-0 lg:mt-4">
                {userData.nickname}
              </div>
              <div className="text-lg font-medium text-gray-500 mt-1 md:mt-0 lg:mt-2">
                {userData.email}
              </div>
            </div>
          </div>
        </div>
        <div className="lg:mt-12 w-full md:mt-6 mt-4">
          <div className="text-lg font-medium text-gray-800">닉네임</div>
          <div className="w-full max-w-full flex flex-col md:flex-row lg:flex-col gap-2">
            <input
              placeholder={userData.nickname}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 min-w-0 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleNicknameChange}
              className="rounded-xl bg-[#6A42DB] text-white shrink-0 ml-auto
              lg:w-24 lg:h-[42px]
              md:w-[116px] md:h-[42px]
              w-[89px] h-[42px]"
            >
              변경하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}