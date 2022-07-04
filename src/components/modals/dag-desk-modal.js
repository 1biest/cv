import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Card from './dag-desk-card';
import Image from '../../img/dag-letter.jpg';


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
            Desk of the Dealer
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Direct mail campaign utilizing existing customer databases to send an offer to trade in their vehicle for a new purchase. Created with Photoshop and Microsoft Word with dynamically filled fields to appear hand written. Over 20,000 letters were sent out during the campaign.
          </Typography>
          <img width={'100%'} src={Image} />
        </Box>
      </Modal>
    </div>
  );
}
