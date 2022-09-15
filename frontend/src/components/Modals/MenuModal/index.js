import { Container } from "./style";

const MenuModal = ({ closingModal }) => {
  return (
    <Container>
      <div>
        <p onClick={() => closingModal()}>Home</p>
        <p onClick={() => closingModal()}>Registre-se</p>
        <p onClick={() => closingModal()}>Login</p>
      </div>
    </Container>
  );
};

export default MenuModal;
