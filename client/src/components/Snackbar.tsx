import { Dispatch, SetStateAction } from "react";

import { Alert, AlertColor, Snackbar as SnackbarComponent } from "@mui/material";

interface SnackbarProps {
  snackbarState: SnackbarStateProps;
  setSnackbarState: Dispatch<SetStateAction<SnackbarStateProps>>;
  severity: AlertColor;
}

const Snackbar = ({ snackbarState, setSnackbarState, severity }: SnackbarProps) => {
  return (
    <SnackbarComponent
      open={snackbarState.isOpen}
      autoHideDuration={3000}
      onClose={(_event, reason?) => {
        if (reason === "clickaway") return;
        setSnackbarState((snackbarState: SnackbarStateProps) => ({
          ...snackbarState,
          isOpen: false,
        }));
      }}>
      <Alert severity={severity} variant="filled" sx={{ width: "100%" }}>
        {snackbarState.message}
      </Alert>
    </SnackbarComponent>
  );
};

export default Snackbar;
