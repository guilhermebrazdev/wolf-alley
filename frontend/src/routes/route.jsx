import { Redirect, Route as ReactDOMRoute } from "react-router-dom";

const Route = ({ isPrivate = false, Component, ...rest }) => {
  const authToken = localStorage.getItem("@WolfAlley:Token");
  return (
    <ReactDOMRoute
      {...rest}
      render={() =>
        isPrivate === !!authToken ? (
          <Component></Component>
        ) : (
          <Redirect to={isPrivate ? "/" : "/dashboard"} />
        )
      }
    />
  );
};

export default Route;
