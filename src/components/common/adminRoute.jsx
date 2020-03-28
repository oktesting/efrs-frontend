import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authService";

const AdminRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!auth.isAuthenticated())
          return (
            <Redirect
              to={{ pathname: "/signin", state: { from: props.location } }}
            />
          );
        else if (!auth.isAdmin())
          return <Redirect to={{ pathname: "/not-found" }} />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default AdminRoute;
