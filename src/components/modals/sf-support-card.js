import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function ImgMediaCard() {
  return (
    <Card className='cardBackground' sx={{ backgroundColor: '#eee' }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Educational Videos
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Announcement videos. Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt="stakefish supports Regen network"
        height="210"
        image="https://i.ytimg.com/an_webp/Wh4SFGN1FB4/mqdefault_6s.webp?du=3000&sqp=CIy4g5YG&rs=AOn4CLAb15eO0kJHTow03YkaEzeZgvc4FQ"
      />
    </Card>
  );
}
