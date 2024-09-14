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
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    setIsLoading(true);
    const response = await loginMutateAsync({
      email: formdata.email,
      password: formdata.password,
    });
    if (response.isSuccess) {
      await settingsMutateAsync({
        currentUser: response.data!.currentUser,
        accessToken: response.data!.accessToken,
      });
    }
    setIsLoading(false);
    setSnackbarState(() => ({
      isOpen: true,
      isError: response.isSuccess ? false : true,
      message: response.message,
    }));
    if (response.isSuccess) {
      return setTimeout(() => {
        navigate("/");
      }, 1500);
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
        <SubmitButton isLoading={isLoading} />
      </form>
      <Divider sx={DividerStyles} orientation="horizontal" flexItem />
      <RouterLink to={"/register"} style={LinkStyles}>
        {t("forms.placeholders.registerLink")}
      </RouterLink>
      {snackbarState.isOpen && (
        <Snackbar
          snackbarState={snackbarState}
          setSnackbarState={setSnackbarState}
          severity={snackbarState.isError ? "error" : "success"}
        />
      )}
    </>
  );
};

export default LoginPage;
