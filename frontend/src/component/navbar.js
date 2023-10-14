import React, { useState, useEffect } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaSignOutAlt } from "react-icons/fa";
import "../css/component/navbar.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const NavbarComponent = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/auth/me`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const logoutHandler = async () => {
    window.location.reload();
    Cookies.remove("token");
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link}>
          <img src="../rns_logo.png" alt="Logo" className="navbar-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>
          <LinkContainer to="/products">
            <Nav.Link className="products">PRODUCT</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/myProducts">
            <Nav.Link className="my-product">MY PRODUCT</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/about">
            <Nav.Link className="about">ABOUT</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/faqs">
            <Nav.Link className="faqs">FAQs</Nav.Link>
          </LinkContainer>
          <span className="text-dot-200">{user ? user.f_name : "Guest"}</span>
          <div className="logout" onClick={logoutHandler}>
            <FaSignOutAlt />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
