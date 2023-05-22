import ProductInCart from "../../components/Products/ProductInCart";
import { CartCtxt } from "../../context/Cart";
import { ProductCtxt } from "../../context/Product";
import Button from "../../components/Button";
import CheckoutModal from "../../components/Modals/CheckoutModal";
import { OrderCtxt } from "../../context/Order";

import { Container, CartBox, EmptyCart } from "./style";

import { BsCartX } from "react-icons/bs";

const Cart = () => {
  const { formatarReal } = ProductCtxt();
  const { cart, calculatePrice } = CartCtxt();

  const { confirmModal, setConfirmModal } = OrderCtxt();

  return (
    <Container>
      {confirmModal && <CheckoutModal />}
      {cart.length > 0 ? (
        <CartBox>
          {cart.map((product) => (
            <ProductInCart product={product} key={product.id} />
          ))}
          <section>
            <h1>{formatarReal(calculatePrice())}</h1>
            <Button onClick={() => setConfirmModal(true)} id={"buyButton"}>
              Comprar !
            </Button>
          </section>
        </CartBox>
      ) : (
        <EmptyCart>
          <div>
            <BsCartX />
            <h1>Carrinho vazio!</h1>
          </div>
        </EmptyCart>
      )}
    </Container>
  );
};

export default Cart;
