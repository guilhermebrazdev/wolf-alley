import { createContext, useContext, useState } from "react";

export const ModalContext = createContext();

export const MenuModalProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);

  function openingModal() {
    setOpenModal(true);
  }

  function closingModal() {
    setOpenModal(false);
  }

  return (
    <ModalContext.Provider value={{ openModal, openingModal, closingModal }}>
      {children}
    </ModalContext.Provider>
  );
};

// export const MenuModal = () => useContext(ModalContext);
