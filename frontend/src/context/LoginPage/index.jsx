import { createContext, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";

import { LoginSchema } from "../../schemas";
import api from "../../services/api";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  async function login(data) {
    console.log("data ", data);
    console.log("enviando");

    await api
      .post("/clients/login", data)
      .then((response) => {
        console.log(response);
        toast.success("Login realizado com sucesso!");
        history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Algo deu errado no Login!");
        console.log(`Erro: ${err.response.data.error}`);
      });
  }

  return (
    <LoginContext.Provider value={{ register, handleSubmit, errors, login }}>
      {children}
    </LoginContext.Provider>
  );
};

export const LoginCtxt = () => useContext(LoginContext);
