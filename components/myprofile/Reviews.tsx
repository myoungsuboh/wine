"use client";

import { timeAgo } from '@/common/utils';
import Image from 'next/image';
import React, { useState } from 'react';
import DropDown from '../common/DropDown';
import DeleteModal from '../common/DeleteModal';
import ReviewEditModal from './ReviewEditModal';
import { deleteReview } from '@/service/api';

interface ReviewsProps {
  fetchReviews: () => void;
  reviewsData: MY_REVIEWS_DATA[]
}

export default function Reviews({ fetchReviews, reviewsData }: ReviewsProps) {
  const [openDropDownId, setOpenDropDownId] = useState<string | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);

  const handleCancelModal = () => {
    setIsUpdateModalOpen(false);
    setIsDeleteModalOpen(false);
    setOpenDropDownId(null);
    setSelectedReviewId(null);
  }

  const handleReviewEdit = (id: string) => {
    setSelectedReviewId(id);
    setIsUpdateModalOpen(true);
  };

  const handleReviewDelete = (id: string) => {
    setSelectedReviewId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if(!selectedReviewId) return;
    //TODO: status 에러 핸들링
    deleteReview(Number(selectedReviewId));
    setIsDeleteModalOpen(false);
    setOpenDropDownId(null);
    setSelectedReviewId(null);
    fetchReviews()
  };

  const handleDropDown = (id: string) => {
    setOpenDropDownId(openDropDownId === id ? null : id);
  };

  return (
    <div className="w-full flex flex-col gap-2 md:gap-4 mt-4 lg:mt-5">
      {reviewsData.map((review) => (
        <div
          key={review.id}
          className="w-full rounded-2xl border border-solid border-gray-300 bg-white
            h-[187px] py-4 px-5
            md:h-[193px] md:py-6 md:px-10
            lg:h-[202px]"
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <div className='w-[60px] h-[32px] md:w-[80px] md:h-[38px] lg:w-[80px] lg:h-[42px] 
                bg-purple-10 flex items-center justify-center rounded-md
                text-purple-100 font-bold 
              '>
                <Image 
                  src='/icon/icon-star.svg' 
                  alt='STAR' 
                  width={16} 
                  height={16} 
                  className="md:w-5 md:h-5 lg:w-5 lg:h-5"
                />
                {review.rating.toFixed(1)}
              </div>
              <span className='text-gray-500'>{timeAgo(review.updatedAt)}</span>
              <div className="relative ml-auto">
                <button onClick={() => handleDropDown(review.id)}>
                  <Image src='/icon/icon-kebab.svg' alt='MORE' width={26} height={26} />
                </button>
                {openDropDownId === review.id && (
                  <DropDown buttons={[
                    { name: '수정하기', onClick: () => handleReviewEdit(review.id) },
                    { name: '삭제하기', onClick: () => handleReviewDelete(review.id) },
                  ]} />
                )}
              </div>
            </div>
            <div className='mt-4 md:mt-5 flex flex-col gap-[10px]'>
              <p className='text-gray-500'>{review.wine.name}</p>
              <p className=''>{review.content}</p>
            </div>
          </div>
        </div>
      ))}
      <DeleteModal
        open={isDeleteModalOpen}
        onClose={handleCancelModal}
        onConfirm={handleConfirmDelete}
      />
      <ReviewEditModal
        open={isUpdateModalOpen}
        onClose={handleCancelModal}
        onConfirm={fetchReviews}
        reviewsData={reviewsData.find((review) => review.id === selectedReviewId)}
      />
    </div>
  );
}