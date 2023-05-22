import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const localCart = localStorage.getItem("@WolfAlley:Cart");

  const [cart, setCart] = useState(localCart ? JSON.parse(localCart) : []);

  function addToCart(product) {
    let productInCart = cart.find(
      (eachProduct) => eachProduct.id === product.id
    );

    if (!productInCart) {
      product.quantity = 1;
      const newCart = [...cart, product];
      setCart(newCart);

      localStorage.setItem("@WolfAlley:Cart", JSON.stringify(newCart));
    } else {
      productInCart.quantity++;

      localStorage.setItem("@WolfAlley:Cart", JSON.stringify(cart));
    }
  }

  function removeFromCart(product) {
    if (product.quantity > 1) {
      const newProduct = { ...product, quantity: product.quantity - 1 };

      const newCart = cart.map((element) =>
        element === product ? newProduct : element
      );

      setCart(newCart);

      localStorage.setItem("@WolfAlley:Cart", JSON.stringify(newCart));
    } else {
      const newCart = cart.filter((element) => element !== product);
      setCart(newCart);
      localStorage.setItem("@WolfAlley:Cart", JSON.stringify(newCart));
    }
  }

  return (
    <CartContext.Provider value={{ addToCart, removeFromCart, cart }}>
      {children}
    </CartContext.Provider>
  );
};

export const CartCtxt = () => useContext(CartContext);
