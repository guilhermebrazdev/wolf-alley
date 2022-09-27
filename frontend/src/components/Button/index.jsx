import { Container } from "./style";

const Button = ({ children, type }) => {
  return (
    <Container>
      <button type={type}>{children}</button>
    </Container>
  );
};

export default Button;
