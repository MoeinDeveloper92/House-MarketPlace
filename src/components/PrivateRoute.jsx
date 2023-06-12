import React from "react";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "./Spinner";
// outlet allows us to render child compienet
// any route that you want to make it private you need to use outlet
const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return (
      <h3>
        <Spinner />
      </h3>
    );
  }
  return loggedIn ? <Outlet /> : <Navigate to={"/sign-in"} />;
};

// Here you may fix memory lead warning

export default PrivateRoute;
