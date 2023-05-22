import { MenuModalProvider } from "./MenuModal";
import { ClientProvider } from "./Client";
import { ProductProvider } from "./Product";
import { CartProvider } from "./Cart";

export const Providers = ({ children }) => {
  return (
    <MenuModalProvider>
      <ClientProvider>
        <ProductProvider>
          <CartProvider>{children}</CartProvider>
        </ProductProvider>
      </ClientProvider>
    </MenuModalProvider>
  );
};
