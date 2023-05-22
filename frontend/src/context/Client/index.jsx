import { createContext, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";

import api from "../../services/api";
import { LoginSchema, SignUpSchema } from "../../schemas";

const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignUpSchema),
    resolver: yupResolver(LoginSchema),
  });

  async function signUp(data) {
    data.isAdm = false;

    await api
      .post("/clients", data)
      .then((response) => {
        console.log(response);
        toast.success("Usuário registrado com sucesso!");

        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
        toast.error("O usuário não foi registrado!");
        console.log(`Erro: ${err.response.data.error}`);
      });
  }

  async function login(data) {
    await api
      .post("/clients/login", data)
      .then((response) => {
        localStorage.setItem("@WolfAlley:Token", response.data.token);

        toast.success("Login realizado com sucesso!");
        history.push("/dashboard");
      })
      .catch((err) => {
        toast.error("Algo deu errado no Login!");
        console.log(`Erro: ${err.response.data.error}`);
      });
  }
  const [authenticated, setAuthenticated] = useState(false);

  function authenticating() {
    const token = localStorage.getItem("@WolfAlley:Token");

    setAuthenticated(!!token);
  }

  const nonAuthPath = {
    firstOpt: { path: "/", value: "Home" },
    secOpt: { path: "/login", value: "Login" },
    thirdOpt: { path: "/signUp", value: "signUp" },
  };

  const authPath = {
    firstOpt: { path: "/dashboard", value: "Produtos" },
    secOpt: { path: "/cart", value: "Carrinho" },
    thirdOpt: { path: "/profile", value: "Perfil" },
  };

  return (
    <ClientContext.Provider
      value={{
        register,
        handleSubmit,
        errors,
        signUp,
        login,
        authenticating,
        authenticated,
        authPath,
        nonAuthPath,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export const ClientCtxt = () => useContext(ClientContext);
