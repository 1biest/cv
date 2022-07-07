
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import SectionTOP from './sections/section-top';
import SectionPEN from './sections/section-codepen';
import SectionSF from './sections/section-sf';
import SectionAA from './sections/section-aa';
import SectionAG from './sections/section-ag';
import SectionDAG from './sections/section-dag';
import SectionED from './sections/section-ed';

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
      <SectionPEN />
      <SectionSF />
      <SectionAA />
      <SectionDAG />
      <SectionAG />
      <SectionED />
    </div>
  );
}

export default App;
