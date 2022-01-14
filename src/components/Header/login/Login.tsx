import * as React from "react";
import { useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";

const Login = () => {
  const clientId =
    "421005288141-79gs72nt5s3divhvnm8fritsmjl2gnol.apps.googleusercontent.com";

  // const responseGoogle = (response: any) => {
  //   console.log(response);
  // };

  const onLoginSuccess = (res: any) => {
    console.log("Login Success", res.profileObj);
  };

  const onFailureSuccess = (res: any) => {
    console.log("Login Failure", res.profileObj);
  };

  return (
    <>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onLoginSuccess}
        onFailure={onFailureSuccess}
        cookiePolicy={"single_host_origin"}
      />
      {/* <GoogleLogout
        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={onSignoutSuccess}
      ></GoogleLogout> */}
    </>
  );
};

export default Login;
