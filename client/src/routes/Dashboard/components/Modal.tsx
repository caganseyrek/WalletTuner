import { ReactNode } from "react";

import { Close } from "@mui/icons-material";
import { Box, Divider, IconButton, Modal as MUI_Modal, Paper, Typography } from "@mui/material";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal = ({ open, onClose, title, children }: ModalProps) => {
  return (
    <MUI_Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "start",
        justifyContent: "center",
        paddingTop: 4,
        boxSizing: "border-box",
      }}>
      <Paper sx={{ width: 896 }}>
        <Box
          sx={{
            paddingTop: 1,
            paddingBottom: 1,
            paddingLeft: 2,
            paddingRight: 2,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <Typography variant="button">{title}</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <Divider />
        <Box
          sx={{
            padding: 2,
            boxSizing: "border-box",
            overflowY: "auto",
          }}>
          {children}
        </Box>
      </Paper>
    </MUI_Modal>
  );
};

export default Modal;
