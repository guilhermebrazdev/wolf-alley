import hammer from "../../../assets/martelo_thor.png";
import Button from "../../Button";
import { ProductCtxt } from "../../../context/Product";
import { CartCtxt } from "../../../context/Cart";

import { Card, InfoBox } from "./style";

const ProductCard = ({ product }) => {
  const { formatarReal } = ProductCtxt();
  const { addToCart, showCart } = CartCtxt();

  return (
    <Card>
      <div>
        <img src={hammer} alt={product.name} />
      </div>
      <InfoBox>
        <div>
          <h1>{product.name}</h1>
          <h3>{formatarReal(product.price)}</h3>
          <Button id="buyButton" onClick={() => addToCart(product)}>
            Adicionar!
          </Button>
        </div>
      </InfoBox>
    </Card>
  );
};

export default ProductCard;
