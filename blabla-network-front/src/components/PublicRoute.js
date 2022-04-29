import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "../utils/common";

function PublicRoute({ component: Component, ...rest }) {
  const token = getToken();
  return (
    <Route {...rest} render={(props) => (
       !token
        ? <Component {...props} /> 
        : <Redirect to={{ pathname: "/profile" }} />
    )} />
  );
}

export default PublicRoute;
