import { Container } from "./style";
import { AiOutlineUser } from "react-icons/ai";
import { BsFillLockFill } from "react-icons/bs";

import Input from "../../Input";
import Button from "../../Button";

const LoginForm = () => {
  return (
    <Container>
      <Input placeholder="Email">{<AiOutlineUser />}</Input>
      <Input placeholder="Senha">{<BsFillLockFill />}</Input>
      <Button>Entrar!</Button>
    </Container>
  );
};

export default LoginForm;
