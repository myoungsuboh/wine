'use client';
import React from 'react';
import MaterialModal from '@mui/material/Modal';

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteModal({ open, onClose, onConfirm }: DeleteModalProps) {
  return (
    <MaterialModal
      open={open}
      onClose={onClose}
      aria-labelledby="delete-confirmation-modal"
      aria-describedby="delete-confirmation-description"
    >
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[353px] h-[182px] bg-white rounded-2xl p-4">
        <div className="h-full flex flex-col justify-between">
          <div className="text-center text-gray-800 font-bold text-[20px] mt-4">정말 삭제하시겠습니까?</div>
          <footer className="w-full flex gap-2 justify-center h-[54px]">
            <button 
              onClick={onClose} 
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-500"
            >
              취소
            </button>
            <button 
              onClick={onConfirm}
              className="w-full px-4 py-2 bg-purple-100 text-white rounded-lg"
            >
              확인
            </button>
          </footer>
        </div>
      </div>
    </MaterialModal>
  );
}