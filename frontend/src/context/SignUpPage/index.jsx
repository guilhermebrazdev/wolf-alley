import { createContext, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import api from "../../services/api";
import { SignUpSchema } from "../../schemas";

const SignUpContext = createContext();

export const SignUpProvider = ({ children }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignUpSchema),
  });

  async function signUp(data) {
    console.log("Inserindo cliente");

    data.isAdm = false;

    console.log("data ", data);

    await api
      .post("/clients", data)
      .then((response) => {
        console.log("deu certoooo");
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
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
