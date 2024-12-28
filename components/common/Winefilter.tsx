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

  // 와인 등록 데이터 상태
  const [wineName, setWineName] = useState<string>('');
  const [winePrice, setWinePrice] = useState<number>(0);
  const [wineRegion, setWineRegion] = useState<string>('');
  const [wineTypeToRegister, setWineTypeToRegister] = useState<WineType>('Red');
  const [wineImage, setWineImage] = useState<File | null>(null);

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

  const handleWineRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!wineName || !wineRegion || !winePrice || !wineImage) {
      alert('모든 필드를 정확히 입력하세요.');
      return;
    }

    const formData = new FormData();
    formData.append('name', wineName);
    formData.append('price', String(winePrice));
    formData.append('region', wineRegion);
    formData.append('type', wineTypeToRegister);
    formData.append('image', wineImage);

    try {
      const response = await fetch('https://winereview-api.vercel.app/11-1/wines', {
        method: 'POST',
        headers: {
          Authorization: `Bearer <YOUR_ACCESS_TOKEN>`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error('API Error Details:', errorDetails);
        throw new Error('Failed to register wine');
      }

      const data = await response.json();
      console.log('Wine registered successfully:', data);
      alert('와인이 성공적으로 등록되었습니다.');
      setShowModal(false);

      setWineName('');
      setWinePrice(0);
      setWineRegion('');
      setWineTypeToRegister('Red');
      setWineImage(null);
    } catch (error) {
      console.error('Error registering wine:', error);
      alert('와인 등록에 실패했습니다.');
    }
  };

  return (
    <div className="sticky top-4 bg-white p-6 rounded-lg shadow-md w-full max-w-xs">
      {/* 와인 */}
      <div className="mb-6">
        <h3 className="font-bold text-lg text-gray-800 mb-4">WINE TYPES</h3>
        <div className="flex gap-2">
          {(['Red', 'White', 'Sparkling'] as WineType[]).map(type => (
            <button
              key={type}
              onClick={() => handleWineTypeChange(type)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm ${
                wineType === type ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-800'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* 가격  */}
      <div className="mb-6">
        <h3 className="font-bold text-lg text-gray-800 mb-4">PRICE</h3>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-medium">₩{priceRange[0]}</span>
          <input
            type="range"
            min={0}
            max={74000}
            step={1000}
            value={priceRange[1]}
            onChange={e => handlePriceChange([priceRange[0], parseInt(e.target.value)])}
            className="flex-1"
          />
          <span className="text-gray-600 font-medium">₩{priceRange[1]}</span>
        </div>
      </div>

      {/* 평점 */}
      <div className="mb-6">
        <h3 className="font-bold text-lg text-gray-800 mb-4">RATING</h3>
        <div className="space-y-3">
          {['전체', '4.5 - 5.0', '4.5 - 4.0', '4.0 - 3.5', '3.5 - 3.0'].map(range => (
            <label key={range} className="flex items-center gap-3">
              <input
                type="radio"
                name="rating"
                value={range}
                checked={rating === range}
                onChange={() => handleRatingChange(range)}
                className="form-radio text-purple-600 focus:ring-purple-500"
              />
              <span className="text-gray-700 font-medium">{range}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 와인 등록하기 버튼 */}
      <button onClick={() => setShowModal(true)} className="w-full py-3 mt-6 bg-purple-600 text-white font-bold text-sm rounded-lg">
        와인 등록하기
      </button>

      {/* 와인 등록 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">와인 등록</h2>
            <form onSubmit={handleWineRegister}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">와인 이름</label>
                <input
                  type="text"
                  value={wineName}
                  onChange={e => setWineName(e.target.value)}
                  placeholder="와인 이름 입력"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">가격</label>
                <input
                  type="number"
                  value={winePrice}
                  onChange={e => setWinePrice(Number(e.target.value))}
                  placeholder="가격 입력"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">원산지</label>
                <input
                  type="text"
                  value={wineRegion}
                  onChange={e => setWineRegion(e.target.value)}
                  placeholder="원산지 입력"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">타입</label>
                <select
                  value={wineTypeToRegister}
                  onChange={e => setWineTypeToRegister(e.target.value as WineType)}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="Red">Red</option>
                  <option value="White">White</option>
                  <option value="Sparkling">Sparkling</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">이미지</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setWineImage(e.target.files ? e.target.files[0] : null)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">
                  취소
                </button>
                <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg">
                  등록
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
