'use client';
import React from 'react';

interface ModalType {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function Button({className = '', type = 'button', children, onClick}: ModalType) {
  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
