import React from 'react';
import Image from 'next/image';

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
    setCurrentIndex(prevIndex => (prevIndex === 0 ? wines.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex === wines.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full overflow-hidden bg-gray-50 rounded-lg p-4 shadow-md">
      {/* 이전 버튼 */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-purple-600 text-white rounded-full p-2 shadow-md z-10"
      >
        &lt;
      </button>

      {/* 다음 버튼 */}
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-purple-600 text-white rounded-full p-2 shadow-md z-10"
      >
        &gt;
      </button>

      {/* 슬라이더 콘텐츠 */}
      <div
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          width: `${wines.length * 100}%`,
        }}
      >
        {wines.map(wine => (
          <div key={wine.id} className="flex-shrink-0 w-[232px] h-[185px]mx-auto p-4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden w-[228px]">
              {/* 이미지 */}
              <div className="relative w-full h-[200px]">
                <Image src={wine.image} alt={wine.name} layout="fill" objectFit="cover" className="rounded-t-lg" />
              </div>
              {/* 텍스트 콘텐츠 */}
              <div className="p-2 text-center">
                <h3 className="font-semibold text-sm">{wine.name}</h3>
                <p className="text-gray-600 text-sm">⭐ {wine.avgRating !== undefined ? wine.avgRating.toFixed(1) : 'N/A'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WineSlider;
