import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Grid2, Stack } from "@mui/material";
import PrimaryBtn from "../core.components/PrimaryBtn";
import SecundaryBtn from "../core.components/SecundaryBtn";

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

export default function ModalCreate({
  btn,
  children,
  handleSubmitModal,
  submitBtnText,
  submitModalFuncParams,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Box
        onClick={(e) => {
          e.stopPropagation();
          handleOpen();
        }}
      >
        {btn}
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid2 container spacing={4} sx={style}>
          {children}
          <Box
            display={"flex"}
            direction={"row"}
            justifyContent={"space-between"}
            width={"100%"}
            gap={1}
          >
            <PrimaryBtn
              onClick={(e) => {
                if (submitModalFuncParams)
                  handleSubmitModal(e, ...submitModalFuncParams);
                else handleSubmitModal(e);
                handleClose();
              }}
            >
              {submitBtnText}
            </PrimaryBtn>
            <SecundaryBtn style={{ width: "50%" }} onClick={handleClose}>
              Zatvoriť
            </SecundaryBtn>
          </Box>
        </Grid2>
      </Modal>
    </Box>
  );
}
