import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';

import Anim3d from '../3d-animation';
import Modal1 from '../modals/s1-video-modal';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Section1() {
  return (
    <div id="section1" className="Section">
        <Grid container spacing={2}>
            <Grid style={{zIndex: '20'}} item xs={6}>
              <h2>Logan<br /> Biesterfeldt</h2>
              <h4>Blockchain Web3<br /> Motion Graphic Designer<br />CSS Animator<br />Front End Engineer</h4>
              <Modal1 />
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



