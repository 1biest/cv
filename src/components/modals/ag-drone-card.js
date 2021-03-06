import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import Thumbnail from './thumbnails/ag-uav.png';

export default function ImgMediaCard() {
  return (
    <div className="cardBG">
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          UAV Remote Sensing
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Remote sensing operations to determine crop viality.
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt="Slantrange Agronomy Data"
        height="210"
        image={Thumbnail}
      />
    </div>
  );
}
