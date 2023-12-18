import React, { useState, useEffect } from "react";
import { Container, Button, Modal, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "../css/adminVerify.css";
import { getUserVerify } from "../actions/userActions";
import { useNavigate } from "react-router-dom";

const AdminVerify = () => {
  const [userVerify, setUserVerify] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [verifyIdToDelete, setVerifyIdToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const [hasLoaded, setHasLoaded] = useState(false);
  // const [user, setUser] = useState({});
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    setHasLoaded(true);
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(`${process.env.REACT_APP_BASE_URL}/api/userVerify`, config)
      .then((response) => response.json())
      .then((data) => {
        data.sort((a, b) => a.verify_status.localeCompare(b.verify_status));
        setUserVerify(data);
        setHasLoaded(false);
        console.log("Received user verify data:", data);

        // Fetch user details
        const userPromises = data.map((request) =>
          fetch(
            `${process.env.REACT_APP_BASE_URL}/api/users/${request.user_id}`
          ).then((response) => response.json())
        );

        Promise.all(userPromises)
          .then((userData) => {
            setUsersData(userData);
            setHasLoaded(false);
            console.log("Received user verify data:", data);
          })
          .catch((error) => {
            console.error("Error fetching user details:", error);
          });
      })

      .catch((error) => {
        console.error("Error fetching user verify data:", error);
      });
  }, []);

  const handleViewRequest = (VerifyId) => {
    navigate(`/viewRequest/${VerifyId}`);
  };

  const handleConfirmation = (VerifyId) => {
    setVerifyIdToDelete(VerifyId);
    setShowConfirmation(true);
  };

  const handleRemoveRequest = () => {
    setShowConfirmation(false);

    if (verifyIdToDelete) {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .delete(
          `${process.env.REACT_APP_BASE_URL}/api/userVerify/${verifyIdToDelete}`,
          config
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
    <>
      {hasLoaded ? (
        <div>loading...</div>
      ) : (
        <Container>
          <div className="adminVerify-main">
            <p className="adminVerify-h">Verify Request</p>
            {successMessage && (
              <Alert variant="success">{successMessage}</Alert>
            )}{" "}
            <div className="verify-grid">
              {userVerify.map((request, index) => {
                const userData = usersData[index] || {};
                return (
                  <div className="verify-box" key={request.id}>
                    <img src={"../assets/userProfile.png"} />
                    <br />
                    {userData.f_name} {userData.l_name}
                    <div className={`verify-status ${request.verify_status}`}>
                      {request.verify_status === "verified"
                        ? "verified"
                        : "pending"}
                    </div>
                    <div className="verify-actions">
                      <Button
                        variant="gray"
                        onClick={() => handleViewRequest(request.user_id)}
                      >
                        👁️ View
                      </Button>
                      {request.verify_status === "verified" ? (
                        <Button
                          variant="gray"
                          onClick={() => handleConfirmation(request.user_id)}
                        >
                          🗑️ Delete
                        </Button>
                      ) : (
                        <Button
                          variant="gray"
                          onClick={() => handleConfirmation(request.user_id)}
                        >
                          🚫 Reject
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
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
      )}
    </>
  );
};

export default AdminVerify;
