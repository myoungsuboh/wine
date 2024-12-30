'use client';
import React from 'react';

interface Props {
  content: string;
}

export default function EmptyContent({ content }: Props) {
  return (
    <div className="flex h-[187px] bg-white rounded-lg justify-center items-center text-gray-400 border border-solid border-gray-300">
      {content} 없습니다. . . 😢
    </div>
  );
}