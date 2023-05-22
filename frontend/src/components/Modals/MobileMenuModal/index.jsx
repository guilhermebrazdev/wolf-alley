import { NavLink } from "react-router-dom";

import { Container } from "./style";

const MobileMenuModal = ({ navigateOptions }) => {
  return (
    <Container>
      <div>
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
      </div>
    </Container>
  );
};

export default MobileMenuModal;
