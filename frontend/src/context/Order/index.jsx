import { createContext, useContext, useState } from "react";
import { CartCtxt } from "../Cart";
import { ClientCtxt } from "../Client";
import api from "../../services/api";
import { toast } from "react-hot-toast";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [confirmModal, setConfirmModal] = useState(false);

  const { cart, setCart } = CartCtxt();
  const { token, client } = ClientCtxt();

  async function confirmCheckout() {
    let checkoutList = { products: [] };
    cart.map((element) =>
      checkoutList.products.push({
        product_id: element.id,
        quantity: element.quantity,
      })
    );

    const cpf = client.cpf;

    if (checkoutList.products.length > 0) {
      const headers = { Authorization: `Bearer: ${token}` };

      await api
        .post(`/clients/checkout/${cpf}`, checkoutList, { headers })
        .then((response) => {
          console.log(response);
          setCart([]);
          localStorage.setItem("@WolfAlley:Cart", JSON.stringify([]));
          toast.success("Compra realizada com sucesso!");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Algo deu errado na compra!");
        });
    }

    setConfirmModal(false);
  }

  return (
    <OrderContext.Provider
      value={{ confirmModal, setConfirmModal, confirmCheckout }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const OrderCtxt = () => useContext(OrderContext);
