import { CartCtxt } from "../../../context/Cart";
import { OrderCtxt } from "../../../context/Order";
import { ProductCtxt } from "../../../context/Product";
import Button from "../../Button";

import { Container } from "./style";

const CheckoutModal = () => {
  const { setConfirmModal, confirmCheckout } = OrderCtxt();
  const { calculatePrice } = CartCtxt();
  const { formatarReal } = ProductCtxt();

  return (
    <Container onClick={() => setConfirmModal(false)}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1>Confirmar Compra?</h1>
        <p>{formatarReal(calculatePrice())}</p>
        <Button id={"confirmButton"} onClick={() => confirmCheckout()}>
          Confirmar !
        </Button>
      </div>
    </Container>
  );
};

export default CheckoutModal;
