import React, { ReactElement, useState } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";


interface Props { }

export default function AdminHeader({ }: Props): ReactElement {
  const [activeClass, setActiveClass] = useState("manage");

  return (
    <header>
      <h1 className="text-center my-2">Admin Dashboard</h1>
      <div>
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
      </div>
    </header>
  );
}
