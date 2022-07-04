import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Card from './sf-support-card';
import YouTube from '../youtube-embed/sf-youtube-embed';

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
            Protocol Announcements
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Introductory videos explaining the unique features and advantages of new procols supported by stakefish.
          </Typography>
          <YouTube/>
        </Box>
      </Modal>
    </div>
  );
}
