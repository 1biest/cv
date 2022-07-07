import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import Thumbnail from './thumbnails/codepen-3.png';

export default function ImgMediaCard() {
  return (
    <div className="cardBG">
      <CardMedia
        component="img"
        alt="CodePen"
        height="210"
        image={Thumbnail}
      />
    </div>
  );
}
