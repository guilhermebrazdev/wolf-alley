import * as yup from "yup";

const LoginSchema = yup.object().shape({
  email: yup.string().required("Campo obrigatório").email("Email inválido"),
  password: yup
    .string()
    .required("Campo obrigatório")
    .min(6, "Mínimo de 6 dígitos"),
});

export default LoginSchema;
