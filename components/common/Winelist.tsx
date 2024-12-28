import React from 'react';
import Image from 'next/image';

interface Wine {
  id: number;
  name: string;
  region: string;
  country: string;
  price: number;
  rating?: number;
  image: string;
  description: string;
}

interface WineListProps {
  wines: Wine[];
}

const WineList: React.FC<WineListProps> = ({wines}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {wines.map(wine => (
        <div
          key={wine.id}
          className="flex flex-col lg:flex-row items-center bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow duration-300"
        >
          {/* 와인 이미지 */}
          <div className="relative w-full lg:w-1/4 h-[200px] mb-4 lg:mb-0 lg:mr-6">
            <Image src={wine.image} alt={wine.name} layout="fill" objectFit="cover" className="rounded-lg" priority={wine.id === 1} />
          </div>
          {/* 와인 정보 */}
          <div className="flex-grow">
            <h3 className="font-semibold text-lg lg:text-xl mb-2">{wine.name}</h3>
            <p className="text-sm lg:text-base text-gray-600 mb-2">
              {wine.region}, {wine.country}
            </p>
            <p className="text-lg lg:text-xl text-purple-700 font-bold mb-2">₩{wine.price.toLocaleString()}</p>
            <p className="text-sm lg:text-base text-yellow-500 font-medium mb-2">⭐ {wine.rating !== undefined ? wine.rating.toFixed(1) : 'N/A'}</p>
            <p className="text-sm lg:text-base text-gray-500">{wine.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WineList;
