import { ReactNode, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import Alert from "@/components/Alert";
import Button from "@/components/Button";

import useRegisterMutation from "./hooks/useRegisterMutation";
import useAuthDetails from "@/hooks/useAuthDetails";
import useOnMountEffect from "@/hooks/useOnMountEffect";

import { errorMessage } from "@/localization/i18n";

import "@/styles/authforms.css";

const RegisterPage = () => {
  const [formFeedback, setFormFeedback] = useState<ReactNode>(undefined);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { mutateAsync: registerMutateAsync, isSuccess: registerSuccess } = useRegisterMutation();
  const { data } = useAuthDetails();

  useOnMountEffect(() => {
    if (data?.accessToken) {
      navigate("/login");
    }
  });

  const RegisterFormSubmit = async (fd: FieldValues /* FormData */) => {
    if (!fd.name || !fd.surname || !fd.email || !fd.password1 || !fd.password2) {
      return setFormFeedback(
        <Alert type="warning" text={t("publicForms.messages.formNotFilled")} />,
      );
    }
    if (fd.password1 !== fd.password2) {
      return setFormFeedback(
        <Alert type="error" text={t("publicForms.messages.passwordsNotMatch")} />,
      );
    }
    try {
      const response = await registerMutateAsync({
        name: fd.name,
        surname: fd.surname,
        email: fd.email,
        password: fd.password1,
      });
      return setFormFeedback(
        <Alert type={registerSuccess ? "success" : "error"} text={response.message} />,
      );
    } catch (error) {
      console.error(errorMessage(RegisterFormSubmit.name, error));
      return setFormFeedback(<Alert type={"success"} text={t("publicForms.messages.error")} />);
    }
  };

  return (
    <main id="form-page">
      <form onSubmit={handleSubmit(RegisterFormSubmit)}>
        <h1>WalletTuner</h1>
        {formFeedback}
        <div className="form-row">
          <input
            {...register("firstname")}
            type="text"
            placeholder={t("publicForms.register.firstNamePlaceholder")}
          />
          <input
            {...register("lastname")}
            type="text"
            placeholder={t("publicForms.register.lastNamePlaceholder")}
          />
        </div>
        <input
          {...register("email")}
          type="email"
          placeholder={t("publicForms.register.emailPlaceholder")}
        />
        <input
          {...register("password1")}
          type="password"
          placeholder={t("publicForms.register.passwordPlaceholder")}
        />
        <input
          {...register("password2")}
          type="password"
          placeholder={t("publicForms.register.passwordAgainPlaceholder")}
        />
        <Button id="submit-btn" type="submit" value={t("publicForms.register.registerButton")} />
        <div className="form-row link">
          {t("publicForms.register.loginText")}&nbsp;
          <Link to={"/login"}>{t("publicForms.register.loginLink")}</Link>
        </div>
      </form>
    </main>
  );
};

export default RegisterPage;
