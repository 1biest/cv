import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import Thumbnail from './thumbnails/ed-codecademy.png';

export default function ImgMediaCard() {
  return (
    <div className="cardBG">
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Codecademy
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Educational courses and certifications of software development languages.
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt="Codecademy"
        height="210"
        image={Thumbnail}
      />
    </div>
  );
}
