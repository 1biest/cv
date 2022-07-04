import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';

import Modal1 from '../modals/ed-uleth-modal';
import Modal2 from '../modals/ed-codecademy-modal';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Section1() {
  return (
    <div id='sectionED' className="Section">
        <h2>Education</h2>
        <p>I recieved a BFA: New Media from the University of Lethbridge. The program introduced concepts such as graphic design, video production, 3d modeling, and web development. I am continuing to gain certifications in programming with Codecademy.</p>
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
        </Grid>
    </div>
  );
}



