import ComponentTypes from "@/types/components";
import { Alert, Fade, Snackbar as SnackbarComponent } from "@mui/material";

const Snackbar = ({ snackbarState, setSnackbarState, severity }: ComponentTypes.SnackbarProps) => {
  return (
    <SnackbarComponent
      open={snackbarState.snackbarState?.isOpen}
      autoHideDuration={3000}
      TransitionComponent={Fade}
      onClose={(_event, reason?) => {
        if (reason === "clickaway") {
          return;
        }
        setSnackbarState((dataState: ComponentTypes.DataStateProps) => ({
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
