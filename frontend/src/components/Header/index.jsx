import { HiMenu } from "react-icons/hi";
import logo from "../../assets/logo_wolf_alley.png";
import { LoginCtxt } from "../../context/LoginPage";
import { MenuModalCtxt } from "../../context/MenuModal";
import DesktopMenu from "../Menu/DesktopMenu";
import MobileMenuModal from "../Modals/MobileMenuModal";

import { Container } from "./style";

const Header = () => {
  const { authenticated, authPath, nonAuthPath } = LoginCtxt();
  const { openModal, openingModal } = MenuModalCtxt();

  let navigateOptions = authenticated ? authPath : nonAuthPath;

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
          {openModal && <MobileMenuModal navigateOptions={navigateOptions} />}
        </section>
        <section>
          <DesktopMenu navigateOptions={navigateOptions} />
        </section>
      </div>
    </Container>
  );
};

export default Header;
