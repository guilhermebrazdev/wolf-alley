import * as yup from "yup";

const SignUpSchema = yup.object().shape({
  name: yup.string().required("Campo Obrigatório"),
  email: yup.string().required("Campo obrigatório").email("Email inválido"),
  cpf: yup.string().required("Campo obrigatório"),
  password: yup
    .string()
    .required("Campo obrigatório")
    .min(6, "Mínimo de 6 dígitos"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Senhas diferentes"),
  birthday: yup
    .date()
    .required("Campo obrigatório")
    .max(new Date(), "Não é possível selecionar uma data futura"),
  isAdm: yup.boolean(),
});

export default SignUpSchema;
