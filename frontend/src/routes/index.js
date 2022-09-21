import { Switch } from "react-router-dom";

import { Login, Dashboard, signUp } from "../pages";

import Route from "./route";

const Routes = () => {
  //   const token = localStorage.getItem("@WolfAlley:Token");

  return (
    <Switch>
      {/* <Route exact path="/" component={home} /> */}
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/signUp" component={signUp} />
    </Switch>
  );
};

export default Routes;
