import { createContext, useContext, useState } from "react";
import { useHistory } from "react-router";

export const ModalContext = createContext();

export const MenuModalProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);
  const history = useHistory();

  function openingModal() {
    setOpenModal(!openModal);
  }

  function closingModal() {
    setOpenModal(false);
  }

  function goToHome() {
    history.push("/");
    closingModal();
  }

  function goToLogin() {
    history.push("/login");
    closingModal();
  }

  function goToSignUp() {
    history.push("/signUp");
    closingModal();
  }

  return (
    <ModalContext.Provider
      value={{
        openModal,
        openingModal,
        closingModal,
        goToHome,
        goToLogin,
        goToSignUp,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const MenuModalCtxt = () => useContext(ModalContext);
