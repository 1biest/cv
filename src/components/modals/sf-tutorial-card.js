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
          Staking Tutorials
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Staking tutorials. Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt="Staking SOL with Solflare wallet"
        height="210"
        image="https://i.ytimg.com/an_webp/8Dz0Vmtw64o/mqdefault_6s.webp?du=3000&sqp=CJjQg5YG&rs=AOn4CLBM3qE00JnQFlCY2HjJhmXgEkZgPw"
      />
    </Card>
  );
}
