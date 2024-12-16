import React from 'react';
import Rating from '@mui/material/Rating';
import {Box} from '@mui/material';

interface StarRatingProps {
  value: number;
  text: string;
  layout?: 'row' | 'column';
}

export default function StarRating({value, text, layout = 'row'}: StarRatingProps) {
  return (
    <Box className={`flex ${layout === 'row' ? 'flex-row' : 'flex-col'} items-center gap-2`}>
      <Rating name="simple-controlled" value={value} readOnly />
      <span>{text}</span>
    </Box>
  );
}
