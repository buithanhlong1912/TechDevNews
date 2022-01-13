import React, { ReactElement, useState } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IAdmin } from "../../../../interface";
import { getEmailFromLocal } from "../../../../utilities";

interface Props {}

export default function AdminHeader({}: Props): ReactElement {
  const [activeClass, setActiveClass] = useState("manage");
  const userName = getEmailFromLocal();

  return (
    <header>
      <h1 className="text-center my-2 ">Admin Dashboard</h1>
      <div className="d-flex justify-content-between align-items-center">
        <Nav variant="pills">
          <Nav.Item>
            <Link
              className={
                `nav-link ` + (activeClass === "manage" ? "active" : "")
              }
              to={"/admin/manage-article"}
              onClick={() => {
                setActiveClass("manage");
              }}
            >
              Manage Article
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link
              className={
                `nav-link ` + (activeClass === "profile" ? "active" : "")
              }
              to={"/admin/profile"}
              onClick={() => {
                setActiveClass("profile");
              }}
            >
              Profile
            </Link>
          </Nav.Item>
        </Nav>
        <a>{userName}</a>
      </div>
    </header>
  );
}
