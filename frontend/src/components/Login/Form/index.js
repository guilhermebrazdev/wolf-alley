import { Container } from "./style";
import { AiOutlineUser } from "react-icons/ai";
import { BsFillLockFill } from "react-icons/bs";

import Input from "../../Input";

const LoginForm = () => {
  return (
    <Container>
      <Input placeholder="Email">{<AiOutlineUser />}</Input>
      <Input placeholder="Senha">{<BsFillLockFill />}</Input>
      <button>Entrar</button>
    </Container>
  );
};

export default LoginForm;
