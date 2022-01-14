import React, { useState, useEffect } from "react";
import "./Header.css";
import { getCategoies } from "../../apis/service";
import img from "../../logo/techdevnews_logo.png";
import logo from "../../logo/techdevnews_logo.svg";

import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Header() {
  const [menuTitle, setTitle] = useState([]);
  const [showLogin, setShowLogin] = useState<boolean>(true);

  const Navigate = useNavigate();
  useEffect(() => {
    getCategoies().then((data) => {
      setTitle(data);
    });
  }, []);

  const handleCategory = (id: number) => {
    Navigate(`/category/${id}`);
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="">
          <img src={logo} className="logoApp" width="100" height="100" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {menuTitle?.map((item: any, index: number) => (
              <Nav.Link onClick={() => handleCategory(item.id)}>
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
              />
              <Button variant="btn btn-outline-light">
                <i className="fas fa-search"></i>
              </Button>
            </Form>
            &nbsp;&nbsp;&nbsp;
            {/* <Nav.Link href="#deets"><i className="far fa-user-circle"></i></Nav.Link> Nếu chưa đăng nhập thì icon này*/}
            <NavDropdown title="Hi, User" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header;
