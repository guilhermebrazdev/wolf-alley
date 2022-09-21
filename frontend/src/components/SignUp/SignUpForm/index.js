import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { BsFillLockFill, BsFillCreditCardFill } from "react-icons/bs";

import Button from "../../Button";

import Input from "../../Input";

import { Container } from "./style";

const SignUpForm = () => {
  return (
    <Container>
      <Input placeholder="Nome">{<AiOutlineUser />}</Input>
      <Input placeholder="Email">{<AiOutlineMail />}</Input>
      <Input placeholder="CPF">{<BsFillCreditCardFill />}</Input>
      <Input placeholder="Senha">{<BsFillLockFill />}</Input>
      <Input placeholder="Confirmar senha">{<BsFillLockFill />}</Input>
      <Input type="date"></Input>
      <Button>Cadastre-se!</Button>
    </Container>
  );
};

export default SignUpForm;
