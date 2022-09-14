import { Switch } from "react-router-dom";

import { Login, Dashboard, Register } from "../pages";

import Route from "./route";

const Routes = () => {
  //   const token = localStorage.getItem("@WolfAlley:Token");

  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/register" component={Register} />
    </Switch>
  );
};

export default Routes;
