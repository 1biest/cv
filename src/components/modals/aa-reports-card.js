import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import Thumbnail from '../../img/aa-report.png';

export default function ImgMediaCard() {
  return (
    <div className="cardBG">
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Analytics and Reporting
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Performance analytics of social media accounts displayed on Google Data Studio reports.
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt="Google Data Studio"
        height="210"
        image={Thumbnail}
      />
    </div>
  );
}
