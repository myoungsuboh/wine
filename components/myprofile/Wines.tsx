"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import DropDown from '../common/DropDown';
import DeleteModal from '../common/DeleteModal';
import { deleteWine } from '@/service/api';
import { formatPrice } from '@/common/utils';
import WineEditModal from './WineEditModal';

interface WinesProps {
  fetchWines: () => void;
  winesData: MY_WINES_DATA[]
}

export default function Wines({ fetchWines, winesData }: WinesProps) {
  const [openDropDownId, setOpenDropDownId] = useState<string | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedWineId, setSelectedWineId] = useState<string | null>(null);

  const handleCancelModal = () => {
    setIsUpdateModalOpen(false);
    setIsDeleteModalOpen(false);
    setOpenDropDownId(null);
    setSelectedWineId(null);
  }

  const handleReviewEdit = (id: string) => {
    setSelectedWineId(id);
    setIsUpdateModalOpen(true);
  };

  const handleReviewDelete = (id: string) => {
    setSelectedWineId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedWineId) return;
    
    try {
      await deleteWine(Number(selectedWineId));
      setIsDeleteModalOpen(false);
      setOpenDropDownId(null);
      setSelectedWineId(null);
      await fetchWines();
    } catch (error) {
      console.error('Error deleting wine:', error);
    }
  };

  const handleDropDown = (id: string) => {
    setOpenDropDownId(openDropDownId === id ? null : id);
  };

  return (
    <div className="w-full flex flex-col gap-2 md:gap-4 mt-4 lg:mt-5">
      {winesData.map((wine) => (
        <div
          key={wine.id}
          className="w-full rounded-2xl border border-solid border-gray-300 bg-white
            h-[187px] py-4 px-5
            md:h-[193px] md:py-6 md:px-10
            lg:h-[202px] relative"
        >
          <div className='flex flex-row gap-10'>
            <div className=" relative w-[150px] h-[150px] overflow-hidden rounded-md">
              {/* TODO: 이미지를 피그마의 의도대로 보여주려면 더 많은 기획이 필요 */}
              <Image
                src={wine.image.includes('http') ? wine.image : 'skeleton/skeleton-wine.svg'}
                alt='wine'
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center gap-4">
                <div className='font-semibold text-gray-800 text-[20px] md:text-[30px] break-words'>
                  {wine.name}
                </div>
                <div className="relative ml-auto">
                  <button onClick={() => handleDropDown(String(wine.id))}>
                    <Image src='/icon/icon-kebab.svg' alt='MORE' width={26} height={26} />
                  </button>
                  {openDropDownId === String(wine.id) && (
                    <DropDown buttons={[
                      { name: '수정하기', onClick: () => handleReviewEdit(String(wine.id)) },
                      { name: '삭제하기', onClick: () => handleReviewDelete(String(wine.id)) },
                    ]} />
                  )}
                </div>
              </div>
              <div className='mt-4 md:mt-5 flex flex-col gap-[10px]'>
                <p className='text-gray-500'>{wine.region}</p>
              </div>
              <div className='max-w-max h-[32px] md:h-[38px] lg:h-[42px] 
                bg-purple-10 flex items-center justify-center rounded-md
                text-purple-100 font-bold px-4
              '>
                ₩ {formatPrice(wine.price)}
              </div>
            </div>
          </div>
        </div>
      ))}
      <DeleteModal
        open={isDeleteModalOpen}
        onClose={handleCancelModal}
        onConfirm={handleConfirmDelete}
      />
      <WineEditModal
        open={isUpdateModalOpen}
        onClose={handleCancelModal}
        onConfirm={fetchWines}
        winesData={winesData.find((wine) => String(wine.id) === selectedWineId)}  
      />
    </div>
  );
}