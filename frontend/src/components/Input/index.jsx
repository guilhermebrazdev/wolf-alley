import { Container } from "./style";

const Input = ({ children, error, ...rest }) => {
  return (
    <Container>
      {children}
      <input {...rest} />
      {error && <p>Necessário</p>}
    </Container>
  );
};

export default Input;
