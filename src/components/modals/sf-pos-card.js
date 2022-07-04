import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import Thumbnail from './thumbnails/sf-pos.webp';

export default function ImgMediaCard() {
  return (
    <div className="cardBG">
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Current Event Videos
        </Typography>
        <Typography variant="body2" color="text.secondary">
          B-weekly educational video series explaining current events in the field of proof of stake. Adobe Character Animator and Adobe After Effects.
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt="Educational video content"
        height="210"
        image={Thumbnail}
      />
    </div>
  );
}
