import ProductInCart from "../../components/Products/ProductInCart";
import { CartCtxt } from "../../context/Cart";
import { ProductCtxt } from "../../context/Product";
import Button from "../../components/Button";

import { Container } from "./style";

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
      <div>
        {cart.map((product) => (
          <ProductInCart product={product} key={product.id} />
        ))}
        <section>
          <h1>{formatarReal(totalPrice)}</h1>
          <Button id={"buyButton"}>Comprar !</Button>
        </section>
      </div>
    </Container>
  );
};

export default Cart;
