import { useFormik } from "formik";
import * as React from "react";
import { Container, Form } from "react-bootstrap";
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

      if (response !== false) {
        const admin: IAdmin = { ...response, password: "" };
        localStorage.setItem("admin", JSON.stringify(admin));
      } else {
        return false;
      }
    },
  });

  return (
    <UnAuth orRedirectTo="/admin/manage-article">
      <div
        className={`position-absolute start-50 top-100 translate-middle ${style.wrapper}`}
      >
        <Container className="d-flex align-items-center justify-content-center h-100">
          <Form onSubmit={formik.handleSubmit} className="text-center">
            <h1 className={style.title}>Admin Login</h1>
            <Form.Group className="mb-3">
              <input
                name="userName"
                className={style.input}
                placeholder="Enter your email address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userName}
                type="email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <input
                name="password"
                className={style.input}
                placeholder="Enter your password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                type="password"
              />
            </Form.Group>

            <button className={style.button} type="submit">
              Login
            </button>
          </Form>
        </Container>
      </div>
    </UnAuth>
  );
};

export default LoginFormComponent;
