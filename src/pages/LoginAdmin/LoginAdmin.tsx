import * as React from "react";
import LoginFormComponent from "../../components/writer/admin/Login/LoginFormComponent";
import style from "./style.module.css";

const AdminLogin = () => {
  return (
    <div className={"position-relative " + style.form}>
      <LoginFormComponent />
    </div>
  );
};

export default AdminLogin;
