import { createContext, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";

import { LoginSchema } from "../../schemas";
import api from "../../services/api";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

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
        localStorage.setItem("@WolfAlley:Token", response.data.token);

        toast.success("Login realizado com sucesso!");
        history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);

        toast.error("Algo deu errado no Login!");
        console.log(`Erro: ${err.response.data.error}`);
      });
  }

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
    <LoginContext.Provider
      value={{
        register,
        handleSubmit,
        errors,
        login,
        authenticating,
        authenticated,
        authPath,
        nonAuthPath,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const LoginCtxt = () => useContext(LoginContext);
