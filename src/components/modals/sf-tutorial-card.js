import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import Thumbnail from './thumbnails/sf-tutorial.webp';

export default function ImgMediaCard() {
  return (
    <div className="cardBG" sx={{  }}>      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Staking Tutorials
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Detailed tutorial videos of the techinical steps taken to stake tokens with stakefish using respective wallets and protocols.
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt="Staking SOL with Solflare wallet"
        height="210"
        image={Thumbnail}
      />
    </div>
  );
}
