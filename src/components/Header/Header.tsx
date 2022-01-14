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
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Header() {
  const [menuTitle, setTitle] = useState([]);
  const [valueInput, setValue] = useState("");
  const typingTimeoutRef = useRef(0);

  const Navigate = useNavigate();
  useEffect(() => {
    getCategoies().then((data) => {
      setTitle(data);
    });
  }, []);

  const handleCategory = (id: number) => {
    Navigate(`/category/${id}`);
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
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="">
          <img src={logo} className="logoApp" width="100" height="100" />
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
