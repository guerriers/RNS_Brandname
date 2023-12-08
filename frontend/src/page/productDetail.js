import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Modal, Container } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight, FaPhone } from "react-icons/fa";
import "../css/productDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

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
  }, [setProduct, id]);

  const [currentIndex, setCurrentIndex] = useState(0);

  //   Profile Seller
  const handleProfileClick = () => {
    setShowProfileModal(true);
  };
  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
  };

  // Contact Seller
  const handleContactClick = () => {
    setShowContactModal(true);
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
            <div className={`p-status ${
                product.p_status === "0" ? "for-rent" : "for-sell"
              }`}
            >
              {product.p_status === "0" ? "For Rent" : "For Sell"}
            </div>
            <h4>

            {product && product.p_price && product.p_price.toLocaleString()}{" "}
            Bath/Month
            </h4>

            <h4>Conditions {product.p_conditions}% </h4>
          </div>
          <hr />

          <div className="seller-info">
            {/* <p>{product.f_name}</p> */}
            <span className="text-dot-200">
                  {product.user_id} 
                  {/* {user.f_name}   */}
                </span>
            <p className="seller-name"> Seller Name</p>
            <span className="profile-icon" onClick={handleProfileClick}>
              Icon
            </span>
          </div>
          <hr />
          <div>

          <h3>Description</h3>

          <p>
            ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss{product.p_description}
          </p>
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
            <p>Profile information</p>
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
            <p>Contact information</p>
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
