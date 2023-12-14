import React, { useState, useEffect } from "react";
import { Container, Button, Modal, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "../css/myProducts.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const MyProducts = () => {
  const [userProducts, setUserProducts] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);
  const { isVerified, verifyStatus } = useSelector(
    (state) => state.verify_status
  );

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
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const sortedProducts = data.sort((a, b) => a.p_status - b.p_status);
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
              Authorization: `Bearer ${token}`,
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

  const handleToggleAvailability = (productId, currentStatus) => {
    const updatedProducts = userProducts.map((product) => {
      if (product.id === productId) {
        product.isAvailable = !currentStatus;
      }
      return product;
    });
    setUserProducts(updatedProducts);
  };

  return (
    <>
      {loading ? (
        <div>loading...</div>
      ) : (
        <Container>
          <div>
            <p className="myProduct-h">My Products</p>
            {successMessage && (
              <Alert variant="success">{successMessage}</Alert>
            )}{" "}
            <div className="addProductButtonContainer">
              <Button
                className="addProductButton"
                onClick={() => {
                  navigate("/addProduct");
                }}
              >
                <span>+</span> Add Product
              </Button>
            </div>
            <div className="myProduct-grid">
              {userProducts &&
                userProducts.map((product) => (
                  <div className="myProduct-box" key={product.id}>
                    {product.p_img && product.p_img.length > 0 ? (
                      <img src={product.p_img[0].url} alt={product.p_name} />
                    ) : (
                      <p>No image available</p>
                    )}
                    <div
                      className={`product-status ${
                        product.p_status === "0"
                          ? "for-rent"
                          : product.p_status === "1"
                          ? "for-sell"
                          : "sold-out"
                      }`}
                    >
                      {product.p_status === "0"
                        ? "For Rent"
                        : product.p_status === "1"
                        ? "For Sell"
                        : "Sold Out"}
                    </div>
                    <div className="product-actions">
                      <Button
                        variant="gray"
                        onClick={() => handleEditProduct(product.id)}
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </Button>
                      <Button
                        variant="gray"
                        onClick={() => handleConfirmation(product.id)}
                      >
                        <FontAwesomeIcon
                          className="faTrashIcon"
                          icon={faTrash}
                        />
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
