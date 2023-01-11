import ProductInCart from "../../components/Products/ProductInCart";
import { CartCtxt } from "../../context/Cart";
import { ProductCtxt } from "../../context/Product";
import Button from "../../components/Button";

import { Container, CartBox, EmptyCart } from "./style";

import { BsCartX } from "react-icons/bs";

const Cart = () => {
  const { formatarReal } = ProductCtxt();
  const { cart } = CartCtxt();

  const totalPrice = cart.reduce(
    (acc, currentProduct) =>
      acc + currentProduct.price * currentProduct.quantity,
    0
  );

  return (
    <Container>
      {cart.length > 0 ? (
        <CartBox>
          {cart.map((product) => (
            <ProductInCart product={product} key={product.id} />
          ))}
          <section>
            <h1>{formatarReal(totalPrice)}</h1>
            <Button id={"buyButton"}>Comprar !</Button>
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
