import { ReactNode, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import Alert from "@/components/Alert";
import Button from "@/components/Button";

import { useLoginMutation } from "./hooks/useLoginMutation";
import { useSettingsMutation } from "./hooks/useSettingsMutation";
import useAuthDetails from "@/hooks/useAuthDetails";
import useOnMountEffect from "@/hooks/useOnMountEffect";

import { errorMessage } from "@/localization/i18n";

import "@/styles/authforms.css";

const LoginPage = () => {
  const [formFeedback, setFormFeedback] = useState<ReactNode>(undefined);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { data } = useAuthDetails();
  const { t } = useTranslation();

  const { mutateAsync: settingsMutateAsync } = useSettingsMutation();
  const { mutateAsync: loginMutateAsync } = useLoginMutation();

  useOnMountEffect(() => {
    if (data?.accessToken) {
      navigate("/login");
    }
  });

  const LoginFormSubmit = async (formdata: FieldValues) => {
    if (!formdata.email || !formdata.password) {
      return setFormFeedback(<Alert type="error" text={t("publicForms.messages.formNotFilled")} />);
    }
    try {
      const response = await loginMutateAsync({
        email: formdata.email,
        password: formdata.password,
      });
      if (response.message) {
        await settingsMutateAsync({
          currentUser: response.currentUser,
          accessToken: response.accessToken,
        });
        setFormFeedback(<Alert type="success" text={response.message} />);
        return setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        return setFormFeedback(<Alert type="error" text={t("publicForms.messages.error")} />);
      }
    } catch (error) {
      console.error(errorMessage(LoginFormSubmit.name, error));
      return setFormFeedback(<Alert type="error" text={t("publicForms.messages.error")} />);
    }
  };

  return (
    <main id="form-page">
      <form onSubmit={handleSubmit(LoginFormSubmit)}>
        <h1>WalletTuner</h1>
        {formFeedback}
        <input
          {...register("email")}
          type="email"
          placeholder={t("publicForms.login.emailPlaceholder")}
        />
        <input
          {...register("password")}
          type="password"
          placeholder={t("publicForms.login.passwordPlaceholder")}
        />
        <Button id="submit-btn" type="submit" value={t("publicForms.login.loginButton")} />
        <div className="form-row link">
          {t("publicForms.login.registerText")}&nbsp;
          <Link to={"/register"}>{t("publicForms.login.registerLink")}</Link>
        </div>
      </form>
    </main>
  );
};

export default LoginPage;
