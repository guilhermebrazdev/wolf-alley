import { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { LoginCtxt } from "../context/LoginPage";

const Rota = ({ isPrivate = false, Component }) => {
  const { authenticating } = LoginCtxt();

  useEffect(() => {
    authenticating();
  }, [Component]);

  const token = localStorage.getItem("@WolfAlley:Token");

  return (
    <Route>
      {isPrivate === !!token ? (
        <Component />
      ) : (
        <Redirect to={token ? "/dashboard" : "/"} />
      )}
    </Route>
  );
};

export default Rota;
