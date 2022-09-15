import { MenuModalProvider } from "./MenuModal";

export const Providers = ({ children }) => {
  return <MenuModalProvider>{children}</MenuModalProvider>;
};
