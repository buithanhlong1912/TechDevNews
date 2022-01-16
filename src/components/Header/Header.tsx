import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import "./Header.css";
import {
  addAccountClient,
  checkClientExist,
  getCategoies,
  getSearch,
} from "../../apis/service";
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
import { getUserFromLocal } from "../../utilities";
import { useGlobalContext } from "../../context/GlobalContext";
import { ClientDTO, ClientModal } from "../../interface";

function Header() {
  const { setUser, loggedIn, setLoggedIn } = useGlobalContext();
  const [menuTitle, setTitle] = useState([]);
  const [valueInput, setValue] = useState("");
  const typingTimeoutRef = useRef(0);
  const clientId =
    "421005288141-79gs72nt5s3divhvnm8fritsmjl2gnol.apps.googleusercontent.com";

  const userName = getUserFromLocal();
  const { setPageIndex } = useGlobalContext();

  const onLoginSuccess = async (res: any) => {
    localStorage.setItem("user", JSON.stringify(res.profileObj));
    setUser({
      email: res.profileObj.email,
      imageUrl: res.profileObj.imageUrl,
      name: res.profileObj.name,
    });
    setLoggedIn(true);
    const result = await checkClientExist(res.profileObj.email);
    if (!result) {
      const client: ClientDTO = {
        email: res.profileObj.email,
        imageUrl: res.profileObj.imageUrl,
        name: res.profileObj.name,
        articlesLiked: [],
      };
      await addAccountClient(client);
    }
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
    localStorage.removeItem("user");
    setLoggedIn(false);
  };

  const Navigate = useNavigate();

  useEffect(() => {
    getCategoies().then((data) => {
      setTitle(data);
    });
    if (localStorage.getItem("user")) setLoggedIn(true);
  }, []);

  const handleCategory = (id: number) => {
    setPageIndex(1);
    Navigate(`/category/${id}`);
  };

  const handleHome = () => {
    Navigate(`/`);
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

  const handleSubmit = () => {
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
            alt="logoApp"
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
          <Nav className="align-items-center">
            <Form className="d-flex mr-3" onSubmit={handleSubmit}>
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(event) => handleChangeSearch(event)}
              />
              <Button variant="btn btn-outline-light" type="submit">
                <i className="fas fa-search"></i>
              </Button>
            </Form>
            &nbsp;&nbsp;&nbsp;
            {loggedIn || localStorage.getItem("user") ? (
              <NavDropdown
                title={`${userName.name}`}
                id="collasible-nav-dropdown"
              >
                {/* <NavDropdown.Item href="#action/3.1">Logout</NavDropdown.Item> */}
                <GoogleLogout
                  clientId={clientId}
                  render={(renderProps) => (
                    <NavDropdown.Item onClick={renderProps.onClick}>
                      <i className="fab fa-google me-2"></i> Logout
                    </NavDropdown.Item>
                  )}
                  buttonText="Logout"
                  onLogoutSuccess={onLogout}
                ></GoogleLogout>
              </NavDropdown>
            ) : (
              <GoogleLogin
                clientId={clientId}
                render={(renderProps) => (
                  <div
                    className="text-muted pointer"
                    onClick={renderProps.onClick}
                  >
                    <i className="far fa-user-circle fa-2x"></i>
                  </div>
                )}
                buttonText="Login"
                onSuccess={onLoginSuccess}
                onFailure={onFailureSuccess}
                cookiePolicy={"single_host_origin"}
              />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header;
