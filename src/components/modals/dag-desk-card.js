import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import Thumbnail from '../../img/dag-letter.jpg';

export default function ImgMediaCard() {
  return (
    <div className="cardBG">
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Desk of the Dealer
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Direct mail campaign utilizing existing customer databases
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
