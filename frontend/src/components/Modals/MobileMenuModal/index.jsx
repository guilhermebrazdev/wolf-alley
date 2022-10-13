import { MenuModalCtxt } from "../../../context/MenuModal";

import { Container } from "./style";

const MobileMenuModal = () => {
  const { goToHome, goToSignUp, goToLogin } = MenuModalCtxt();

  return (
    <Container>
      <div>
        <p onClick={() => goToHome()}>Home</p>
        <p onClick={() => goToLogin()}>Login</p>
        <p onClick={() => goToSignUp()}>Sign Up</p>
      </div>
    </Container>
  );
};

export default MobileMenuModal;
