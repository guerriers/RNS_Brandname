import React, { useState, useEffect } from "react";
import { Nav, Navbar, Container, NavDropdown, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../actions/userActions";
import { checkVerify } from "../actions/userActions";
import "../css/component/navbar.css";
import {
  FaSignOutAlt,
  FaUserEdit,
  FaCheckCircle,
  FaShoppingBag,
  FaHeart,
} from "react-icons/fa";

const NavbarComponent = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const [imageUrl, setImageUrl] = useState("");
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

  useEffect(() => {
    if (user && user.profile_img) {
      try {
        const doubleEscapedString = user.profile_img;
        const singleEscapedString = doubleEscapedString.replace(/\\\"/g, '"');
        const parsedObj = JSON.parse(JSON.parse(singleEscapedString));
        // Assuming the inner object has a "url" property
        const imageUrl = parsedObj.url;
  
        setImageUrl(imageUrl);
      } catch (error) {
        console.error("Error parsing profile_img:", error);
      }
    }
  }, [user]);

  const logoutHandler = async () => {
    dispatch(logout());
    navigate("/");
  };

  const userProfile = "../assets/userProfile.png";
  {
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/home">
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

                  <div className="logout" onClick={logoutHandler}>
                    <FaSignOutAlt />
                  </div>
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
                  <span className="text-dot-200-nav">K. {user.f_name}</span>
                </>
              )}

              {user.roles === "user" && (
                <NavDropdown
                id="nav-dropdown-dark"
                title={
                  imageUrl ? (
                    <Image src={imageUrl} className="userProfile" alt="Profile Image" />
                  ) : (
                    <Image
                      src={userProfile}  /* Assuming userProfile is your default image */
                      className="userProfile"
                      alt="No Profile Image"
                    />
                  )
                }
                menuVariant="dark"
                >
                  <NavDropdown.Item disabled>
                    <span className="text-dot-200">
                      {isVerified ? "Verified" : "Need Verified"}{" "}
                      {isVerified ? (
                        <FaCheckCircle style={{ color: "#18af2a" }} />
                      ) : (
                        ""
                      )}
                    </span>
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/myProfile">
                    <FaUserEdit /> My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/myFavorite">
                    <FaHeart /> My Favorite product
                  </NavDropdown.Item>
                  {isVerified && (
                    <NavDropdown.Item as={Link} to={`/profile/${user.id}`}>
                      <FaShoppingBag /> Seller Profile
                    </NavDropdown.Item>
                  )}
                  <NavDropdown.Divider />

                  <NavDropdown.Item>
                    <div className="logout" onClick={logoutHandler}>
                      <FaSignOutAlt />
                    </div>
                  </NavDropdown.Item>
                </NavDropdown>
              )}
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
