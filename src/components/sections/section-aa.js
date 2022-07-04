import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';

import Modal1 from '../modals/aa-reports-modal';
import Modal2 from '../modals/aa-web-modal';
import Modal3 from '../modals/aa-video-modal';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Section1() {
  return (
    <div id='sectionAA' className="Section">
        <h2>Artrageous Advertising</h2>
        <h4>Dec 2019 - Oct 2020</h4>
        <p className='sectionBodyP'>Advertising agency serving Lethbridge, Alberta with social media management, video production, web development, and graphic design.</p>
        <Grid 
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}>
            <Grid item>
                <Modal1/>
            </Grid>
            <Grid item>
                <Modal2/>
            </Grid>
            <Grid item>
                <Modal3/>
            </Grid>
        </Grid>
    </div>
  );
}



