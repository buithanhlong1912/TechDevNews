import { useFormik } from "formik";
import React, { ReactElement, useCallback, useState } from "react";
import { useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { IAdmin } from "../../../../interface";
import { getAdminFromLocal } from "../../../../utilities";

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
  let admin = getAdminFromLocal();

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      about: "",
      avatar: "",
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      admin.info.name = values.name;
      admin.info.about = values.about;
      admin.info.avt = values.avatar;
      localStorage.setItem("admin", JSON.stringify(admin));
      setEditEnable(false);
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
        </Form.Group>
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
