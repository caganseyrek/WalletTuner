import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, TextField } from "@mui/material";

import AuthCheckProvider from "@/components/AuthCheckProvider";
import FormHeader from "@/components/FormHeader";
import FormTranslate from "@/components/FormTranslate";
import Snackbar from "@/components/Snackbar";
import SubmitButton from "@/components/SubmitButton";

import useLoginMutation from "./hooks/useLoginMutation";
import useSettingsMutation from "./hooks/useSettingsMutation";

import { errorMessage } from "@/localization/i18n";

import { LoginFormData, loginSchema } from "./loginSchema";

import { formBodyStyles, formPageStyles } from "@/styles/formStyles";

const LoginPage = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const { mutateAsync: settingsMutateAsync } = useSettingsMutation();
  const { mutateAsync: loginMutateAsync } = useLoginMutation();

  const [snackbarState, setSnackbarState] = useState<SnackbarStateProps>({
    isOpen: false,
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
        return setSnackbarState({ isOpen: true, message: t("publicForms.messages.error") });
      }
    } catch (error) {
      console.error(errorMessage(LoginFormSubmit.name, error));
      setStatus(() => ({
        isLoading: false,
        isError: true,
        isSuccess: false,
      }));
      return setSnackbarState({ isOpen: true, message: t("publicForms.messages.error") });
    }
  };

  return (
    <AuthCheckProvider isPagePublic={true}>
      <Box sx={formPageStyles}>
        <form noValidate onSubmit={handleSubmit(LoginFormSubmit)} style={formBodyStyles}>
          <FormHeader title={t("publicForms.titles.loginTitle")} />
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
            name="password"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  variant="outlined"
                  type="password"
                  label={t("publicForms.placeholders.passwordPlaceholder")}
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
            {t("publicForms.placeholders.registerText")}&nbsp;
            <Link to={"/register"}>{t("publicForms.placeholders.registerLink")}</Link>
          </Box>
          {snackbarState.isOpen && (
            <Snackbar
              snackbarState={snackbarState}
              setSnackbarState={setSnackbarState}
              severity={"error"}
            />
          )}
          <FormTranslate />
        </form>
      </Box>
    </AuthCheckProvider>
  );
};

export default LoginPage;
