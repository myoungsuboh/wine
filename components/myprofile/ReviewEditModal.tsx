'use client';
import React, { useEffect, useState } from 'react';
import MaterialModal from '@mui/material/Modal';
import Image from 'next/image';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import { patchReview } from '@/service/api';

interface ReviewEditModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  reviewsData: MY_REVIEWS_DATA | undefined;
}

const CustomSlider = styled(Slider)({
  color: '#6A42DB', // purple-100
  '& .MuiSlider-thumb': {
    backgroundColor: '#6A42DB', // purple-100
  },
  '& .MuiSlider-track': {
    backgroundColor: '#6A42DB', // purple-100
  },
  '& .MuiSlider-rail': {
    backgroundColor: '#D1D5DB', // gray-300
  },
});

export default function ReviewEditModal({ open, onClose, onConfirm, reviewsData }: ReviewEditModalProps) {
  const wineImgSrc = reviewsData?.wine?.image.includes('http') ? reviewsData.wine.image : '/skeleton/skeleton-wine.svg';
  const [rating, setRating] = useState(reviewsData?.rating || 0);
  const fullStars = Math.floor(rating);
  const [lightBold, setLightBold] = useState(reviewsData?.lightBold || 0);
  const [smoothTannic, setSmoothTannic] = useState(reviewsData?.smoothTannic || 0);
  const [drySweet, setDrySweet] = useState(reviewsData?.drySweet || 0);
  const [softAcidic, setSoftAcidic] = useState(reviewsData?.softAcidic || 0);
  const [content, setContent] = useState(reviewsData?.content || '');
  const [selectedAromas, setSelectedAromas] = useState(reviewsData?.aroma || []);

  const wineTasteArray = [
    { name: '바디감', value: lightBold, setValue: setLightBold, leftStat: '가벼워요', rightStat: '진해요' },
    { name: '타닌', value: smoothTannic, setValue: setSmoothTannic, leftStat: '부드러워요', rightStat: '떫어요' },
    { name: '당도', value: drySweet, setValue: setDrySweet, leftStat: '드라이해요', rightStat: '달아요' },
    { name: '산미', value: softAcidic, setValue: setSoftAcidic, leftStat: '안셔요', rightStat: '많이셔요' },
  ];

  const wineAromaArray = [
    { name: '체리', value: 'CHERRY' },
    { name: '베리', value: 'BERRY' },
    { name: '오크', value: 'OAK' },
    { name: '바닐라', value: 'VANILLA' },
    { name: '후추', value: 'PEPPER' },
    { name: '제빵', value: 'BAKERY' },
    { name: '풀', value: 'GRASS' },
    { name: '사과', value: 'APPLE' },
    { name: '복숭아', value: 'PEACH' },
    { name: '시트러스', value: 'CITRUS' },
    { name: '트로피컬', value: 'TROPICAL' },
    { name: '미네랄', value: 'MINERAL' },
    { name: '꽃', value: 'FLORAL' },
    { name: '담뱃잎', value: 'TOBACCO' },
    { name: '흙', value: 'EARTH' },
    { name: '초콜릿', value: 'CHOCOLATE' },
    { name: '스파이스', value: 'SPICE' },
    { name: '카라멜', value: 'CARAMEL' },
    { name: '가죽', value: 'LEATHER' }
  ];

  const handleAromaClick = (value: string) => {
    setSelectedAromas(prev => {
      if (prev.includes(value)) {
        return prev.filter(aroma => aroma !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleSubmit = async () => {
    const body = {
      rating: rating,
      lightBold: lightBold,
      smoothTannic: smoothTannic,
      drySweet: drySweet,
      softAcidic: softAcidic,
      aroma: selectedAromas,
      content: content
    };

    if (reviewsData?.id) {
      await patchReview(Number(reviewsData.id), body);
      onClose();
      onConfirm();
    }
  };

  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  useEffect(() => {
    if (reviewsData) {
      setLightBold(Number(reviewsData.lightBold) || 0);
      setSmoothTannic(Number(reviewsData.smoothTannic) || 0);
      setDrySweet(Number(reviewsData.drySweet) || 0);
      setSoftAcidic(Number(reviewsData.softAcidic) || 0);
      setContent(reviewsData.content || '');
      setSelectedAromas(reviewsData.aroma || []);
      setRating(reviewsData.rating || 0);
    }
  }, [reviewsData]);

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
            <span className='text-gray-800 font-bold text-[20px] md:text-[24px]'>수정하기</span>
            <button onClick={onClose}><Image src='/icon/icon-x.svg' alt='close' width={24} height={24} /></button>
          </header>

          <div className='flex flex-col mt-12 overflow-auto scrollbar-hide'>
            <div className='flex flex-row gap-4 items-center'>
              <div className="w-[68px] h-[68px] overflow-hidden rounded-lg">
                <Image src={wineImgSrc} alt='wine' width={68} height={68} className="object-cover" />
              </div>
              <div>
                <span className="text-[16px] lg:text-[18px] text-gray-800 font-bold">
                  {reviewsData?.wine?.name}
                </span>
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <Image
                      key={index}
                      src={index < fullStars ? '/icon/icon-star.svg' : '/icon/icon-star-gray.svg'}
                      alt='star'
                      width={24}
                      height={24}
                      className="object-cover cursor-pointer"
                      onClick={() => handleStarClick(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6">
              <textarea
                className="w-full h-[120px] rounded-lg p-4 border border-gray-300 outline-none resize-none"
                placeholder="후기를 작성해주세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="mt-7">
              <div className='font-bold text-[18px] md:text-[20px]'>와인의 맛은 어땠나요?</div>
              {wineTasteArray.map((a, i) => (
                <div className='mt-4 flex items-center gap-4' key={i}>
                  <div className='flex justify-center items-center w-[48px] h-[24px] bg-gray-100 text-[12px] text-gray-500 rounded-[6px]'>{a.name}</div>
                  <div className='flex justify-between w-full items-center gap-3'>
                    <span className='text-[14px] text-gray-800 w-[62px]'>{a.leftStat}</span>
                    <CustomSlider
                      value={a.value}
                      onChange={(_, newValue) => a.setValue(newValue as number)}
                      step={1}
                      min={0}
                      max={5}
                      valueLabelDisplay="auto"
                      className="flex-1"
                    />
                    <span className='text-[14px] text-gray-800 w-[62px] text-right'>{a.rightStat}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className='font-bold text-[18px] md:text-[20px] mt-10'>기억에 남는 향이 있나요?</div>
            <div className='flex flex-row flex-wrap gap-2 mt-6 mb-10'>
              {wineAromaArray.map((aroma) => (
                <button
                  key={aroma.value}
                  onClick={() => handleAromaClick(aroma.value)}
                  className={`px-4 py-2 rounded-full ${
                    selectedAromas.includes(aroma.value)
                    ? 'bg-purple-100 text-white'
                    : 'bg-white border border-gray-300 text-gray-800'
                  }`}
                >
                  {aroma.name}
                </button>
              ))}
            </div>
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