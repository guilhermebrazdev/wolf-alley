import { HiMenu } from "react-icons/hi";

import logo from "../../assets/logo_wolf_alley.png";
import MenuModal from "../Modals/MenuModal";

import { Container } from "./style";

const Header = ({ openModal, openingModal, closingModal }) => {
  console.log("openModal ", openModal);

  return (
    <Container>
      <img src={logo} alt="logo" />
      <HiMenu onClick={() => openingModal()} />
      {openModal && <MenuModal closingModal={closingModal} />}
    </Container>
  );
};

export default Header;
