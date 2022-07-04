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
          The DealerTV digital signage management system was created to manage 30+ displays across 8 dealership locations. The objective was to centrally manage the distribution of advertising content across the network of dealerships.
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
