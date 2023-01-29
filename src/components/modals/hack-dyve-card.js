import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import Thumbnail from '../../img/dag-dealertv.png';

export default function ImgMediaCard() {
  return (
    <div className="cardBG">
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          DealerTV
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Remotely managed 30+ displays across 8 dealership locations.
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt="DealerTV Digital Signage Management System"
        height="210"
        image={Thumbnail}
      />
    </div>
  );
}
