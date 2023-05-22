import SignUpForm from "../../components/SignUp/SignUpForm";

import pacman from "../../assets/pacman.svg";

import { Container } from "./style";

const SignUp = () => {
  return (
    <Container>
      <h1>Cadastre-se agora!</h1>
      <div>
        <img src={pacman} alt="pacman_img" />
        <SignUpForm />
      </div>
    </Container>
  );
};

export default SignUp;
