import React, { ReactElement, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IAdmin } from "../../../../interface";
import { getEmailFromLocal } from "../../../../utilities";
import img from "../../../../logo/techdevnews_logo.png";
import style from "./style.module.css";

interface Props {}

export default function AdminHeader({}: Props): ReactElement {
  const [activeClass, setActiveClass] = useState("manage");
  const userName = getEmailFromLocal();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <header className="sticky-top">
      <div className={`${style.header}`}>
        <Navbar>
          <Container className="d-flex justify-content-between align-items-center">
            <Navbar.Brand className={`d-flex align-items-center `}>
              <img
                alt=""
                src={img}
                width="40"
                height="40"
                className="d-inline-block align-top"
              />{" "}
              <span className="ps-3 text-white">Admin Dashboard</span>
            </Navbar.Brand>
            <Nav variant="tabs" className="border-0">
              <Nav.Item>
                <Link
                  className={
                    `nav-link ${style.navItem} ` +
                    (activeClass === "manage" ? `active ${style.active}` : "")
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
                    `nav-link ${style.navItem} ` +
                    (activeClass === "profile" ? `active ${style.active}` : "")
                  }
                  to={"/admin/profile"}
                  onClick={() => {
                    setActiveClass("profile");
                  }}
                >
                  Change Profile
                </Link>
              </Nav.Item>
            </Nav>
            <Nav.Link className="text-white" onClick={handleLogout}>
              <span className={`${style.logoutBtn}`}>{userName}</span>
            </Nav.Link>
          </Container>
        </Navbar>
      </div>
    </header>
  );
}
