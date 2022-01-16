import { useFormik } from "formik";
import * as React from "react";
import { Container, Form } from "react-bootstrap";
import { login } from "../../../../apis/service";
import UnAuth from "../../../../guard/UnAuthGuard";
import { IAdmin } from "../../../../interface";
import style from "./style.module.css";
import image from "../../../../logo/techdevnews_logo.png";
import { useState } from "react";
import * as Yup from "yup";

const LoginFormComponent = () => {
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .email("Invalid email format")
        .required("Required!"),
      password: Yup.string()
        .min(4, "Minimum 4 characters")
        .required("Required!"),
    }),
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
          <div className="text-center">
            <img alt="" src={image} className="w-25" />
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
                {formik.touched.userName && formik.errors.userName ? (
                  <p className={`${style.error}`}>{formik.errors.userName}</p>
                ) : null}
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
                {formik.touched.password && formik.errors.password ? (
                  <p className={`${style.error}`}>{formik.errors.password}</p>
                ) : null}
              </Form.Group>

              <button className={style.button} type="submit">
                Login
              </button>
            </Form>
          </div>
          {/* 
          {formik.touched.password && formik.errors.password ? (
            <ToastContainer position="bottom-end" className="p-3">
              <Toast
                onClose={() => setShowToast(false)}
                show={showToast}
                delay={5000}
                autohide
                bg="success"
              >
                <Toast.Header>
                  <strong className="me-auto">Notification</strong>
                </Toast.Header>
                <Toast.Body className="bg-light ">
                  Edit profile successfully!
                </Toast.Body>
              </Toast>
            </ToastContainer>
          ) : null} */}
        </Container>
      </div>
    </UnAuth>
  );
};

export default LoginFormComponent;
