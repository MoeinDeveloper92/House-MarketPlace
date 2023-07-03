import React from "react";
import Spinner from "./Spinner";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    return <Spinner />;
  } else {
    return loggedIn ? <Outlet /> : <Navigate to={"/sign-in"} />;
  }
};
//check to see whether the user has been logged in or not
export default PrivateRoute;
