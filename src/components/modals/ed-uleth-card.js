import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import Thumbnail from './thumbnails/ed-uleth.jpg';

export default function ImgMediaCard() {
  return (
    <div className="cardBG">
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          University of Lethbridge
        </Typography>
        <Typography variant="body2" color="text.secondary">
          BFA: New Media, graduated in 2014.
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt="University of Lethbridge"
        height="210"
        image={Thumbnail}
      />
    </div>
  );
}
