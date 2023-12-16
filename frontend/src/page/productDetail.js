import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Modal, Container } from "react-bootstrap";
import { FaCheckCircle, FaRegHeart, FaHeart } from "react-icons/fa";
import "../css/productDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [product, setProduct] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [showProfileModal, setShowProfileModal] = useState(false);
  // const [showContactModal, setShowContactModal] = useState(false);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        console.log(`Product`, data);
        // Fetch user details based on product user_id
        return fetch(
          `${process.env.REACT_APP_BASE_URL}/api/users/${data.user_id}`
        );
      })
      .then((response) => response.json())
      .then((userData) => {
        setUserData(userData);
      })
      .catch((error) => console.error("Error fetching details: ", error));

    fetchFavorites();
  }, [id]);

  const fetchFavorites = async () => {
    try {
      if (!user.id) {
        console.error("User ID not found in localStorage");
        return;
      }

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/users/${user.id}`
      );

      if (response.status === 200) {
        setFavorites(response.data.favor || []);
      } else {
        console.error("Failed to fetch favorites. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching user favorites:", error);
    }
  };

  const handleFavoriteClick = async (productId, action) => {
    try {
      const token = localStorage.getItem("token");

      if (!user.id) {
        console.error("User ID not found in localStorage");
        return;
      }

      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/users/${user.id}/addFavorites`,
        { productId, action },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Favorites updated successfully");
        fetchFavorites();
      } else {
        console.error("Failed to update favorites. Please try again.");
      }
    } catch (error) {
      console.error("Error updating user favorites:", error);
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  //   Profile Seller
  const handleProfileClick = () => {
    // Fetch user details based on product user_id
    fetch(`${process.env.REACT_APP_BASE_URL}/api/users/${product.user_id}`)
      .then((response) => response.json())
      .then((userData) => {
        setUserData(userData);
        setShowProfileModal(true);
      })
      .catch((error) => console.error("Error fetching user details: ", error));
  };

  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
  };

  // Contact Seller
  // const handleContactClick = () => {
  //   fetch(`${process.env.REACT_APP_BASE_URL}/api/users/${product.user_id}`)
  //     .then((response) => response.json())
  //     .then((userData) => {
  //       setUserData(userData);
  //       setShowContactModal(true);
  //     })
  //     .catch((error) => console.error("Error fetching user details: ", error));
  // };

  // const handleCloseContactModal = () => {
  //   setShowContactModal(false);
  // };

  return (
    <Container>
      <div className="product-detail-container">
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
            ))}
        </div>

        <div className="product-detail">
          <h1>
            <button
              className="favButtonPD"
              onClick={() => handleFavoriteClick(product.id, "add")}
            >
              {favorites.some((item) => item.productId === product.id) ? (
                <FaHeart style={{ color: "#ff0000" }} />
              ) : (
                <FaRegHeart style={{ color: "#000000" }} />
              )}
            </button>
            {product.p_name}
          </h1>
          <h2>{product.p_brand}</h2>
          <div className="product-favorite"></div>
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
              {product.p_status === "0" ? "/Month" : "THB"}
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
                {userData.f_name} {userData.l_name}
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
            {/* <Button className="contact-button" onClick={handleContactClick}>
              <FaPhone className="phone-icon" />
              Contact
            </Button> */}
          </div>
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
              alt={`Profile Image of ${userData.f_name}`}
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
            <p className="profile-modal-info">{`${userData.f_name} ${userData.l_name}`}</p>
            <p className="profile-modal-info">Email: {userData.email}</p>
            <p className="profile-modal-info">Phone: 0{userData.phone}</p>
            <LinkContainer to={`/profile/${product.user_id}`}>
              <button className="sellerprofile-button">Seller's Profile</button>
            </LinkContainer>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleCloseProfileModal}>Close</Button>
          </Modal.Footer>
        </Modal>

        {/* <Modal show={showContactModal} onHide={handleCloseContactModal}>
          <Modal.Header closeButton>
            <Modal.Title>Contact Seller</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleCloseContactModal}>Close</Button>
          </Modal.Footer>
        </Modal> */}
      </div>
    </Container>
  );
};

export default ProductDetail;
