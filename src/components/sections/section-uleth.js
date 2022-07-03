import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';

import Modal1 from '../modals/modal1';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Section1() {
  return (
    <div id='sectionULETH' className="Section">
        <h2>University of Lethbridge</h2>
        <p>Working at stakefish has been an incredible insight into the development of proof of stake blockchains.</p>
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Modal1/>
            </Grid>
            <Grid item xs={4}>
                <Modal1/>
            </Grid>
            <Grid item xs={4}>
                <Modal1/>
            </Grid>
        </Grid>
    </div>
  );
}



