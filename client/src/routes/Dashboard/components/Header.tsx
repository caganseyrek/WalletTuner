import { useContext } from "react";
// import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { LogOut, Settings } from "lucide-react";

import Button from "@/components/Button";

import { useLogoutMutation } from "../hooks/useLogoutMutation";
import useAuthDetails from "@/hooks/useAuthDetails";

import { modalContext } from "../context/ModalContext";

import "@/styles/header.css";

const Header = () => {
  const { modalState, setModalState } = useContext(modalContext);
  const navigate = useNavigate();
  const { t /*, i18n*/ } = useTranslation();

  const { data: authDetails } = useAuthDetails();
  const { mutateAsync: logoutMutate, isError: logoutError, data: logoutData } = useLogoutMutation();

  const HandleLogout = () => {
    logoutMutate({
      currentUser: authDetails!.currentUser!,
      accessToken: authDetails!.accessToken!,
    });
    alert(logoutData?.message);
    if (logoutError) return;
    return navigate("/login");
  };

  return (
    <header>
      <div id="header-wrapper">
        <section id="header-left">
          <h1>WalletTuner</h1>
        </section>
        <section id="header-right">
          {/*<Button
            onClick={() => i18n.changeLanguage(i18n.language === "en" ? "tr" : "en")}
            leftIcon={
              i18n.language === "en" ? (
                <ReactCountryFlag countryCode="us" />
              ) : (
                <ReactCountryFlag countryCode="tr" />
              )
            }
          />*/}
          <Button
            onClick={() => setModalState(!modalState)}
            leftIcon={<Settings size={18} />}
            value={t("dashboard.header.settingsButton")}
          />
          <Button
            onClick={HandleLogout}
            leftIcon={<LogOut size={18} />}
            value={t("dashboard.header.logoutButton")}
          />
        </section>
      </div>
    </header>
  );
};

export default Header;
