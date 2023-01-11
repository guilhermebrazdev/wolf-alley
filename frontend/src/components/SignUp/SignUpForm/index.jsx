import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { BsFillLockFill, BsFillCreditCardFill } from "react-icons/bs";

import Button from "../../Button";
import { ClientCtxt } from "../../../context/Client";

import Input from "../../Input";

import { Container } from "./style";

const SignUpForm = () => {
  const { register, errors, handleSubmit, signUp } = ClientCtxt();
  return (
    <Container>
      <form onSubmit={handleSubmit(signUp)}>
        <Input
          placeholder="Nome"
          name="name"
          type="text"
          register={register}
          errors={errors.name?.message}
        >
          {<AiOutlineUser />}
        </Input>
        <Input
          placeholder="Email"
          name="email"
          type="email"
          register={register}
          errors={errors.email?.message}
        >
          {<AiOutlineMail />}
        </Input>
        <Input
          placeholder="CPF"
          name="cpf"
          type="text"
          register={register}
          errors={errors.cpf?.message}
        >
          {<BsFillCreditCardFill />}
        </Input>
        <Input
          placeholder="Senha"
          name="password"
          type="password"
          register={register}
          errors={errors.password?.message}
        >
          {<BsFillLockFill />}
        </Input>
        <Input
          placeholder="Confirmar senha"
          name="confirmPassword"
          type="password"
          register={register}
          errors={errors.confirmPassword?.message}
        >
          {<BsFillLockFill />}
        </Input>
        {/* <Input
          placeholder="Administrador"
          name="isAdm"
          type="checkbox"
          register={register}
          errors={errors.isAdm?.message}
        ></Input> */}
        <Input
          placeholder="Data de nascimento"
          name="birthday"
          type="date"
          register={register}
          errors={errors.date?.message}
        ></Input>
        <Button type="submit">Cadastre-se!</Button>
      </form>
    </Container>
  );
};

export default SignUpForm;
