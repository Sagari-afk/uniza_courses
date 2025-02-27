import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Grid2 } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  color: "#000",
  bgcolor: "background.paper",
  border: "2px solid #DAE2ED",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgb(0 0 0 / 0.2)",
  p: 4,
};

export default function ModalCreate({ btn, children }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Box onClick={handleOpen}>{btn}</Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid2 container spacing={4} sx={style}>
          {children}
        </Grid2>
      </Modal>
    </Box>
  );
}
