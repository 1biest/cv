import Grid from '@mui/material/Grid';
import Anim3d from './Animation';
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div id="hero" className="Section">
      <Grid container spacing={2}>
        <Grid style={{ zIndex: '20' }} item xs={6}>
          <h2>Logan<br /> Biesterfeldt</h2>
          <h4>Blockchain Web3<br /> Motion Graphic Designer<br />CSS Animator<br />Front End Engineer</h4>
        </Grid>
        <Grid item xs={6}>
          <div className="wrapper-3d">
            <Anim3d />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Hero;