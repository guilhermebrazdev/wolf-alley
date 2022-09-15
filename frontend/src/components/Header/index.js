import { Container } from "./style";

import logo from "../../assets/logo_wolf_alley.png";

import MenuModal from "../Modals/MenuModal";

import { ModalContext } from "../../context/MenuModal";

import { HiMenu } from "react-icons/hi";
import { useContext } from "react";

const Header = () => {
  const { openModal, openingModal, closingModal } = useContext(ModalContext);

  console.log("openModal ", openModal);

  return (
    <Container>
      <img src={logo} alt="logo" />
      <HiMenu onClick={() => openingModal()} />
      {openModal && <MenuModal />}
    </Container>
  );
};

export default Header;
