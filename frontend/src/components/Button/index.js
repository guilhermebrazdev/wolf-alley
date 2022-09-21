import { Container } from "./style";

const Button = ({ children }) => {
  return (
    <Container>
      <button>{children}</button>
    </Container>
  );
};

export default Button;
