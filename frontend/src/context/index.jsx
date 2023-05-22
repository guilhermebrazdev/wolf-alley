import { MenuModalProvider } from "./MenuModal";
import { ClientProvider } from "./Client";
import { ProductProvider } from "./Product";
import { CartProvider } from "./Cart";
import { OrderProvider } from "./Order";

export const Providers = ({ children }) => {
  return (
    <MenuModalProvider>
      <ClientProvider>
        <ProductProvider>
          <CartProvider>
            <OrderProvider>{children}</OrderProvider>
          </CartProvider>
        </ProductProvider>
      </ClientProvider>
    </MenuModalProvider>
  );
};
