import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Modal, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "../css/productDetail.css";
import { FaCheckCircle, FaPhone } from "react-icons/fa";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        console.log(`Product`, data);
      })
      .catch((error) =>
        console.error("Error fetching product details: ", error)
      );

    // Fetch user details based on product user_id
    fetch(`${process.env.REACT_APP_BASE_URL}/api/users/${product.user_id}`)
      .then((response) => response.json())
      .then((userData) => {
        setUser(userData);
      })
      .catch((error) => console.error("Error fetching user details: ", error));
  }, [id, product.user_id]);

  const [currentIndex, setCurrentIndex] = useState(0);

  //   Profile Seller
  const handleProfileClick = () => {
    // Fetch user details based on product user_id
    fetch(`${process.env.REACT_APP_BASE_URL}/api/users/${product.user_id}`)
      .then((response) => response.json())
      .then((userData) => {
        setUser(userData);
        setShowProfileModal(true);
      })
      .catch((error) => console.error("Error fetching user details: ", error));
  };

  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
  };

  // Contact Seller
  const handleContactClick = () => {
    // Fetch user details based on product user_id
    fetch(`${process.env.REACT_APP_BASE_URL}/api/users/${product.user_id}`)
      .then((response) => response.json())
      .then((userData) => {
        setUser(userData);
        setShowContactModal(true);
      })
      .catch((error) => console.error("Error fetching user details: ", error));
  };

  const handleCloseContactModal = () => {
    setShowContactModal(false);
  };

  return (
    <Container>
      <div className="product-detail-container">
        <div className="product-detail">
          <h1>{product.p_name}</h1>
          <h2>{product.p_brand}</h2>
          <hr />
          <div>
            <div
              className={`p-statusDetail ${
                product.p_status === "0"
                  ? "for-rent-detail"
                  : product.p_status === "1"
                  ? "for-sell-detail"
                  : "sold-out-detail"
              }`}
            >
              {product.p_status === "0"
                ? "For Rent"
                : product.p_status === "1"
                ? "For Sell"
                : "Sold Out"}
            </div>
            <h4>
              {product && product.p_price && product.p_price.toLocaleString()}{" "}
              {product.p_status === "0" ? "THB/Month" : "THB"}
            </h4>
            <h4>Conditions {product.p_conditions}% </h4>
          </div>
          <hr />

          <div className="seller-info">
            {
              <p className="seller-name" onClick={handleProfileClick}>
                <FaCheckCircle
                  className="faCheckProductDe"
                  style={{ color: "#003cf0" }}
                />
                {user.f_name} {user.l_name}
                {/* <p className="profile-icon-de">
              </p> */}
                <img
                  className="profile-modal-icon2"
                  src="../assets/userProfile.png"
                  alt={`Profile Image`}
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
              </p>
            }
          </div>

          <hr />
          <div>
            <h3>Description</h3>

            <p>{product.p_description}</p>
            <Button className="contact-button" onClick={handleContactClick}>
              <FaPhone className="phone-icon" />
              Contact
            </Button>
          </div>
        </div>

        <div className="product-image">
          {/* <div className="carousel"> */}
          {product.p_img &&
            product.p_img.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Product Image ${index + 1}`}
                style={{
                  display: index === currentIndex ? "block" : "none",
                  margin: "auto",
                }}
              />
              // </div>
            ))}
          {/* </div> */}
        </div>

        <Modal show={showProfileModal} onHide={handleCloseProfileModal}>
          <Modal.Header closeButton>
            <Modal.Title>Profile Seller</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Display user information */}
            <img
              className="profile-modal-icon"
              src="../assets/userProfile.png" /* Don't forgot to change the pic na */
              alt={`Profile Image of ${user.f_name}`}
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
            <p className="profile-modal-info">{`Name: ${user.f_name} ${user.l_name}`}</p>
            {/* Add more user information as needed */}
            <LinkContainer to={`/profile/${product.user_id}`}>
              <button className="sellerprofile-button">Seller's Profile</button>
            </LinkContainer>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleCloseProfileModal}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showContactModal} onHide={handleCloseContactModal}>
          <Modal.Header closeButton>
            <Modal.Title>Contact Seller</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Display contact information */}
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleCloseContactModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
  );
};

export default ProductDetail;
