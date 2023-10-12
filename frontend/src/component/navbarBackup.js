import React, { Fragment, useState, useEffect } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaSignOutAlt } from "react-icons/fa";
import "../css/component/navbar.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const NavbarComponent = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");

  const logoutHandler = async () => {
    localStorage.removeItem("email");
    localStorage.removeItem("status");
    Cookies.remove("token");
    window.location.reload();
  };

  useEffect(() => {
    const getStatus = localStorage.getItem("status");
    const getEmail = localStorage.getItem("email");

    setStatus(getStatus);
    setEmail(getEmail);
    setHasLoaded(true);
  }, []);

  return (
    <Fragment>
      {hasLoaded && (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to={status === "1" ? "/home" : "/products"}>
              <img src="../rns_logo.png" alt="Logo" className="navbar-logo" />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <div className="rectangle"></div>
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              ></Nav>
              {status === "1" ? (
                <>
                  <LinkContainer to="/products">
                    <Nav.Link className="products">PRODUCT</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/myProducts">
                    <Nav.Link>MY PRODUCT</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/about">
                    <Nav.Link>ABOUT</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/faqs">
                    <Nav.Link>FAQs</Nav.Link>
                  </LinkContainer>
                </>
              ) : null}

              <div className="logout" onClick={logoutHandler}>
              <span className="text-dot-200"> {email} </span>
                {" "}
                {/* {email} */}
                <FaSignOutAlt style={{ color: "#be9f4e", cursor: "pointer" }} />
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
      {!hasLoaded && <Fragment>Loading...</Fragment>}
    </Fragment>
  );
};

export default NavbarComponent;
