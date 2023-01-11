import { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { ClientCtxt } from "../context/Client";

const Rota = ({ isPrivate = false, Component }) => {
  const { authenticating } = ClientCtxt();

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
