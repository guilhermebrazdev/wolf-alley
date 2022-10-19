import { NavLink } from "react-router-dom";
import { Container } from "./style";

const DesktopMenu = ({ navigateOptions }) => {
  return (
    <Container>
      <NavLink
        exact
        to={navigateOptions.firstOpt.path}
        activeStyle={{
          color: "gold",
        }}
      >
        {navigateOptions.firstOpt.value}
      </NavLink>
      <NavLink
        to={navigateOptions.secOpt.path}
        activeStyle={{
          color: "gold",
        }}
      >
        {navigateOptions.secOpt.value}
      </NavLink>
      <NavLink
        to={navigateOptions.thirdOpt.path}
        activeStyle={{
          color: "gold",
        }}
      >
        {navigateOptions.thirdOpt.value}
      </NavLink>
    </Container>
  );
};

export default DesktopMenu;
