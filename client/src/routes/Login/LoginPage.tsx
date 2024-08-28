import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Box, Button, CircularProgress, TextField } from "@mui/material";

import FormHeader from "@/components/FormHeader";

import useLoginMutation from "./hooks/useLoginMutation";
import useSettingsMutation from "./hooks/useSettingsMutation";
import useAuthDetails from "@/hooks/useAuthDetails";
import useOnMountEffect from "@/hooks/useOnMountEffect";

import { errorMessage } from "@/localization/i18n";

import { LoginFormData, loginSchema } from "./loginSchema";

import { formBodyStyles, formPageStyles } from "@/styles/formStyles";

const LoginPage = () => {
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
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { mutateAsync: settingsMutateAsync } = useSettingsMutation();
  const { mutateAsync: loginMutateAsync } = useLoginMutation();
  const { data } = useAuthDetails();

  useOnMountEffect(() => {
    if (data?.accessToken) {
      navigate("/login");
    }
  });

  const LoginFormSubmit = async (formdata: FieldValues) => {
    try {
      setStatus((currentStatus) => ({
        ...currentStatus,
        isLoading: true,
      }));
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
          message: response.message,
        }));
        return setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        return setStatus(() => ({
          isLoading: false,
          isError: true,
          isSuccess: false,
          message: t("publicForms.messages.error"),
        }));
      }
    } catch (error) {
      console.error(errorMessage(LoginFormSubmit.name, error));
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
      <form noValidate onSubmit={handleSubmit(LoginFormSubmit)} style={formBodyStyles}>
        <FormHeader title={t("publicForms.titles.loginTitle")}>
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
        <Button variant="contained" type="submit" fullWidth sx={{ height: "40px" }}>
          {t("publicForms.placeholders.loginButton")}
        </Button>
        <Box textAlign={"center"}>
          {t("publicForms.placeholders.registerText")}&nbsp;
          <Link to={"/register"}>{t("publicForms.placeholders.registerLink")}</Link>
        </Box>
      </form>
    </Box>
  );
};

export default LoginPage;
