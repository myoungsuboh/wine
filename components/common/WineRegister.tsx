'use client';

import React, {useState} from 'react';
import {registerWine} from '@/service/wineservice';

type WineType = 'Red' | 'White' | 'Sparkling';

interface WineRegisterModalProps {
  onClose: () => void;
}

const WineRegisterModal: React.FC<WineRegisterModalProps> = ({onClose}) => {
  const [wineName, setWineName] = useState<string>('');
  const [winePrice, setWinePrice] = useState<number>(0);
  const [wineRegion, setWineRegion] = useState<string>('');
  const [wineType, setWineType] = useState<WineType>('Red');
  const [wineImage, setWineImage] = useState<File | null>(null);

  const handleWineRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!wineName || !wineRegion || !winePrice || !wineImage) {
      alert('모든 필드를 정확히 입력하세요.');
      return;
    }

    try {
      await registerWine({
        name: wineName.trim(),
        region: wineRegion.trim(),
        price: winePrice,
        type: wineType,
        image: wineImage,
      });

      alert('와인이 성공적으로 등록되었습니다.');
      onClose();
    } catch (error) {
      console.error('Error registering wine:', error);
      alert('와인 등록 실패');
    }
  };

  return (
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
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="와인 이름 입력"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">가격</label>
            <input
              type="number"
              value={winePrice}
              onChange={e => setWinePrice(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="가격 입력"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">원산지</label>
            <input
              type="text"
              value={wineRegion}
              onChange={e => setWineRegion(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="원산지 입력"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">타입</label>
            <select value={wineType} onChange={e => setWineType(e.target.value as WineType)} className="w-full px-3 py-2 border rounded-lg">
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
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">
              취소
            </button>
            <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg">
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WineRegisterModal;
