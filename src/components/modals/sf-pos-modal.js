import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Card from './sf-pos-card';
import YouTube from '../youtube-embed/sf-pos-youtube-embed';

export default function Modal1() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Box className="cardBodyClick" onClick={handleOpen}>
        <Card />
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="ModalBody">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            PoS Round-Up
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            B-weekly educational video series explaining current events in the field of proof of stake. Adobe Character Animator and Adobe After Effects.
          </Typography>
          <YouTube/>
        </Box>
      </Modal>
    </div>
  );
}
