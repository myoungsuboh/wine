import React from 'react';
import Image from 'next/image';
import StarRating from './StarRating';

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
    <div className="space-y-6">
      {wines.map(wine => (
        <div key={wine.id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-200 w-full">
          <div className="flex flex-col lg:flex-row items-start lg:items-center mb-4">
            <div className="relative w-full lg:w-1/5 h-[200px] mb-4 lg:mb-0 lg:mr-6">
              <Image src={wine.image} alt={wine.name} layout="fill" objectFit="cover" className="rounded-md" priority={wine.id === 1} />
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg lg:text-xl">{wine.name}</h3>
                <StarRating value={wine.rating || 0} text="" layout="column" textClassName="text-5xl font-bold text-gray-800" starSize="24px" />
              </div>
              <p className="text-sm text-gray-500 mb-1">
                {wine.region}, {wine.country}
              </p>
              <p className="text-lg font-bold bg-purple-400 text-purple-100 px-3 py-1 rounded-lg inline-block">₩{wine.price.toLocaleString()}</p>
            </div>
          </div>
          <div className="border-t border-gray-300 pt-4">
            <p className="text-sm text-gray-400 mb-2 font-medium">최신 후기</p>
            <p className="text-sm text-gray-600">{wine.description || '후기가 없습니다.'}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WineList;

