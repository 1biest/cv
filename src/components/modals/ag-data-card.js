import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import Thumbnail from '../../img/jdoc.webp';

export default function ImgMediaCard() {
  return (
    <div className="cardBG">
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Agronomy
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Crop production data, input costs, product applications, and yield maps.
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt="Agronomy data"
        height="210"
        image={Thumbnail}
      />
    </div>
  );
}
