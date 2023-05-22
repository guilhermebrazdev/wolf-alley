import LoginForm from "../../components/Login/LoginForm";
import { Container } from "./style";
import game_machine from "../../assets/game_machine.svg";

const Login = () => {
  return (
    <Container>
      <h1>Entre!</h1>
      <div>
        <LoginForm />
        <img src={game_machine} alt="game_machine_svg" />
      </div>
    </Container>
  );
};

export default Login;
