import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import Thumbnail from './thumbnails/dag-video.png';

export default function ImgMediaCard() {
  return (
    <div className="cardBG">
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Video Production
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Motion graphics and videos produced for marketing initiatives at Davis Automotive Group.
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt="Davis Automotive Group video content"
        height="210"
        image={Thumbnail}
      />
    </div>
  );
}
