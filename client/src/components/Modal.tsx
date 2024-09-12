import { ReactNode } from "react";

import { Close } from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Modal as MUI_Modal,
  Paper,
  SxProps,
  Typography,
} from "@mui/material";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const ModalStyles: SxProps = {
  display: "flex",
  alignItems: "start",
  justifyContent: "center",
  paddingTop: 4,
  boxSizing: "border-box",
};

const ModalHeaderStyles: SxProps = {
  paddingTop: 1,
  paddingBottom: 1,
  paddingLeft: 2,
  paddingRight: 2,
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const ModalBodyStyles: SxProps = {
  padding: 2,
  boxSizing: "border-box",
  overflowY: "auto",
};

const Modal = ({ open, onClose, title, children }: ModalProps) => {
  return (
    <MUI_Modal open={open} onClose={onClose} sx={ModalStyles}>
      <Paper sx={{ width: 896 }}>
        <Box sx={ModalHeaderStyles}>
          <Typography variant="button">{title}</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={ModalBodyStyles}>{children}</Box>
      </Paper>
    </MUI_Modal>
  );
};

export default Modal;
