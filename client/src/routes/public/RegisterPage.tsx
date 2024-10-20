import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";

import { RegisterFormData, registerSchema } from "@/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divider, TextField } from "@mui/material";

import FormHeader from "@/components/FormHeader";
import Snackbar from "@/components/Snackbar";
import SubmitButton from "@/components/SubmitButton";

import useRegisterMutation from "@/hooks/user/useRegisterMutation";

import { DividerStyles, LinkStyles } from "@/shared/globals.style";

import { FormBodyStyles } from "../layouts/styles/publicLayout.style";

const RegisterPage = () => {
  const { t } = useTranslation();

  const { mutateAsync: registerMutateAsync } = useRegisterMutation();

  const [dataState, setDataState] = useState<DataStateProps>({
    snackbarState: { isOpen: false, message: "" },
    isLoading: false,
    isSuccess: false,
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  const RegisterFormSubmit = async (formdata: FieldValues) => {
    if (formdata.password1 !== formdata.password2) {
      return setDataState(() => ({
        snackbarState: { isOpen: true, message: t("forms.messages.passwordsNotMatch") },
        isLoading: false,
        isSuccess: false,
      }));
    }
    setDataState((currentState) => ({ ...currentState, isLoading: true }));
    const response = await registerMutateAsync({
      name: formdata.name,
      surname: formdata.surname,
      email: formdata.email,
      password: formdata.password1,
    });
    return setDataState(() => ({
      snackbarState: { isOpen: true, message: response.message },
      isLoading: false,
      isSuccess: response.isSuccess ? true : false,
    }));
  };

  return (
    <>
      <FormHeader
        title={t("forms.header.registerTitle")}
        subtitle={t("forms.header.registerSubtitle")}
      />
      <form noValidate onSubmit={handleSubmit(RegisterFormSubmit)} style={FormBodyStyles}>
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
        <SubmitButton isLoading={dataState.isLoading} isSuccess={dataState.isSuccess} />
      </form>
      <Divider sx={DividerStyles} orientation="horizontal" flexItem />
      <RouterLink to={dataState.isSuccess ? "#" : "/login"} style={LinkStyles}>
        {t("forms.placeholders.loginLink")}
      </RouterLink>
      {dataState.snackbarState?.isOpen && (
        <Snackbar
          snackbarState={dataState}
          setSnackbarState={setDataState}
          severity={dataState.isSuccess ? "success" : "error"}
        />
      )}
    </>
  );
};

export default RegisterPage;
