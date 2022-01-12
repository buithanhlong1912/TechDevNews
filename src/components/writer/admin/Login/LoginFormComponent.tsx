import { useFormik } from "formik";
import * as React from "react";
import { Button, Form } from "react-bootstrap";
import { login } from "../../../../apis/service";
import UnAuth from "../../../../guard/UnAuthGuard";
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

      const admin: IAdmin = { ...response, password: "" };
      localStorage.setItem("admin", JSON.stringify(admin));
    },
  });

  return (
    <UnAuth orRedirectTo="/admin/manage-article">
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
    </UnAuth>
  );
};

export default LoginFormComponent;
