import * as React from "react";
import "../App.css";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import scrollTo from "gatsby-plugin-smoothscroll";
import IconButton from "@mui/material/IconButton";
import { Twitter, LinkedIn, GitHub, ContactPage } from "@mui/icons-material";

const buttons = [
  <Button onClick={() => scrollTo("#designDao")} key="one">
    Design Dao
  </Button>,
  <Button onClick={() => scrollTo("#cryptech")} key="one">
    Cryptech
  </Button>,
  <Button onClick={() => scrollTo("#ethGlobal")} key="two">
    FS Hack 2022
  </Button>,
  <Button onClick={() => scrollTo("#stakefish")} key="three">
    stakefish
  </Button>
];

const Navigation: React.FC = () => {
  return (
    <>
      <div className="navWrapper navWrapperClose">
        <h2>Logan<br /> Biesterfeldt</h2>
        <div className="nav-icons">
          <IconButton
            onClick={() =>
              window.open("https://twitter.com/1biesterfeldt", "_blank")
            }
            style={{
              background: 'transparent',
              color: 'rgba(0, 74, 116, 1)',
            }}
          >
            <Twitter />
          </IconButton>
          <IconButton
            onClick={() =>
              window.open("https://www.linkedin.com/in/biest/", "_blank")
            }
            style={{
              background: 'transparent',
              color: 'rgba(0, 74, 116, 1)',
            }}
          >
            <LinkedIn />
          </IconButton>
          <IconButton
            onClick={() => window.open("https://github.com/1biest", "_blank")}
            style={{
              background: 'transparent',
              color: 'rgba(0, 74, 116, 1)',
            }}
          >
            <GitHub />
          </IconButton>
        </div>
        <div className="button-group" style={{ paddingTop: "12px" }}>
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical button group"
            variant="text"
            style={{
              background: 'transparent',
              color: 'rgba(0, 74, 116, 1)',
              fontWeight: "600"
            }}
          >
            {buttons}
          </ButtonGroup>
        </div>
      </div>

      <div className="nav-footer navFooterClose">
        {/* <Button
          startIcon={<ContactPage />}
          onClick={() =>
            window.open(
              "https://drive.google.com/file/d/1AwS_CczNhqqmsRkWaFxzTYfP1vN1jTeO/view?usp=sharing",
              "_blank"
            )
          }
          style={{
            background: 'transparent',
            color: 'rgba(0, 74, 116, 1)',
            fontWeight: "600",
            marginBottom: "6px"
          }}
        >
          Resume
        </Button> */}
        <p>
          <a href="&#109;a&#105;l&#116;o&#58;l&#111;&#103;an&#37;&#50;Eb&#105;est&#101;&#37;72%&#54;6eld%74&#64;gmai&#108;&#46;c%&#54;F%&#54;&#68;">
            &#108;ogan&#46;bi&#101;&#115;&#116;&#101;&#114;feldt&#64;gmai&#108;&#46;&#99;o&#109;
          </a>
        </p>
      </div>
    </>
  );
}

export default Navigation;
