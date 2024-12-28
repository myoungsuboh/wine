'use client';
import React, { useEffect, useState } from 'react';
import MaterialModal from '@mui/material/Modal';
import Image from 'next/image';
import { patchWine } from '@/service/api';

interface WineEditModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  winesData: MY_WINES_DATA | undefined;
}

export default function WineEditModal({ open, onClose, onConfirm, winesData }: WineEditModalProps) {
  const [name, setName] = useState(winesData?.name || '');
  const [region, setRegion] = useState(winesData?.region || '');
  const [image, setImage] = useState(winesData?.image || '');
  const [price, setPrice] = useState(winesData?.price || 0);
  const [avgRating, setAvgRating] = useState(winesData?.avgRating || 0);
  const [type, setType] = useState(winesData?.type || '');

  const handleSubmit = async () => {
    const body = {
      name: name,
      region: region,
      image: image,
      price: price,
      avgRating: avgRating,
      type: type,
    };

    if (winesData?.id) {
      await patchWine(Number(winesData.id), body);
      onClose();
      onConfirm();
    }
  };

  useEffect(() => {
    if (winesData) {
      setName(winesData.name);
      setRegion(winesData.region);
      setImage(winesData.image);
      setPrice(winesData.price);
      setAvgRating(winesData.avgRating);
      setType(winesData.type);
    }
  }, [winesData]);

  return (
    <MaterialModal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-confirmation-modal"
      aria-describedby="edit-confirmation-description"
    >
      <div className="fixed left-1/2 md:top-1/2 md:-translate-y-1/2 -translate-x-1/2 
        w-full h-[93vh] max-h-[1006px] md:w-[528px] bg-white rounded-t-2xl md:rounded-2xl p-4 overflow-auto
        bottom-0 md:bottom-auto md:top-1/2 md:rounded-b-2xl">
        <div className="h-full flex flex-col">
          <header className="flex flex-row justify-between items-center">
            <span className='text-gray-800 font-bold text-[20px] md:text-[24px]'>내가 등록한 와인</span>
            <button onClick={onClose}><Image src='/icon/icon-x.svg' alt='close' width={24} height={24} /></button>
          </header>

          <div className='flex flex-col mt-10 overflow-auto scrollbar-hide'>
            <label className='mb-4 text-gray-800 font-medium text-[14px] md:text-[16px]'>와인 이름</label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='mb-8 p-2 border border-gray-300 rounded-[12px] md:rounded-[16px] outline-none'
              spellCheck='false'
            />

            <label className='mb-4 text-gray-800 font-medium text-[14px] md:text-[16px]'>가격</label>
            <input
              type='number'
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className='mb-8 p-2 border border-gray-300 rounded-[12px] md:rounded-[16px] outline-none'
            />

            <label className='mb-4 text-gray-800 font-medium text-[14px] md:text-[16px]'>원산지</label>
            <input
              type='text'
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className='mb-8 p-2 border border-gray-300 rounded-[12px] md:rounded-[16px] outline-none'
              spellCheck='false'
            />

            <label className='mb-4 text-gray-800 font-medium text-[14px] md:text-[16px]'>타입</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className='mb-8 p-2 border border-gray-300 rounded-[12px] md:rounded-[16px] appearance-none pr-8 outline-none'
              style={{ backgroundImage: 'url(/path/to/arrow-icon.svg)', backgroundPosition: 'right 20px center', backgroundRepeat: 'no-repeat', backgroundColor: 'white', color: 'gray-300' }}
            >
              <option value='Red'>Red</option>
              <option value='White'>White</option>
            </select>

            <label className='mb-4 text-gray-800 font-medium text-[14px] md:text-[16px]'>와인 사진</label>
            <input
              type='text'
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className='mb-8 p-2 border border-gray-300 rounded-[12px] md:rounded-[16px] outline-none'
            />
          </div>

          <footer className="w-full flex gap-2 justify-center h-[54px] mt-auto">
            <button 
              onClick={handleSubmit}
              className="w-full px-4 py-2 bg-purple-100 text-white rounded-lg"
            >
              수정하기
            </button>
          </footer>
        </div>
      </div>
    </MaterialModal>
  );
}