import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Card from './aa-web-card';
import Image from '../../img/aa-web.png';

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
            Web Development
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Among upkeep of the library of over 80 sites, I was the primary developer on a handful of new builds during my time at Artrageous. Here is a website upgrade that I managed for Canadian Mortgage Professionals:
          </Typography>
          <img width={'100%'} style={{paddingTop: "20px"}} src={Image} />
        </Box>
      </Modal>
    </div>
  );
}
