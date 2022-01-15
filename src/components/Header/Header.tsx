import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import "./Header.css";
import { getCategoies, getSearch } from "../../apis/service";
import img from "../../logo/techdevnews_logo.png";
import logo from "../../logo/techdevnews_logo.svg";

import {
  Button,
  Container,
  Form,
  FormControl,
  Modal,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Login from "./login/Login";
import { GoogleLogin } from "react-google-login";

function Header() {
  const [menuTitle, setTitle] = useState([]);
  const [valueInput, setValue] = useState("");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const typingTimeoutRef = useRef(0);
  const clientId =
    "421005288141-79gs72nt5s3divhvnm8fritsmjl2gnol.apps.googleusercontent.com";

  const onLoginSuccess = (res: any) => {
    console.log("Login Success", res.profileObj);
  };

  const onFailureSuccess = (res: any) => {
    console.log("Login Failure", res.profileObj);
  };

  const Navigate = useNavigate();
  useEffect(() => {
    getCategoies().then((data) => {
      setTitle(data);
    });
  }, []);

  const handleCategory = (id: number) => {
    Navigate(`/home/category/${id}`);
  };

  const handleHome = () => {
    Navigate(`/home`);
  };

  const handleChangeSearch = (event: ChangeEvent<any>): void => {
    const value = event.target.value;
    setValue(value);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = window.setTimeout(() => {
      setValue(value);
    }, 400);
  };

  const handleClickSearch = () => {
    if (valueInput) {
      Navigate(`article/search/${valueInput}`);
    }
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="sticky-top"
    >
      <Container>
        <Navbar.Brand href="">
          <img
            style={{ cursor: "pointer" }}
            onClick={handleHome}
            src={logo}
            className="logoApp"
            width="100"
            height="100"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {menuTitle?.map((item: any, index: number) => (
              <Nav.Link key={index} onClick={() => handleCategory(item.id)}>
                {item.title}
              </Nav.Link>
            ))}
          </Nav>
          <Nav>
            <Form className="d-flex mr-3">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(event) => handleChangeSearch(event)}
              />
              <Button
                variant="btn btn-outline-light"
                onClick={handleClickSearch}
              >
                <i className="fas fa-search"></i>
              </Button>
            </Form>
            &nbsp;&nbsp;&nbsp;
            {!loggedIn ? (
              <GoogleLogin
                clientId={clientId}
                // render={() => (
                //   <Nav.Link>
                //     <i className="far fa-user-circle"></i>
                //   </Nav.Link>
                // )}
                buttonText="Login"
                onSuccess={onLoginSuccess}
                onFailure={onFailureSuccess}
                cookiePolicy={"single_host_origin"}
              />
            ) : (
              <NavDropdown title="Hi, User" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Logout</NavDropdown.Item>
              </NavDropdown>
            )}
            {/* <Modal show={show} onHide={() => setShow(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Login />
              </Modal.Body>
            </Modal> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header;
