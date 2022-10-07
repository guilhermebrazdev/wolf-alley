import { MenuModalProvider } from "./MenuModal";
import { LoginProvider } from "./LoginPage";

export const Providers = ({ children }) => {
  return (
    <MenuModalProvider>
      <LoginProvider>{children}</LoginProvider>
    </MenuModalProvider>
  );
};
