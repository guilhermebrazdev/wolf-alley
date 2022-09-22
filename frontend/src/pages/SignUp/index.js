import SignUpForm from "../../components/SignUp/SignUpForm";
import { Container } from "./style";

const SignUp = () => {
  return (
    <Container>
      <h1>Cadastre-se agora!</h1>
      <SignUpForm />
    </Container>
  );
};

export default SignUp;
