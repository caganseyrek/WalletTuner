import { useTranslation } from "react-i18next";

import { CheckCircleOutline, ErrorOutline } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";

const SubmitButtonIcon = ({ status }: SubmitButtonProps) => {
  if (status.isLoading) {
    return <CircularProgress size={20} />;
  } else if (status.isSuccess) {
    return <CheckCircleOutline />;
  } else if (status.isError) {
    return <ErrorOutline />;
  }
  return "";
};

const SubmitButtonText = ({ status }: SubmitButtonProps) => {
  const { t } = useTranslation();

  if (status.isLoading) {
    return t("forms.buttons.loginIsLoadingText");
  } else if (status.isSuccess) {
    return t("forms.buttons.loginIsSuccessText");
  } else if (status.isError) {
    return t("forms.buttons.loginIsErrorText");
  }
  return t("forms.buttons.loginButton");
};

const submitButtonColor = ({ status }: SubmitButtonProps) => {
  if (status.isError) {
    return "error";
  } else if (status.isSuccess) {
    return "success";
  }
  return "primary";
};

const SubmitButton = ({ status }: SubmitButtonProps) => {
  return (
    <Button
      variant="contained"
      type="submit"
      fullWidth
      sx={{ height: "40px" }}
      color={submitButtonColor({ status })}
      disabled={status.isLoading}
      startIcon={<SubmitButtonIcon status={status} />}>
      <SubmitButtonText status={status} />
    </Button>
  );
};

export default SubmitButton;
