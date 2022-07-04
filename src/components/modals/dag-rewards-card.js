import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import Thumbnail from './thumbnails/appsheet.svg';

export default function ImgMediaCard() {
  return (
    <div className="cardBG">
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Dealer Rewards Program
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Implemented a dealer rewards program by utilizing Appsheet and Google Sheets.
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt="Dealer Rewards"
        height="210"
        image={Thumbnail}
      />
    </div>
  );
}
