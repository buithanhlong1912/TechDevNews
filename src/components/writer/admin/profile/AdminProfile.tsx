import { useFormik } from "formik";
import React, { ReactElement, useState } from "react";
import { useEffect } from "react";
import { Button, Form, Toast, ToastContainer } from "react-bootstrap";
import { editAccountAdmin } from "../../../../apis/service";
import { IAdmin } from "../../../../interface";
import { getAdminFromLocal } from "../../../../utilities";
import * as Yup from "yup";
import style from "./style.module.css";
interface Props {
  adminAccount: IAdmin;
}

interface IAccountForm {
  email: string;
  name: string;
  about: string;
  avatar: string;
}

export default function AdminProfile({ adminAccount }: Props): ReactElement {
  const [editEnable, setEditEnable] = useState(false);
  const [showToast, setShowToast] = useState(false);
  let admin = getAdminFromLocal();

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      about: "",
      avatar: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required!"),
      about: Yup.string().required("Required!"),
      avatar: Yup.string().required("Required!"),
    }),
    onSubmit: async (values) => {
      admin.info.name = values.name;
      admin.info.about = values.about;
      admin.info.avt = values.avatar;
      await editAccountAdmin(admin);
      localStorage.setItem("admin", JSON.stringify(admin));
      setEditEnable(false);
      setShowToast(true);
    },
  });

  useEffect(() => {
    const adminAccClone: IAccountForm = {
      email: adminAccount.userName,
      name: adminAccount.info.name,
      about: adminAccount.info.about,
      avatar: adminAccount.info.avt,
    };
    formik.setValues(adminAccClone);
  }, []);

  return (
    <div>
      <h2 className="text-center">Profile</h2>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            disabled
            name="email"
            id="email"
            value={formik.values.email}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            id="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            disabled={!editEnable}
          />
          {formik.touched.name && formik.errors.name ? (
            <p className={`${style.error}`}>{formik.errors.name}</p>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>About</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            type="text"
            name="about"
            id="about"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.about}
            disabled={!editEnable}
          />
          {formik.touched.about && formik.errors.about ? (
            <p className={`${style.error}`}>{formik.errors.about}</p>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Avatar</Form.Label>
          <Form.Control
            type="text"
            name="avatar"
            id="avatar"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.avatar}
            disabled={!editEnable}
          />
          {formik.touched.avatar && formik.errors.avatar ? (
            <p className={`${style.error}`}>{formik.errors.avatar}</p>
          ) : null}
        </Form.Group>

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

        {!editEnable ? (
          <p
            className="btn btn-primary"
            onClick={() => {
              setEditEnable(true);
            }}
          >
            Edit
          </p>
        ) : (
          <Button variant="primary" type="submit">
            Submit
          </Button>
        )}
      </Form>
    </div>
  );
}
