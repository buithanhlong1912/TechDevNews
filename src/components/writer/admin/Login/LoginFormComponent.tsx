import { useFormik } from "formik";
import * as React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { login } from "../../../../apis/service";
import { IAdmin } from "../../../../interface";
import style from "./style.module.css";

const LoginFormComponent = () => {
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit: async (values) => {
      const response = await login(values);
      // localStorage.setItem("admin")

      const admin: IAdmin = response;
      console.log(admin);
      // localStorage.setItem("admin", JSON.stringify(admin));
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {},
  });

  return (
    <Form
      className={`position-absolute start-50 top-100 translate-middle ${style.formCont}`}
      onSubmit={formik.handleSubmit}
    >
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          name="userName"
          placeholder="Enter your email address"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.userName}
          type="email"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          placeholder="Enter your password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          type="password"
        />
      </Form.Group>
      <Button type="submit" variant="primary">
        Login
      </Button>
    </Form>
  );
};

export default LoginFormComponent;
