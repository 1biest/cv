import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Card from './ag-appsheet-card';
import Image from '../../img/ag-appsheet.png';

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
            Appsheet Mobile Application
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Appsheet development for tracking status of assets at geographical locations, purchase orders, and inventory management.
          </Typography>
          <img width={'100%'} src={Image} />
        </Box>
      </Modal>
    </div>
  );
}
