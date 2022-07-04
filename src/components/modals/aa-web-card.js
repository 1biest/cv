import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import Thumbnail from '../../img/aa-web.png';

export default function ImgMediaCard() {
  return (
    <div className="cardBG">
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Web Development
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Managed a library of over 80 websites.
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt="Artrageous web development"
        height="210"
        image={Thumbnail}
      />
    </div>
  );
}
