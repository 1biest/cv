import * as React from 'react';
import '../App.css';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import scrollTo from 'gatsby-plugin-smoothscroll';
import IconButton from '@mui/material/IconButton';
import { Twitter, LinkedIn, GitHub, ContactPage } from '@mui/icons-material';

import ProfilePhoto from './profilePhoto';

const buttons = [
    <Button onClick={() => scrollTo("#sectionPEN")} key="one">CodePen</Button>,
    <Button onClick={() => scrollTo("#sectionSF")} key="one">stakefish/f2pool</Button>,
    <Button onClick={() => scrollTo("#sectionAA")} key="two">Artrageous Advertising</Button>,
    <Button onClick={() => scrollTo("#sectionDAG")} key="three">Davis Automotive Group</Button>,
    <Button onClick={() => scrollTo("#sectionAG")} key="four">Agriculture</Button>,
    <Button onClick={() => scrollTo("#sectionED")} key="five">Education</Button>,
];


export default function ImgMediaCard() {
  return (
    <> 
        <div className="navWrapper navWrapperClose">
            <div style={{cursor: 'pointer'}} onClick={() => scrollTo("#section1")} ><ProfilePhoto /></div>
            <h2 className="nameTitle">Logan<br></br> Biesterfeldt</h2>
            <p className="nameSubtitle"></p>
        
            <IconButton color="primary">
                <Twitter onClick={()=> window.open("https://twitter.com/1biesterfeldt", "_blank")}>Twitter</Twitter>
            </IconButton>
            <IconButton color="primary">
                <LinkedIn onClick={()=> window.open("https://www.linkedin.com/in/biest/", "_blank")} />
            </IconButton>
            <IconButton color="primary">
                <GitHub onClick={()=> window.open("https://github.com/1biest", "_blank")} />
            </IconButton>
            <div style={{height:"12px"}} />
            <ButtonGroup
                orientation="vertical"
                aria-label="vertical button group"
                variant="text"
            >
                {buttons}
            </ButtonGroup>
        </div>

        <div className="navFooter navFooterClose">
            <Button variant="outlined" style={{ fontWeight: '600', marginBottom: '18px'}} startIcon={<ContactPage />} onClick={() => window.open("https://drive.google.com/file/d/1AwS_CczNhqqmsRkWaFxzTYfP1vN1jTeO/view?usp=sharing", "_blank")}>Download CV</Button>
            <h4>Phone</h4>
            <p><a href="tel:1-403-795-3929">+1 (403) 795-3929</a></p>
            <h4>Email</h4>
            <p><a href='&#109;a&#105;l&#116;o&#58;l&#111;&#103;an&#37;&#50;Eb&#105;est&#101;&#37;72%&#54;6eld%74&#64;gmai&#108;&#46;c%&#54;F%&#54;&#68;'>&#108;ogan&#46;bi&#101;&#115;&#116;&#101;&#114;feldt&#64;gmai&#108;&#46;&#99;o&#109;</a></p>
            <h4>Location</h4>
            <p>Calgary, Canada</p>
            
        </div>
    </>
  );
}
