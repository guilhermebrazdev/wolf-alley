import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { ProductCtxt } from "../../context/Product";
import Button from "../../components/Button";
import ProductCard from "../../components/Products/ProductCard";

import { Container, ProductsBox, ProductsContainer } from "./style";

const Dashboard = () => {
  const history = useHistory();
  const { products, getProducts } = ProductCtxt();

  useEffect(() => getProducts(), []);

  return (
    <Container>
      <div>DASHBOARD</div>
      <Button
        onClick={() => {
          localStorage.clear();
          history.push("/");
        }}
      >
        Sair
      </Button>

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
