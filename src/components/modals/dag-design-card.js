import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import Thumbnail from '../../img/dag-design.png';

export default function ImgMediaCard() {
  return (
    <div className="cardBG">
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Design
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Branding and marketing campaign design for new and used vehicle sales, and fixed operations.
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt="Automotive marketing graphic design"
        height="210"
        image={Thumbnail}
      />
    </div>
  );
}
