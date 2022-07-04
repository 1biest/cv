import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import Thumbnail from './thumbnails/ag-appsheet.jpg';

export default function ImgMediaCard() {
  return (
    <div className="cardBG">
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Appsheet Mobile Application
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Appsheet development for tracking status of assets at geographical locations.
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt="Staking SOL with Solflare wallet"
        height="210"
        image={Thumbnail}
      />
    </div>
  );
}
