import { useFormik } from "formik";
import React, { ReactElement, useEffect, useMemo } from "react";
import { Form } from "react-bootstrap";
import { getAdminFromLocal } from "../../../../utilities";

export default function AdminProfile(): ReactElement {
  const admin = useMemo(() => getAdminFromLocal(), []);

  useEffect(() => {
    getAdminFromLocal();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      about: "",
      avt: "",
      cover: "",
      categoryId: 1,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <Form></Form>
    </>
  );
}
