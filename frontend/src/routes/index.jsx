import { Switch } from "react-router-dom";

import { Login, Dashboard, SignUp, Home, Cart } from "../pages";

import Rota from "./route";

const Routes = () => {
  return (
    <Switch>
      <Rota exact path="/" Component={Home} />
      <Rota path="/login" Component={Login} />
      <Rota path="/signUp" Component={SignUp} />
      <Rota path="/dashboard" Component={Dashboard} isPrivate />
      <Rota path="/cart" Component={Cart} isPrivate />
    </Switch>
  );
};

export default Routes;
