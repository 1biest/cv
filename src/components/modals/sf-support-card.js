import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import Thumbnail from './thumbnails/sf-announce.png';

export default function ImgMediaCard() {
  return (
    <div className="cardBG" sx={{  }}>      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Educational Videos
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Introductory videos explaining the unique features and advantages of new procols supported by stakefish.
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt="stakefish supports Evmos"
        height="210"
        image={Thumbnail}
      />
    </div>
  );
}
