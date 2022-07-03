import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import Tutorials from '../modals/sf-tutorial-modal';
import PoS from '../modals/sf-pos-modal';
import Support from '../modals/sf-support-modal';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Section1() {
  return (
    <div id='sectionSF' className="Section">
        <h2>stakefish/f2pool</h2>
        <p>Working at stakefish has been an incredible insight into the development of proof of stake blockchains.</p>
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Tutorials/>
            </Grid>
            <Grid item xs={4}>
                <PoS/>
            </Grid>
            <Grid item xs={4}>
                <Support/>
            </Grid>
        </Grid>
    </div>
  );
}



