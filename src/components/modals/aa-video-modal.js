import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Card from './aa-video-card';
import YouTube from '../youtube-embed/aa-youtube-embed';

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
            Video and Social Media
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Managed the content creation for multiple social media clients. Produced video, graphic design, and photographic content for enchanced marketing over Facebook and Instagram.
          </Typography>
          <YouTube />
        </Box>
      </Modal>
    </div>
  );
}
