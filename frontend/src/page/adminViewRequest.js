import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Row, Col, Image, Container, Modal, Button } from "react-bootstrap";
import "../css/addProduct.css";
import axios from 'axios';

const AdminViewRequest = ({ history }) => {
  const { id } = useParams();
  // const history = useHistory();

  const [isSubmit, setIsSubmit] = useState(false);
  const [validated, setValidated] = useState(false);
  const [viewRequestEdit, setViewRequestEdit] = useState({
    t_user: {
      f_name: "",
      l_name: "",
      email: "",
      phone: "",
    }
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [verifyIdToDelete, setVerifyIdToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);
  const [userVerify, setUserVerify] = useState([]);
  // const [hasLoaded, setHasLoaded] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setViewRequestEdit({ ...viewRequestEdit, [name]: value });
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
          'Authorization': `Bearer ${token}`,
        },
      };
      axios
        .delete(
          `${process.env.REACT_APP_BASE_URL}/api/userVerify/${verifyIdToDelete}`, config
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
        }).then(() => {
          navigate("/adminVerify");
        })
        .catch((error) => {
          console.error("Error deleting request:", error);
        });
    }

  }

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
        headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` },
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
            'Authorization': `Bearer ${token}`,
          },
        };
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/userVerify/${id}`, config
        );
        const data = await response.json();
        if (data) {
          setViewRequestEdit(data);
          setHasLoaded(false);
          console.log(viewRequestEdit)
        }
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      {hasLoaded ? (
        <div>loading...</div>
      ) : (
        <Container>
          {/* <Fragment>
      {hasLoaded ? (
        <Fragment> */}
          <div>
            <div className="Header">
              <h1>Verify</h1>
            </div>
            <Row className="mb-3">
              <Form.Label>User Profile img</Form.Label>
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
              <Form.Group as={Col} controlId="">
                File:
                idcard
                <Image src={viewRequestEdit.idCard_img && viewRequestEdit.idCard_img[0].url} rounded />
                bank
                <Image src={viewRequestEdit.idCard_img && viewRequestEdit.bank_img[0].url} rounded />
              </Form.Group>
            </Row>
            <Form className="wrapperViewProduct" onSubmit={onSubmit}>
              <div className="warpPerButton">
                <button className="viewDataSubmit">Accept</button>
                <button
                  className="viewDataSubmit"
                  type="button"
                  onClick={() => handleConfirmation(viewRequestEdit.user_id)}
                >
                  Reject
                </button>
              </div>
            </Form>
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
