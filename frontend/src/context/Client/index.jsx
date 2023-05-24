import { createContext, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";

import business_man from "../../assets/icones/business_man.png";
import girl from "../../assets/icones/girl.png";
import man from "../../assets/icones/man.png";
import woman from "../../assets/icones/woman.png";

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

  function logout() {
    localStorage.clear();
    history.push("/");
  }

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

  const [token, setToken] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [client, setclient] = useState({});

  function authenticating() {
    const token = localStorage.getItem("@WolfAlley:Token");

    if (token) {
      setToken(token);
      const usuario = jwt_decode(token);

      setclient(usuario);
    } else {
      setclient({});
    }
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
  //----------------------------AVATAR-------------------------------//

  const [avatarModal, setAvatarModal] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState(business_man);

  const avatarIcons = [
    { img_path: man },
    { img_path: girl },
    { img_path: woman },
    { img_path: business_man },
  ];

  function pickAvatar(avatar_path) {
    setCurrentAvatar(avatar_path);
    setAvatarModal(false);
  }

  return (
    <ClientContext.Provider
      value={{
        register,
        handleSubmit,
        errors,
        logout,
        signUp,
        login,
        token,
        authenticating,
        authenticated,
        client,
        authPath,
        nonAuthPath,
        currentAvatar,
        setCurrentAvatar,
        avatarIcons,
        avatarModal,
        setAvatarModal,
        pickAvatar,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export const ClientCtxt = () => useContext(ClientContext);
