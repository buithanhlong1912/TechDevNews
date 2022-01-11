import * as React from "react";
import { useState } from "react";
import style from "./test.module.css";

const LoginFormComponent = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <>
      <h1 className={style.error}>This is Form Login</h1>
    </>
  );
};

export default LoginFormComponent;
