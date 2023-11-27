// import React from "react";
import React, { useState, useEffect } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaSignOutAlt } from "react-icons/fa";
import "../css/component/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../actions/userActions";
import { checkVerify } from "../actions/userActions";

const NavbarComponent = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const { isVerified, verify_status } = useSelector(
    (state) => state.verify_status
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(checkVerify());
    };

    fetchData();
  }, [dispatch]);

  const logoutHandler = async () => {
    dispatch(logout());
    navigate("/");
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

          {!user && (
            <LinkContainer to="/home">
              <Nav.Link className="products">HOME</Nav.Link>
            </LinkContainer>
          )}

          {user ? (
            <>
              {user.roles === "admin" && (
                <>
                  <LinkContainer to="/adminVerify">
                    <Nav.Link>Verify Request</Nav.Link>
                  </LinkContainer>
                </>
              )}
              {user.roles === "user" && (
                <>
                  <LinkContainer to="/products">
                    <Nav.Link>PRODUCT</Nav.Link>
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
              )}

              {user.roles === "user" && (
                <span className="text-dot-200">
                  {user && user.f_name}
                  {" : "}
                  {isVerified ? "Verified" : "Need Verified"}
                </span>
              )}

              <div className="logout" onClick={logoutHandler}>
                <FaSignOutAlt />
              </div>
            </>
          ) : (
            <>
              <LinkContainer to="/about">
                <Nav.Link>ABOUT</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/faqs">
                <Nav.Link>FAQs</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/login">
                <Nav.Link>SIGN IN</Nav.Link>
              </LinkContainer>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
