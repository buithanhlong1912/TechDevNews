import React, { useState, useEffect } from "react";
import  "./Header.css";
import { getCategoies } from "../../apis/service";
import img from "../../logo/techdevnews_logo.png"
import { Button, Container, Form, FormControl, Nav, Navbar, NavDropdown } from "react-bootstrap";

function Header() {
  const [statusSearch, setStatus] = useState(false);
  const [menuTitle, setTitle] = useState([]);

  function handleClickSearch() {
    setStatus(!statusSearch);
  }
  useEffect(() => {
    getCategoies().then((data) => {
      setTitle(data);
    });
  }, []);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img src={img} className="logoApp"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Programming</Nav.Link>
            <Nav.Link href="#pricing">UI/UX</Nav.Link>
            <Nav.Link href="#pricing">Mobile</Nav.Link>
            <Nav.Link href="#pricing">Internet</Nav.Link>
            <Nav.Link href="#pricing">Block Chain</Nav.Link>
          </Nav>
          <Nav>
            <Form className="d-flex mr-3">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="btn btn-outline-light"><i className="fas fa-search"></i></Button>
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
