import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import "./Header.css";
import { getCategoies, getSearch } from "../../apis/service";
import img from "../../logo/techdevnews_logo.png";
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
import { GoogleLogin, GoogleLogout } from "react-google-login";

function Header() {
  const [menuTitle, setTitle] = useState([]);
  const [valueInput, setValue] = useState("");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState({
    email: "",
    imageUrl: "",
    name: "",
  });
  const [show, setShow] = useState<boolean>(false);
  const typingTimeoutRef = useRef(0);
  const clientId =
    "421005288141-79gs72nt5s3divhvnm8fritsmjl2gnol.apps.googleusercontent.com";

  const onLoginSuccess = (res: any) => {
    localStorage.setItem("user", JSON.stringify(res.profileObj));
    setUser({
      email: res.profileObj.email,
      imageUrl: res.profileObj.imageUrl,
      name: res.profileObj.name,
    });
    setLoggedIn(true);
  };

  const onFailureSuccess = (res: any) => {
    console.log("Login Failure", res.profileObj);
  };

  const onLogout = () => {
    setUser({
      email: "",
      imageUrl: "",
      name: "",
    });
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
        <Navbar.Brand onClick={() => handleHome()}>
          <img
            style={{ cursor: "pointer" }}
            onClick={handleHome}
            src={img}
            className="logoApp"
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
                render={(renderProps) => (
                  <Nav.Link onClick={renderProps.onClick}>
                    <i className="far fa-user-circle"></i>
                  </Nav.Link>
                )}
                buttonText="Login"
                onSuccess={onLoginSuccess}
                onFailure={onFailureSuccess}
                cookiePolicy={"single_host_origin"}
              />
            ) : (
              <NavDropdown title={`${user.name}`} id="collasible-nav-dropdown">
                {/* <NavDropdown.Item href="#action/3.1">Logout</NavDropdown.Item> */}
                <GoogleLogout
                  clientId={clientId}
                  buttonText="Logout"
                  onLogoutSuccess={onLogout}
                ></GoogleLogout>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header;
