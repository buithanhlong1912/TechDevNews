import * as React from "react";
import { FC } from "react";
import { Navigate } from "react-router-dom";

const checkLogin = (): boolean => {
  const auth = localStorage.getItem("admin");
  if (auth) return true;
  return false;
};

const UnAuth: FC<{ orRedirectTo: string }> = (props) => {
  return checkLogin() ? (
    <Navigate to={props.orRedirectTo} />
  ) : (
    <>{props.children}</>
  );
};

export default UnAuth;
