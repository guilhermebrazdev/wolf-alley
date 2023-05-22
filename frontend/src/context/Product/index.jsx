import { createContext, useContext, useState } from "react";
import api from "../../services/api";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  function getProducts() {
    api
      .get("/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.log(error));
  }

  function formatarReal(price) {
    const formatedPrice = (price / 100).toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
    return formatedPrice;
  }

  return (
    <ProductContext.Provider value={{ getProducts, products, formatarReal }}>
      {children}
    </ProductContext.Provider>
  );
};

export const ProductCtxt = () => useContext(ProductContext);
