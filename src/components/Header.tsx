import { useContext } from "react";
import { LogOut, Settings } from "react-feather";

import { modalContext } from "../context/ModalContext";
import "../styles/header.css";

const TEST_MAIL = "test@wallettuner.io";

const Header = () => {
  const { modalState, setModalState } = useContext(modalContext);

  const handleLogOut = () => {
    return;
  };

  return (
    <header>
      <div id="header-wrapper">
        <section id="header-left">
          <h1>WalletTuner</h1>
        </section>
        <section id="header-right">
          <div>{TEST_MAIL}</div>
          <button onClick={() => setModalState(!modalState)}>
            <Settings size={18} />
          </button>
          <button onClick={handleLogOut}>
            <LogOut size={18} />
          </button>
        </section>
      </div>
    </header>
  );
};

export default Header;
