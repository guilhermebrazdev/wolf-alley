import hammer from "../../../assets/martelo_thor.png";
import { ProductCtxt } from "../../../context/Product";

import { FaTrash } from "react-icons/fa";

import { Container } from "./style";

const ProductInCart = ({ product }) => {
  const { formatarReal } = ProductCtxt();

  return (
    <Container>
      <img src={hammer} alt={product.name} />
      <div>
        <h1>{product.name}</h1>
        <p>{product.quantity}X</p>
        <h3>{formatarReal(product.quantity * product.price)}</h3>
      </div>
      <FaTrash />
    </Container>
  );
};

export default ProductInCart;
