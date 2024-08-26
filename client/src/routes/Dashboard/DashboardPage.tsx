import { useNavigate } from "react-router-dom";

import Header from "./components/Header";
import Modal from "./components/Modal";
import Overview from "./components/Overview";
import Transactions from "./components/Transactions";

import useAuthDetails from "@/hooks/useAuthDetails";
import useOnMountEffect from "@/hooks/useOnMountEffect";

import getGreeting from "@/utils/greeter";

import { ModalContextProvider } from "./context/ModalContext";

const MainPage = () => {
  const { data: authDetails } = useAuthDetails();
  const navigate = useNavigate();
  useOnMountEffect(() => {
    if (!authDetails?.accessToken) {
      navigate("/login");
    }
  });

  const greeting = getGreeting(authDetails!.name!);

  return (
    <>
      <ModalContextProvider>
        <Header />
        <h2 id="greeting">{greeting}</h2>
        <Overview />
        <Modal type="settings" /> {/* TODO */}
        <Transactions />
      </ModalContextProvider>
    </>
  );
};

export default MainPage;
