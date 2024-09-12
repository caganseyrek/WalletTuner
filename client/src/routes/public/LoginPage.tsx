import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { LoginFormData, loginSchema } from "@/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divider, TextField } from "@mui/material";

import FormHeader from "@/components/FormHeader";
import Snackbar from "@/components/Snackbar";
import SubmitButton from "@/components/SubmitButton";

import useLoginMutation from "@/hooks/user/useLoginMutation";
import useSettingsMutation from "@/hooks/user/useSettingsMutation";

import { DividerStyles, LinkStyles } from "@/shared/globals.style";

import { errorMessage } from "@/localization/i18n";

import { FormBodyStyles } from "../layouts/styles/publicLayout.style";

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
    <>
      <FormHeader title={t("forms.header.loginTitle")} subtitle={t("forms.header.loginSubtitle")} />
      <form noValidate onSubmit={handleSubmit(LoginFormSubmit)} style={FormBodyStyles}>
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
      </form>
      <Divider sx={DividerStyles} orientation="horizontal" flexItem />
      <RouterLink to={"/register"} style={LinkStyles}>
        {t("forms.placeholders.registerLink")}
      </RouterLink>
      {snackbarState.isOpen && (
        <Snackbar
          snackbarState={snackbarState}
          setSnackbarState={setSnackbarState}
          severity={"error"}
        />
      )}
    </>
  );
};

export default LoginPage;
