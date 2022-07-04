import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';

import Modal1 from '../modals/dag-desk-modal';
import Modal2 from '../modals/dag-rewards-modal';
import Modal3 from '../modals/dag-dealertv-modal';
import Modal4 from '../modals/dag-design-modal';
import Modal5 from '../modals/dag-video-modal';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Section1() {
  return (
    <div id='sectionDAG' className="Section">
        <h2>Davis Automotive Group</h2>
        <h4>April 2013 - August 2017</h4>
        <p>Starting out of Davis GMC Buick in Lethbridge, Davis Automotive Group was created to be a centralized hub of administrative fuctions for members of the dealer group, featuring IT, BDC, HR, and Marketing departments. As a New Media Administrator for at first Davis GMC Buick, and then later promoted to what was internally referred to as "615". I was responsible for ideation and production of marketing campaigns, video content, web development, and graphic design.</p>
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
            <Grid item>
                <Modal4/>
            </Grid>
            <Grid item>
                <Modal5/>
            </Grid>
        </Grid>
    </div>
  );
}



