import { AiOutlineUser } from "react-icons/ai";
import { BsFillLockFill } from "react-icons/bs";

import Input from "../../Input";
import Button from "../../Button";
import { ClientCtxt } from "../../../context/Client";

import { Container } from "./style";

const LoginForm = () => {
  const { register, handleSubmit, errors, login } = ClientCtxt();

  return (
    <Container>
      <form onSubmit={handleSubmit(login)}>
        <Input
          placeholder="Email"
          type="email"
          register={register}
          name="email"
          error={errors.email?.message}
        >
          {<AiOutlineUser />}
        </Input>
        <Input
          placeholder="Senha"
          type="password"
          register={register}
          name="password"
          error={errors.password?.message}
        >
          {<BsFillLockFill />}
        </Input>
        <Button type="submit">Entrar!</Button>
      </form>
    </Container>
  );
};

export default LoginForm;
