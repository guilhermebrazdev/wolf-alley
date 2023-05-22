import { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { ClientCtxt } from "../context/Client";

const Rota = ({ isPrivate = false, Component }) => {
  const { authenticating, authenticated } = ClientCtxt();

  useEffect(() => {
    authenticating();
  }, [Component]);

  return (
    <Route>
      {isPrivate === !!authenticated ? (
        <Component />
      ) : (
        <Redirect to={authenticated ? "/dashboard" : "/"} />
      )}
    </Route>
  );
};

export default Rota;
