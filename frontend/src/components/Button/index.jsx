import { Container } from "./style";

const Button = ({ children, type, onClick, id }) => {
  return (
    <Container id={id}>
      <button onClick={onClick} type={type}>
        {children}
      </button>
    </Container>
  );
};

export default Button;
