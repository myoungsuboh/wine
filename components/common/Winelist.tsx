import React from 'react';
import Image from 'next/image';

interface Wine {
  id: number;
  name: string;
  region: string;
  country: string;
  price: number;
  rating: number;
  image: string;
  description: string;
}

interface WineListProps {
  wines: Wine[];
}

const WineList: React.FC<WineListProps> = ({wines}) => {
  return (
    <div className="flex-grow">
      {wines.map(wine => (
        <div key={wine.id} className="flex flex-col md:flex-row bg-white shadow-md rounded-lg p-4 mb-4">
          <div className="relative w-full md:w-1/3 aspect-w-3 aspect-h-4">
            <Image src={wine.image} alt={wine.name} layout="fill" objectFit="cover" className="rounded-md" priority={wine.id === 1} />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-xl">{wine.name}</h3>
            <p className="text-gray-600">
              {wine.region}, {wine.country}
            </p>
            <p className="text-gray-900 font-bold">₩{wine.price.toLocaleString()}</p>
            <p className="text-yellow-500 font-semibold">⭐ {wine.rating.toFixed(1)}</p>
            <p className="text-gray-600">{wine.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WineList;
