import './App.css';
import ReactDOM from "react-dom";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';

import SectionBody from './components/sectionBody';
import Navigation from './components/navigation';
import Section1 from './components/sections/section-1';
import MobileNav from './components/mobile-nav';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App() {
  return (
    <div className="App">
      <div className="mobileHeader">
        <div className ="mobileNav">
          <MobileNav />
        </div>
      </div>
      <div className="Navigation">
        <Navigation />
      </div>
      <div className="sectionBody">
        <Section1 />
        <SectionBody />
      </div>
    </div>
  );
}

export default App;
