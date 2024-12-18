'use client';
import MaterialButton from '@mui/material/Button';
import React from 'react';

interface ModalType {
  className?: string;
  style?: object;
  variant?: 'text' | 'contained' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function Button({className, style, variant, size, children, onClick, ...props}: ModalType) {
  return (
    <MaterialButton className={className} sx={style} variant={variant || 'contained'} size={size || 'small'} onClick={onClick} {...props}>
      {children}
    </MaterialButton>
  );
}
