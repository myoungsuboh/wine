'use client';

import React from 'react';
import Image from 'next/image';
import StarRating from './StarRating';

interface Wine {
  id: number;
  name: string;
  avgRating?: number;
  image: string;
}

interface WineSliderProps {
  wines: Wine[];
}

const WineSlider: React.FC<WineSliderProps> = ({wines}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handlePrev = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => Math.min(prevIndex + 1, wines.length - 1));
  };

  return (
    <div className="relative w-full overflow-hidden bg-gray-100 rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">이번 달 추천 와인</h2>

      {/* 이전 버튼 */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-3 shadow-md z-10 flex items-center justify-center w-10 h-10"
      >
        <Image src="/arrow-right.svg" alt="Previous" width={20} height={20} />
      </button>

      {/* 다음 버튼 */}
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-3 shadow-md z-10 flex items-center justify-center w-10 h-10"
      >
        <Image src="/slider.svg" alt="Next" width={20} height={20} />
      </button>

      {/* 슬라이더 콘텐츠 */}
      <div
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(-${currentIndex * 247}px)`,
        }}
      >
        {wines.map(wine => (
          <div key={wine.id} className="flex-shrink-0 w-[232px] h-[185px] mx-[7.5px] p-2 bg-white shadow-md rounded-lg flex">
            {/* 이미지 */}
            <div className="relative w-1/3 h-full">
              <Image src={wine.image} alt={wine.name} layout="fill" objectFit="cover" className="rounded-l-lg" />
            </div>
            {/* 텍스트 콘텐츠 */}
            <div className="p-2 w-2/3 flex flex-col justify-center items-start">
              <StarRating
                value={wine.avgRating || 0}
                text={wine.name}
                containerClassName="flex flex-col items-start"
                textClassName="mt-1 text-5xl font-medium text-gray-800"
                starSize="24px"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WineSlider;
