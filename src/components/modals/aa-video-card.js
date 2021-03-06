import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import Thumbnail from './thumbnails/aa-video.png';

export default function ImgMediaCard() {
  return (
    <div className="cardBG">
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Video and Social Media
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Managed the content creation for multiple social media clients.
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt="Artrageous Advertising Video Production"
        height="210"
        image={Thumbnail}
      />
    </div>
  );
}
