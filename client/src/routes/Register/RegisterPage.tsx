import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Box, Button, CircularProgress, TextField } from "@mui/material";

import FormHeader from "@/components/FormHeader";

import useRegisterMutation from "./hooks/useRegisterMutation";
import useAuthDetails from "@/hooks/useAuthDetails";
import useOnMountEffect from "@/hooks/useOnMountEffect";

import { errorMessage } from "@/localization/i18n";

import { RegisterFormData, registerSchema } from "./registerSchema";

import { formBodyStyles, formPageStyles } from "@/styles/formStyles";

const RegisterPage = () => {
  const [status, setStatus] = useState<StatusProps>({
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { mutateAsync: registerMutateAsync } = useRegisterMutation();
  const { data } = useAuthDetails();

  useOnMountEffect(() => {
    if (data?.accessToken) {
      navigate("/login");
    }
  });

  const RegisterFormSubmit = async (fd: FieldValues) => {
    if (fd.password1 !== fd.password2) {
      return setStatus(() => ({
        isLoading: false,
        isError: false,
        isSuccess: true,
        message: t("publicForms.messages.passwordsNotMatch"),
      }));
    }
    try {
      setStatus((currentStatus) => ({
        ...currentStatus,
        isLoading: true,
      }));
      const response = await registerMutateAsync({
        name: fd.name,
        surname: fd.surname,
        email: fd.email,
        password: fd.password1,
      });
      return setStatus(() => ({
        isLoading: false,
        isError: false,
        isSuccess: true,
        message: response.message,
      }));
    } catch (error) {
      console.error(errorMessage(RegisterFormSubmit.name, error));
      return setStatus(() => ({
        isLoading: false,
        isError: true,
        isSuccess: false,
        message: t("publicForms.messages.error"),
      }));
    }
  };

  return (
    <Box sx={formPageStyles}>
      <form noValidate onSubmit={handleSubmit(RegisterFormSubmit)} style={formBodyStyles}>
        <FormHeader title={t("publicForms.titles.registerTitle")}>
          {status.isLoading && <CircularProgress />}
          {(status.isError || status.isSuccess) && (
            <Alert
              variant="filled"
              severity={status.isError ? "error" : "success"}
              sx={{ width: "100%" }}>
              {status.message}
            </Alert>
          )}
        </FormHeader>
        <Controller
          name="name"
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                variant="outlined"
                label={t("publicForms.placeholders.firstNamePlaceholder")}
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
                label={t("publicForms.placeholders.lastNamePlaceholder")}
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
                label={t("publicForms.placeholders.emailPlaceholder")}
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
                label={t("publicForms.placeholders.passwordPlaceholder")}
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
                label={t("publicForms.placeholders.passwordAgainPlaceholder")}
                error={!!errors.password2}
                helperText={(errors.password2?.message as string) || ""}
                size="small"
                fullWidth
              />
            );
          }}
        />
        <Button variant="contained" type="submit" fullWidth sx={{ height: "40px" }}>
          {t("publicForms.placeholders.registerButton")}
        </Button>
        <Box textAlign={"center"}>
          {t("publicForms.placeholders.loginText")}&nbsp;
          <RouterLink to={"/login"}>{t("publicForms.placeholders.loginLink")}</RouterLink>
        </Box>
      </form>
    </Box>
  );
};

export default RegisterPage;
