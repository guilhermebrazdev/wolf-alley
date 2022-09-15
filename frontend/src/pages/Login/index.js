import LoginForm from "../../components/Login/Form";
import { Container } from "./style";

const Login = () => {
  return (
    <Container>
      <h1>Se cadastre agora!</h1>
      <LoginForm />
    </Container>
  );
};

export default Login;
