/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Row,
  Col,
  Image,
  Container,
  Modal,
  Button,
} from "react-bootstrap";
import "../css/adminViewRequest.css";
import axios from "axios";

const AdminViewRequest = ({ history }) => {
  const { id } = useParams();

  const [isSubmit, setIsSubmit] = useState(false);
  const [validated, setValidated] = useState(false);
  const [viewRequestEdit, setViewRequestEdit] = useState({
    t_user: {
      f_name: "",
      l_name: "",
      email: "",
      phone: "",
    },
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [verifyIdToDelete, setVerifyIdToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);
  const [userVerify, setUserVerify] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setViewRequestEdit({ ...viewRequestEdit, [name]: value });
  };

  const handleConfirmation = (VerifyId) => {
    setVerifyIdToDelete(VerifyId);
    setShowConfirmation(true);
  };

  const handleRemoveRequest = async () => {
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
        .then(() => {
          navigate("/adminVerify");
        })
        .catch((error) => {
          console.error("Error deleting request:", error);
        });
    }
  };

  const onSubmit = async (userVerify) => {
    const form = userVerify.currentTarget;
    userVerify.preventDefault();
    userVerify.stopPropagation();
    if (form.checkValidity() === false) {
      userVerify.preventDefault();
      userVerify.stopPropagation();
    }
    setValidated(true);

    if (form.checkValidity()) {
      const token = localStorage.getItem("token");
      await fetch(`${process.env.REACT_APP_BASE_URL}/api/userVerify/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ verify_status: "verified" }),
      })
        .then((response) => response.json())
        .then((res) => {
          console.log("RES>>>>>>", res);

          if (res.message) {
            alert(res.message);
          }
          setIsSubmit(true);
          navigate("/adminVerify");
        })
        .catch((error) => {
          console.error("Fetch error:", error.message);
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setHasLoaded(true);
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/userVerify/${id}`,
          config
        );
        const data = await response.json();
        if (data) {
          setViewRequestEdit(data);
          setHasLoaded(false);
          console.log(viewRequestEdit);
        }
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, [id]);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      {hasLoaded ? (
        <div>loading...</div>
      ) : (
        <Container className="adminViewVerify">
          <h1>Identity verification</h1>
          <Row>
            <Col>
              <div className="img-container">
                <img src={"../assets/userProfile.png"} />
              </div>
            </Col>
          </Row>

          <Row>
            <div className="fullNameStat">
              <span className="fullName-p">
                {viewRequestEdit.t_user.f_name} {viewRequestEdit.t_user.l_name}
              </span>
              <span className="reqDate">
                Request Date:{" "}
                {viewRequestEdit.createdAt
                  ? new Date(viewRequestEdit.createdAt).toLocaleDateString()
                  : "N/A"}
              </span>
              <p
                className={`viewStatus ${
                  viewRequestEdit.verify_status === "verified"
                    ? "verifiedStatus"
                    : "pendingStatus"
                }`}
              >
                {viewRequestEdit.verify_status === "verified"
                  ? "verified"
                  : "pending"}
              </p>
            </div>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridFname">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={viewRequestEdit.t_user.f_name}
                placeholder={""}
                disabled
              />
            </Form.Group>
            <Form.Group as={Col} md={2}></Form.Group>
            <Form.Group as={Col} controlId="formGridLname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="Last Name"
                type="text"
                value={viewRequestEdit.t_user.l_name}
                placeholder=""
                disabled
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={viewRequestEdit.t_user.email}
                placeholder=""
                disabled
              />
            </Form.Group>
            <Form.Group as={Col} md={2}></Form.Group>
            <Form.Group as={Col} controlId="formGridPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={viewRequestEdit.t_user.phone}
                placeholder=""
                disabled
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Col md={5}>
              <Form.Group as={Col} controlId="idCard">
                <Form.Label>IDcard</Form.Label>
              </Form.Group>
              <div className="img-container">
                <Image
                  className="img-fluid clickable"
                  src={
                    viewRequestEdit.idCard_img &&
                    viewRequestEdit.idCard_img[0] &&
                    viewRequestEdit.idCard_img[0].url
                  }
                  onClick={() =>
                    openModal(
                      viewRequestEdit.idCard_img &&
                        viewRequestEdit.idCard_img[0].url
                    )
                  }
                  rounded
                />
              </div>
            </Col>
            <Form.Group as={Col} md={2}></Form.Group>
            <Col md={5}>
              <Form.Group as={Col} controlId="bankAccount">
                <Form.Label>Book bank</Form.Label>
              </Form.Group>
              <div className="img-container">
                <Image
                  className="img-fluid clickable"
                  src={
                    viewRequestEdit.idCard_img &&
                    viewRequestEdit.bank_img[0] &&
                    viewRequestEdit.bank_img[0].url
                  }
                  rounded
                  onClick={() =>
                    openModal(
                      viewRequestEdit.bank_img &&
                        viewRequestEdit.bank_img[0].url
                    )
                  }
                />
              </div>
            </Col>
          </Row>
          <Form className="ViewRequestButton" onSubmit={onSubmit}>
            <div className="viewRequestButton2">
              {viewRequestEdit.verify_status === "verified" ? (
                <button
                  className="deleteRequest"
                  type="button"
                  onClick={() => handleConfirmation(viewRequestEdit.user_id)}
                >
                  Delete
                </button>
              ) : (
                <>
                  <button className="acceptRequest">Accept</button>
                  <button
                    className="rejectRequest"
                    type="button"
                    onClick={() => handleConfirmation(viewRequestEdit.user_id)}
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </Form>
          <Modal show={isModalOpen} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Full Image</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img src={selectedImage} className="img-fluid" alt="Full Size" />
            </Modal.Body>
          </Modal>
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
          {/* </div> */}
          {/* </Fragment>
      ) : (
        <Fragment>Loading...</Fragment>
      )}
    </Fragment> */}
        </Container>
      )}
    </>
  );
};

export default AdminViewRequest;
