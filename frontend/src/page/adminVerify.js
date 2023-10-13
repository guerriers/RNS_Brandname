import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { Container, Button, Modal, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "../css/adminVerify.css";

const AdminVerify = () => {
  const [user, setUser] = useState(null);
  const [userVerify, setUserVerify] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [verifyIdToDelete, setVerifyIdToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // const userEmail = localStorage.getItem("email");
    fetch(`${process.env.REACT_APP_BASE_URL}/api/userVerify`)
    .then((response) => response.json())
    .then((data) => {
      setUserVerify(data);
      console.log("Received user verify data:", data);
    })
    .catch((error) => {
      console.error("Error fetching user verify data:", error);
    });
}, []);

  const handleViewRequest = (VerifyId) => {
    window.location.href = `/viewRequest/${VerifyId}`;
  };

  const handleConfirmation = (VerifyId) => {
    setVerifyIdToDelete(VerifyId);
    setShowConfirmation(true);
  };

  const handleRemoveRequest = () => {
    setShowConfirmation(false);

    if (verifyIdToDelete) {
      axios
        .delete(
          `${process.env.REACT_APP_BASE_URL}/api/userVerify/${verifyIdToDelete}`
        )
        .then(() => {
          setUserVerify((prevVerify) =>
            prevVerify.filter((request) => request.id !== verifyIdToDelete)
          );
          setVerifyIdToDelete(null);
          setSuccessMessage("Request deleted successfully!");

          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });

          setTimeout(() => {
            setSuccessMessage("");
          }, 3000);
        })
        .catch((error) => {
          console.error("Error deleting request:", error);
        });
    }
  };

  return (
    <Container>
      <div>
        <h1>Verify Request</h1>
        {successMessage && (
          <Alert variant="success">{successMessage}</Alert>
        )}{" "}
        <div className="verify-grid">
          {userVerify.map((request) => (
            <div className="verify-box" key={request.id}>
              <img src="../../public/assets/p1.jpeg" />
              <br></br> watchara last
              {/* <img src={user.profile_img} alt={user.f_name} /> */}
              <div
                className={`verify-status ${
                  request.verify_status === "0" ? "pending" : "verified"
                }`}
              >
                {request.verify_status === "0" ? "pending" : "verified"}
              </div>
              <div className="verify-actions">
                <Button
                  variant="gray"
                  onClick={() => handleViewRequest(request.id)}
                >
                  ✎ View
                </Button>
                <Button
                  variant="gray"
                  onClick={() => handleConfirmation(request.id)}
                >
                  🗑 Reject
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
          <Modal.Body>Are you sure to delete this Request?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowConfirmation(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleRemoveRequest}>
              Confirm Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
  );
};

export default AdminVerify;
