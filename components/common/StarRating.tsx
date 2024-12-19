'use client';

import React from 'react';
import Rating from '@mui/material/Rating';
import {Box} from '@mui/material';
import StarIcon from './starIcon';

interface StarRatingProps {
  value: number;
  text: string;
  layout?: 'row' | 'column';
  starSize?: string;
  containerClassName?: string;
  textClassName?: string;
  descriptionClassName?: string;
}

export default function StarRating({
  value,
  text,
  layout = 'row',
  starSize,
  containerClassName = '',
  textClassName = '',
  descriptionClassName = '',
}: StarRatingProps) {
  const containerClass = `flex ${layout === 'row' ? 'flex-row' : 'flex-col'} items-start ${containerClassName}`;
  const textClass = `font-extrabold ${textClassName}`;
  const descriptionClass = `text-gray-500 font-normal ${descriptionClassName}`;

  return (
    <Box className={containerClass}>
      <span className={textClass}>{value}</span>
      <div>
        <Rating
          name="custom-rating"
          value={value}
          readOnly
          emptyIcon={<StarIcon starSize={starSize} fill="#CFDBEA" />}
          icon={<StarIcon starSize={starSize} fill="#6A42DB" />}
        />
        <p className={descriptionClass}>{text}</p>
      </div>
    </Box>
  );
}
