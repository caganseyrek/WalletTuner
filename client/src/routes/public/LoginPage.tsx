import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, TextField } from "@mui/material";

import FormHeader from "@/components/FormHeader";
import Snackbar from "@/components/Snackbar";
import SubmitButton from "@/components/SubmitButton";

import useLoginMutation from "@/hooks/user/useLoginMutation";
import useSettingsMutation from "@/hooks/user/useSettingsMutation";

import { FormBodyStyles, FormPageStyles } from "@/shared/globals.style";

import { errorMessage } from "@/localization/i18n";

import { LoginFormData, loginSchema } from "../../schemas/loginSchema";

const LoginPage = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const { mutateAsync: settingsMutateAsync } = useSettingsMutation();
  const { mutateAsync: loginMutateAsync } = useLoginMutation();

  const [snackbarState, setSnackbarState] = useState<SnackbarStateProps>({
    isOpen: false,
    isError: false,
    message: "",
  });
  const [status, setStatus] = useState<StatusProps>({
    isLoading: false,
    isError: false,
    isSuccess: false,
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const LoginFormSubmit = async (formdata: FieldValues) => {
    try {
      setStatus((currentStatus) => ({ ...currentStatus, isLoading: true }));
      const response = await loginMutateAsync({
        email: formdata.email,
        password: formdata.password,
      });
      if (response.message) {
        await settingsMutateAsync({
          currentUser: response.currentUser,
          accessToken: response.accessToken,
        });
        setStatus(() => ({
          isLoading: false,
          isError: false,
          isSuccess: true,
        }));
        return setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setStatus(() => ({ isLoading: false, isError: true, isSuccess: false }));
        return setSnackbarState({
          isOpen: true,
          isError: true,
          message: t("forms.messages.error"),
        });
      }
    } catch (error) {
      console.error(errorMessage(LoginFormSubmit.name, error));
      setStatus(() => ({
        isLoading: false,
        isError: true,
        isSuccess: false,
      }));
      return setSnackbarState({
        isOpen: true,
        isError: true,
        message: t("forms.messages.error"),
      });
    }
  };

  return (
    <Box sx={FormPageStyles}>
      <form noValidate onSubmit={handleSubmit(LoginFormSubmit)} style={FormBodyStyles}>
        <FormHeader title={t("forms.titles.loginTitle")} />
        <Controller
          name="email"
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                variant="outlined"
                label={t("forms.placeholders.emailPlaceholder")}
                error={!!errors.email}
                helperText={(errors.email?.message as string) || ""}
                size="small"
                sx={{
                  "& .MuiFilledInput-root": {
                    overflow: "hidden",
                    borderRadius: 4,
                    border: "1px solid",
                    backgroundColor: "#F3F6F9",
                    borderColor: "#E0E3E7",
                    "&:hover": { backgroundColor: "transparent" },
                  },
                }}
                fullWidth
              />
            );
          }}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                variant="outlined"
                type="password"
                label={t("forms.placeholders.passwordPlaceholder")}
                error={!!errors.password}
                helperText={(errors.password?.message as string) || ""}
                size="small"
                fullWidth
              />
            );
          }}
        />
        <SubmitButton status={status} />
        <Box textAlign={"center"}>
          {t("forms.placeholders.registerText")}&nbsp;
          <Link to={"/register"}>{t("forms.placeholders.registerLink")}</Link>
        </Box>
        {snackbarState.isOpen && (
          <Snackbar
            snackbarState={snackbarState}
            setSnackbarState={setSnackbarState}
            severity={"error"}
          />
        )}
      </form>
    </Box>
  );
};

export default LoginPage;
