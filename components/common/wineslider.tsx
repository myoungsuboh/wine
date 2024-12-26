'use client';

import React from 'react';
import {Box, Card, CardContent, CardMedia, Typography, Grid, Button} from '@mui/material';
import {ArrowBack, ArrowForward} from '@mui/icons-material';
import {useState} from 'react';

interface Wine {
  id: number;
  name: string;
  rating: number;
  image: string;
}

interface WineSliderProps {
  wines: Wine[];
}

const WineSlider: React.FC<WineSliderProps> = ({wines}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? wines.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex === wines.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <Box position="relative" width="100%" overflow="hidden">
      {/* 슬라이더 컨트롤 */}
      <Button
        onClick={handlePrev}
        variant="contained"
        color="primary"
        sx={{position: 'absolute', top: '50%', left: '10px', zIndex: 1, transform: 'translateY(-50%)'}}
      >
        <ArrowBack />
      </Button>
      <Button
        onClick={handleNext}
        variant="contained"
        color="primary"
        sx={{position: 'absolute', top: '50%', right: '10px', zIndex: 1, transform: 'translateY(-50%)'}}
      >
        <ArrowForward />
      </Button>

      {/* 슬라이더 콘텐츠 */}
      <Grid
        container
        spacing={2}
        sx={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: 'transform 0.5s ease',
          width: `${wines.length * 100}%`,
        }}
      >
        {wines.map(wine => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={wine.id} sx={{flexShrink: 0}}>
            <Card sx={{maxWidth: 300, margin: 'auto'}}>
              <CardMedia component="img" height="200" image={wine.image} alt={wine.name} />
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {wine.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ⭐ {wine.rating.toFixed(1)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WineSlider;
