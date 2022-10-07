import { createContext, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { LoginSchema } from "../../schemas";
import api from "../../services/api";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
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
        console.log(`Erro: ${err.response.data.error}`);
      });
  };

  return (
    <LoginContext.Provider value={{ register, handleSubmit, errors, login }}>
      {children}
    </LoginContext.Provider>
  );
};

export const Logar = () => useContext(LoginContext);
