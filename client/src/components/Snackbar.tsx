import { Dispatch, SetStateAction } from "react";

import { Alert, AlertColor, Fade, Snackbar as SnackbarComponent } from "@mui/material";

interface SnackbarProps {
  snackbarState: DataStateProps;
  setSnackbarState: Dispatch<SetStateAction<DataStateProps>>;
  severity: AlertColor;
}

const Snackbar = ({ snackbarState, setSnackbarState, severity }: SnackbarProps) => {
  return (
    <SnackbarComponent
      open={snackbarState.snackbarState?.isOpen}
      autoHideDuration={3000}
      TransitionComponent={Fade}
      onClose={(_event, reason?) => {
        if (reason === "clickaway") {
          return;
        }
        setSnackbarState((dataState: DataStateProps) => ({
          ...dataState,
          snackbarState: {
            isOpen: false,
            message: dataState.snackbarState?.message || "",
          },
        }));
      }}>
      <Alert severity={severity} variant="filled" sx={{ width: "100%" }}>
        {snackbarState.snackbarState?.message}
      </Alert>
    </SnackbarComponent>
  );
};

export default Snackbar;
