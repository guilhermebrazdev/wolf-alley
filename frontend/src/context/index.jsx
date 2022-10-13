import { MenuModalProvider } from "./MenuModal";
import { LoginProvider } from "./LoginPage";
import { SignUpProvider } from "./SignUpPage";

export const Providers = ({ children }) => {
  return (
    <MenuModalProvider>
      <SignUpProvider>
        <LoginProvider>{children}</LoginProvider>
      </SignUpProvider>
    </MenuModalProvider>
  );
};
