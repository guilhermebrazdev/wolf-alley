import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AiOutlineUser } from "react-icons/ai";
import { BsFillLockFill } from "react-icons/bs";

import Input from "../../Input";
import Button from "../../Button";
import api from "../../../services/api";

import { Container } from "./style";

const LoginForm = () => {
  const LoginSchema = yup.object().shape({
    email: yup.string().required("Campo obrigatório").email("Email inválido"),
    password: yup.string().required("Campo obrigatório"),
    // .min(6, "Mínimo de 6 dígitos"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const login = async (data) => {
    console.log("data ", data);
    console.log("enviando");

    await api
      .post("/clients/login", data)
      .then((response) => {
        console.log(response);
        console.log("DEU CERTO???");
      })
      .catch((err) => {
        console.log(err);
        console.log("badddddd");
      });
  };

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
