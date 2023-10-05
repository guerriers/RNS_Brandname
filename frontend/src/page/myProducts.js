import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { Container, Button, Modal, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "../css/myProducts.css";

const MyProducts = () => {
  const [userProducts, setUserProducts] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // const userEmail = localStorage.getItem("email");
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/products`)
      .then((response) => {
        setUserProducts(response.data);
        console.log("Received user products data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching user products data:", error);
      });
  }, []);

  const handleEditProduct = (productId) => {
    window.location.href = `/editProduct/${productId}`;
  };

  const handleConfirmation = (productId) => {
    setProductIdToDelete(productId);
    setShowConfirmation(true);
  };

  const handleRemoveProduct = () => {
    setShowConfirmation(false);

    if (productIdToDelete) {
      axios
        .delete(
          `${process.env.REACT_APP_BASE_URL}/api/products/${productIdToDelete}`
        )
        .then(() => {
          setUserProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== productIdToDelete)
          );
          setProductIdToDelete(null);
          setSuccessMessage("Product deleted successfully!");

          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });

          setTimeout(() => {
            setSuccessMessage("");
          }, 3000);
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
        });
    }
  };

  return (
    <Container>
      <div>
        <h1>My Products</h1>
        {successMessage && (
          <Alert variant="success">{successMessage}</Alert>
        )}{" "}
        <div className="add-product-button-container">
          <Button
            className="add-product-button"
            onClick={() => {
              window.location.href = "/addProduct";
            }}
          >
            <span>+</span> Add Product
          </Button>
        </div>
        <div className="product-grid">
          {userProducts.map((product) => (
            <div className="product-box" key={product.id}>
              <img src={product.p_img} alt={product.p_name} />
              <div
                className={`product-status ${
                  product.p_status === "0" ? "for-rent" : "for-sell"
                }`}
              >
                {product.p_status === "0" ? "For Rent" : "For Sell"}
              </div>
              <div className="product-actions">
                <Button
                  variant="gray"
                  onClick={() => handleEditProduct(product.id)}
                >
                  ✎
                </Button>
                <Button
                  variant="gray"
                  onClick={() => handleConfirmation(product.id)}
                >
                  🗑
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Modal
          show={showConfirmation}
          onHide={() => setShowConfirmation(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure to delete this product?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowConfirmation(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleRemoveProduct}>
              Confirm Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
  );
};

export default MyProducts;
