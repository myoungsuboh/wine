'use client';

import React, {useState} from 'react';

type WineType = 'Red' | 'White' | 'Sparkling';

interface FilterProps {
  onFilterChange: (filters: {wineType: WineType; priceRange: [number, number]; rating: string}) => void;
}

const WineFilter: React.FC<FilterProps> = ({onFilterChange}) => {
  const [wineType, setWineType] = useState<WineType>('White');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 74000]);
  const [rating, setRating] = useState<string>('전체');

  const handleFilterChange = () => {
    onFilterChange({wineType, priceRange, rating});
  };

  const handleWineTypeChange = (type: WineType) => {
    setWineType(type);
    handleFilterChange();
  };

  const handlePriceChange = (value: number) => {
    setPriceRange([priceRange[0], value]);
    handleFilterChange();
  };

  const handleRatingChange = (value: string) => {
    setRating(value);
    handleFilterChange();
  };

  return (
    <div className="sticky top-4 bg-white p-6 w-full max-w-xs">
      <div className="mb-6">
        <h3 className="font-bold text-lg text-gray-800 mb-4">WINE TYPES</h3>
        <div className="flex gap-2">
          {['Red', 'White', 'Sparkling'].map(type => (
            <button
              key={type}
              onClick={() => handleWineTypeChange(type as WineType)}
              className={`flex-1 py-2 px-4 text-center font-medium text-sm border rounded-full ${
                wineType === type ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-800 border-gray-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <h3 className="font-bold text-lg text-gray-800 mb-4">PRICE</h3>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-medium">₩{priceRange[0]}</span>
          <input
            type="range"
            min={0}
            max={100000}
            step={1000}
            value={priceRange[1]}
            onChange={e => handlePriceChange(Number(e.target.value))}
            className="flex-1"
          />
          <span className="text-gray-600 font-medium">₩{priceRange[1]}</span>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="font-bold text-lg text-gray-800 mb-4">RATING</h3>
        <div className="space-y-3">
          {['전체', '4.5 - 5.0', '4.5 - 4.0', '4.0 - 3.5', '3.5 - 3.0'].map(range => (
            <label key={range} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={range}
                checked={rating === range}
                onChange={() => handleRatingChange(range)}
                className="hidden"
              />
              <div className={`w-5 h-5 flex items-center justify-center rounded-md border ${rating === range ? 'bg-white' : 'bg-white'}`}>
                {rating === range && <div className="w-2.5 h-2.5 rounded-sm bg-purple-600"></div>}
              </div>
              <span className="text-gray-700 font-medium">{range}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WineFilter;
