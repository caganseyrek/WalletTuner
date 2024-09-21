import { useTranslation } from "react-i18next";

import { Button, CircularProgress } from "@mui/material";

interface SubmitButtonProps {
  isLoading: boolean;
  isSuccess: boolean;
}

const SubmitButtonText = ({ isLoading }: Omit<SubmitButtonProps, "isSuccess">) => {
  const { t } = useTranslation();

  if (isLoading) {
    return <CircularProgress size={20} />;
  }
  return t("forms.buttons.loginButton");
};

const SubmitButton = ({ isLoading, isSuccess }: SubmitButtonProps) => {
  return (
    <Button
      variant="contained"
      type="submit"
      color="primary"
      fullWidth
      sx={{ height: "40px" }}
      disabled={isLoading || isSuccess}>
      <SubmitButtonText isLoading={isLoading} />
    </Button>
  );
};

export default SubmitButton;
