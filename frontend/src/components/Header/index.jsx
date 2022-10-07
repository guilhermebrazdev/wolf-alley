import { useContext } from "react";
import { HiMenu } from "react-icons/hi";

import logo from "../../assets/logo_wolf_alley.png";
import { ModalContext } from "../../context/MenuModal";
import MobileMenuModal from "../Modals/MobileMenuModal";

import { Container } from "./style";

const Header = () => {
  const { openModal, openingModal, goToHome, goToLogin, goToSignUp } =
    useContext(ModalContext);

  return (
    <Container>
      <div>
        <img src={logo} alt="logo" />

        <section id="mobileMenu">
          <HiMenu
            onClick={(e) => {
              openingModal();
              e.stopPropagation();
            }}
          />
          {openModal && <MobileMenuModal />}
        </section>
        <section id="desktopMenu">
          <p onClick={() => goToHome()}>Home</p>
          <p onClick={() => goToLogin()}>Login</p>
          <p onClick={() => goToSignUp()}>Sign Up</p>
        </section>
      </div>
    </Container>
  );
};

export default Header;
