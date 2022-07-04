import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Card from './ag-drone-card';
import YouTube from '../youtube-embed/ag-youtube-embed';

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
            UAV Remote Sensing
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Utilizing a DJI Matrice 210 and a Slantrange multispectral sensor, we conducted remote sensing operations to determine crop viality to inform decision making on agricultural operations.
          </Typography>
          <YouTube/>
        </Box>
      </Modal>
    </div>
  );
}
