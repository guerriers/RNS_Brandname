import React, { useState, useEffect } from "react";
import { Container, Button, Modal, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "../css/myProducts.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'

const MyProducts = () => {
  const [userProducts, setUserProducts] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const { user, loading } = useSelector(state => state.auth)
  const { isVerified, verifyStatus } = useSelector((state) => state.verify_status);



  useEffect(() => {
    if (!isVerified) {
      navigate("/userVerify");
    } else {
      fetchProducts();
    }
  }, [isVerified, navigate]);

  const fetchProducts = () => {
    // Fetch the user's products
    const token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_BASE_URL}/api/products/myProducts`, {
      method: 'GET',
      headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` },
    }).then((response) => response.json())
      .then((data) => {
        setUserProducts(data);
        // console.log("Received user products data:", data);
      })
      .catch((error) => {
        console.error("Error fetching user products data:", error);
      });
  };

  const handleEditProduct = (productId) => {
    navigate(`/editProduct/${productId}`);
  };

  const handleConfirmation = (productId) => {
    setProductIdToDelete(productId);
    setShowConfirmation(true);
  };

  const handleRemoveProduct = () => {
    setShowConfirmation(false);

    if (productIdToDelete) {
      const token = localStorage.getItem("token");
      axios
        .delete(
          `${process.env.REACT_APP_BASE_URL}/api/products/${productIdToDelete}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
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
    <>
      {loading ? (
        <div>loading...</div>
      ) : (
        <Container>
          <div>
            <h1 className="myProduct-h1">My Products</h1>
            {successMessage && (
              <Alert variant="success">{successMessage}</Alert>
            )}{" "}
            <div className="add-product-button-container">
              <Button
                className="add-product-button"
                onClick={() => {
                  navigate("/addProduct")
                }}
              >
                <span>+</span> Add Product
              </Button>
            </div>
            <div className="myProduct-grid">
              {userProducts && userProducts.map((product) => (
                <div className="myProduct-box" key={product.id}>
                  {product.p_img && product.p_img.length > 0 ? (
                    <img src={product.p_img[0].url} alt={product.p_name} />
                  ) : (
                    <p>No image available</p>
                  )}
                  <div
                    className={`product-status ${product.p_status === "0" ? "for-rent" : "for-sell"
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
      )}
    </>
  );
};

export default MyProducts;
