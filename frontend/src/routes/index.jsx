import { Switch } from "react-router-dom";

import { Login, Dashboard, SignUp, Home } from "../pages";

import Route from "./route";

const Routes = () => {
  //   const token = localStorage.getItem("@WolfAlley:Token");

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/signUp" component={SignUp} />
    </Switch>
  );
};

export default Routes;
