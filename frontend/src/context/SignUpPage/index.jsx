import { createContext, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";

import api from "../../services/api";
import { SignUpSchema } from "../../schemas";

const SignUpContext = createContext();

export const SignUpProvider = ({ children }) => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignUpSchema),
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

  return (
    <SignUpContext.Provider value={{ register, handleSubmit, errors, signUp }}>
      {children}
    </SignUpContext.Provider>
  );
};

export const SignUpCtxt = () => useContext(SignUpContext);
