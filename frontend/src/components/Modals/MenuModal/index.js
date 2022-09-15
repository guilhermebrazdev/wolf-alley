import { useContext } from "react";

import { ModalContext } from "../../../context/MenuModal";

import { Container } from "./style";

const MenuModal = () => {
  const { closingModal } = useContext(ModalContext);

  return (
    <Container onClick={() => closingModal()}>
      <p>Teste</p>
      <p>Teste</p>
    </Container>
  );
};

export default MenuModal;
