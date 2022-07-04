import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import Modal1 from '../modals/sf-tutorial-modal';
import Modal2 from '../modals/sf-pos-modal';
import Modal3 from '../modals/sf-support-modal';

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
        <h4>Oct 2020 - July 2022</h4>
        <p>f2pool and stakefish are leading service providers for blockchain infrastructure security. Their focus on decentralization and security is well regarded in the open source blockchain development community, and as a member of their marketing team, I promoted and raised awareness to projects in the world of crypto.</p>
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



