'use client';
import React from 'react';
import MaterialModal from '@mui/material/Modal';

interface ModalType {
  open: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

export default function Modal({open, onClose, children, ...props}: ModalType) {
  return (
    <MaterialModal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" {...props}>
      <>{children}</>
    </MaterialModal>
  );
}
