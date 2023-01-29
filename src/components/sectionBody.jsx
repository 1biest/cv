
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import SectionHACK from './sections/section-hack';
import SectionPEN from './sections/section-codepen';
import SectionSF from './sections/section-sf';
import SectionAA from './sections/section-aa';
import SectionAG from './sections/section-ag';
import SectionDAG from './sections/section-dag';
import SectionED from './sections/section-ed';
import SectionFOOTER from './sections/section-footer';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App() {
  return (
    <div>
      <SectionHACK />
      <SectionSF />
      <SectionAA />
      <SectionDAG />
      <SectionAG />
      <SectionED />
      <SectionFOOTER />
    </div>
  );
}

export default App;
