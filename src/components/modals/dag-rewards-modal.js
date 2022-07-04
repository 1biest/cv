import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Card from './dag-rewards-card';

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
            Dealer Rewards Program
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Implemented a dealer rewards program by utilizing Appsheet and Google Sheets. The advantage of using a tool such as Appsheet is that it can be a no-code editor for an app for database queries and entries. The tooling enables Google Sheets to operate like SQL tables, allowing them to be easily edited by staff, while allowing complex logic for managing, customers, balances, and orders.
          </Typography>
          <img 
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjAqQ9qP8xQz5aGJIn0mrL_jncVS24Bj7YdpP8he6B_-UdqT-vP_BD5u4ClQtvRWXZTElTi45NCgtVjRB7wZ9UwxaQPQnfmOSwNmKBkO4L1jgS7OeXqe_oow7Vp5SnuM6pjpIV80X_eHgxmqV3Gj-fUmndGVYKQAdfWHEM0zjZOyMSDHUZPi-IP8X2l/s1999/1.%20-%20should%20be%204png.png"
            alt="Appsheet Dashboard"
            />
        </Box>
      </Modal>
    </div>
  );
}