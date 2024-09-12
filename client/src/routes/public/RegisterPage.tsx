import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, TextField } from "@mui/material";

import FormHeader from "@/components/FormHeader";
import Snackbar from "@/components/Snackbar";
import SubmitButton from "@/components/SubmitButton";

import useRegisterMutation from "@/hooks/user/useRegisterMutation";

import { FormBodyStyles, FormPageStyles } from "@/shared/globals.style";

import { errorMessage } from "@/localization/i18n";

import { RegisterFormData, registerSchema } from "../../schemas/registerSchema";

const RegisterPage = () => {
  const { t } = useTranslation();

  const { mutateAsync: registerMutateAsync } = useRegisterMutation();

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
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  const RegisterFormSubmit = async (fd: FieldValues) => {
    if (fd.password1 !== fd.password2) {
      setStatus(() => ({ isLoading: false, isError: false, isSuccess: true }));
      return setSnackbarState({
        isOpen: true,
        isError: false,
        message: t("forms.messages.passwordsNotMatch"),
      });
    }
    try {
      setStatus((currentStatus) => ({ ...currentStatus, isLoading: true }));
      await registerMutateAsync({
        name: fd.name,
        surname: fd.surname,
        email: fd.email,
        password: fd.password1,
      });
      return setStatus(() => ({ isLoading: false, isError: false, isSuccess: true }));
    } catch (error) {
      console.error(errorMessage(RegisterFormSubmit.name, error));
      setStatus(() => ({
        isLoading: false,
        isError: true,
        isSuccess: false,
      }));
      return setSnackbarState({ isOpen: true, isError: false, message: t("forms.messages.error") });
    }
  };

  return (
    <Box sx={FormPageStyles}>
      <form noValidate onSubmit={handleSubmit(RegisterFormSubmit)} style={FormBodyStyles}>
        <FormHeader title={t("forms.titles.registerTitle")} />
        <Controller
          name="name"
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                variant="outlined"
                label={t("forms.placeholders.firstNamePlaceholder")}
                error={!!errors.name}
                helperText={(errors.name?.message as string) || ""}
                size="small"
                fullWidth
              />
            );
          }}
        />
        <Controller
          name="surname"
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                variant="outlined"
                label={t("forms.placeholders.lastNamePlaceholder")}
                error={!!errors.surname}
                helperText={(errors.surname?.message as string) || ""}
                size="small"
                fullWidth
              />
            );
          }}
        />
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
          name="password1"
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                variant="outlined"
                type="password"
                label={t("forms.placeholders.passwordPlaceholder")}
                error={!!errors.password1}
                helperText={(errors.password1?.message as string) || ""}
                size="small"
                fullWidth
              />
            );
          }}
        />
        <Controller
          name="password2"
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                variant="outlined"
                type="password"
                label={t("forms.placeholders.passwordAgainPlaceholder")}
                error={!!errors.password2}
                helperText={(errors.password2?.message as string) || ""}
                size="small"
                fullWidth
              />
            );
          }}
        />
        <SubmitButton status={status} />
        <Box textAlign={"center"}>
          {t("forms.placeholders.loginText")}&nbsp;
          <RouterLink to={"/login"}>{t("forms.placeholders.loginLink")}</RouterLink>
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

export default RegisterPage;
