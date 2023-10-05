import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaSignOutAlt } from "react-icons/fa";
import "../css/component/navbar.css";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  const logoutHandler = async () => {
    window.location.reload();
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
            <Nav.Link class="products">PRODUCT</Nav.Link>
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
          <div className="logout" onClick={logoutHandler}>
            <span className="text-dot-200"> {"SuperUser"} </span>
            <FaSignOutAlt style={{ color: "#F7951F", cursor: "pointer" }} />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
