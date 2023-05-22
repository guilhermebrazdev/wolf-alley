import { Container } from "./style";

const Input = ({ children, error, register, ...rest }) => {
  return (
    <Container>
      <label>{rest.placeholder}</label>
      <section>
        {children}
        <input {...rest} {...register(rest.name)} />
      </section>
      {error && <p>{error}</p>}
    </Container>
  );
};

export default Input;
