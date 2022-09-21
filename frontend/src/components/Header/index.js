import { useContext } from "react";
import { HiMenu } from "react-icons/hi";

import logo from "../../assets/logo_wolf_alley.png";
import { ModalContext } from "../../context/MenuModal";
import MenuModal from "../Modals/MenuModal";

import { Container } from "./style";

const Header = () => {
  const { openModal, openingModal } = useContext(ModalContext);

  // console.log("openModal ", openModal);

  return (
    <Container>
      <img src={logo} alt="logo" />
      <HiMenu onClick={() => openingModal()} />
      {openModal && <MenuModal />}
    </Container>
  );
};

export default Header;
