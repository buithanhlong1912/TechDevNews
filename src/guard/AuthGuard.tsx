import * as React from "react";
import { FC } from "react";
import { Navigate } from "react-router-dom";

const checkLogin = (): boolean => {
  const auth = localStorage.getItem("admin");
  if (auth) return true;
  return false;
};

const Auth: FC<{ orRedirectTo: string }> = (props) => {
  return checkLogin() ? (
    <>{props.children}</>
  ) : (
    <Navigate to={props.orRedirectTo} />
  );
};

export default Auth;
