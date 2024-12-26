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
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleWineTypeChange = (type: WineType) => {
    setWineType(type);
    onFilterChange({wineType: type, priceRange, rating});
  };

  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value);
    onFilterChange({wineType, priceRange: value, rating});
  };

  const handleRatingChange = (value: string) => {
    setRating(value);
    onFilterChange({wineType, priceRange, rating: value});
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* 와인 타입*/}
      <div className="mb-4">
        <h3 className="font-bold text-lg mb-2">WINE TYPES</h3>
        <div className="flex space-x-4">
          {(['Red', 'White', 'Sparkling'] as WineType[]).map(type => (
            <button
              key={type}
              onClick={() => handleWineTypeChange(type)}
              className={`py-2 px-4 rounded-lg ${wineType === type ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* 가격 필터 */}
      <div className="mb-4">
        <h3 className="font-bold text-lg mb-2">PRICE</h3>
        <div className="flex items-center space-x-2">
          <span className="text-gray-700">₩ {priceRange[0]}</span>
          <input
            type="range"
            min={0}
            max={74000}
            step={1000}
            value={priceRange[1]}
            onChange={e => handlePriceChange([priceRange[0], parseInt(e.target.value)])}
            className="w-full"
          />
          <span className="text-gray-700">₩ {priceRange[1]}</span>
        </div>
      </div>

      {/* 평점 */}
      <div className="mb-4">
        <h3 className="font-bold text-lg mb-2">RATING</h3>
        <div className="space-y-2">
          {['전체', '4.5 - 5.0', '4.5 - 4.0', '4.0 - 3.5', '3.5 - 3.0'].map(range => (
            <label key={range} className="flex items-center space-x-2">
              <input
                type="radio"
                name="rating"
                value={range}
                checked={rating === range}
                onChange={() => handleRatingChange(range)}
                className="text-purple-600"
              />
              <span className="text-gray-700">{range}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 와인 등록하기*/}
      <button onClick={() => setShowModal(true)} className="w-full py-2 mt-4 bg-purple-600 text-white rounded-lg">
        와인 등록하기
      </button>

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">와인 등록</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">와인 이름</label>
                <input type="text" placeholder="와인 이름 입력" className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">가격</label>
                <input type="number" placeholder="가격 입력" className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">원산지</label>
                <input type="text" placeholder="원산지 입력" className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">타입</label>
                <select className="w-full px-3 py-2 border rounded-lg">
                  <option value="Red">Red</option>
                  <option value="White">White</option>
                  <option value="Sparkling">Sparkling</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">
                  취소
                </button>
                <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg">
                  와인 등록하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WineFilter;
