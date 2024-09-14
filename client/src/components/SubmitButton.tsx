import { useTranslation } from "react-i18next";

import { Button, CircularProgress } from "@mui/material";

interface SubmitButtonProps {
  isLoading: boolean;
}

const SubmitButtonText = ({ isLoading }: SubmitButtonProps) => {
  const { t } = useTranslation();

  if (isLoading) {
    return <CircularProgress size={20} />;
  }
  return t("forms.buttons.loginButton");
};

const SubmitButton = ({ isLoading }: SubmitButtonProps) => {
  return (
    <Button
      variant="contained"
      type="submit"
      color="primary"
      fullWidth
      sx={{ height: "40px" }}
      disabled={isLoading}>
      <SubmitButtonText isLoading={isLoading} />
    </Button>
  );
};

export default SubmitButton;
