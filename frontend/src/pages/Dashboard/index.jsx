import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { ProductCtxt } from "../../context/Product";
import ProductCard from "../../components/Products/ProductCard";

import { Container, ProductsBox, ProductsContainer } from "./style";

const Dashboard = () => {
  const { products, getProducts } = ProductCtxt();

  useEffect(() => getProducts(), []);

  return (
    <Container>
      <ProductsContainer>
        <ProductsBox>
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>Nenhum produto cadastrado!</p>
          )}
        </ProductsBox>
      </ProductsContainer>
    </Container>
  );
};

export default Dashboard;
