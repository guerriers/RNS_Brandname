import React, { useState, useEffect } from "react";
import { Form, Row, Col, Container, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { checkVerify, clearErrors } from "../actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "../css/userVerify.css";
// const { user, loading } = useSelector((state) => state.auth);

const UserVerify = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isVerified, verifyStatus, loading } = useSelector(
    (state) => state.verify_status
  );
  const [idCardImg, setIdCardImg] = useState([]);
  const [bankImg, setBankImg] = useState([]);
  const [idCardImgPreview, setIdCardImgPreview] = useState([]);
  const [bankImgPreview, setBankImgPreview] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [idCardError, setIdCardError] = useState(false);
  const [bankAccountError, setBankAccountError] = useState(false);
  const [formValid, setFormValid] = useState(true);

  useEffect(() => {
    if (verifyStatus === "submitted") {
      navigate("/submitted");
    }
  }, [verifyStatus, navigate]);

  const handleIdCardChange = (e) => {
    const files = Array.from(e.target.files);
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setIdCardImgPreview((oldArray) => [...oldArray, reader.result]);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
    setIdCardImg(files);
  };

  const handleBankAccountChange = (e) => {
    const files = Array.from(e.target.files);
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setBankImgPreview((oldArray) => [...oldArray, reader.result]);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
    setBankImg(files);
  };

  const handleVerificationSubmit = async () => {
    const formData = new FormData();
    idCardImg.forEach((img) => {
      formData.append("idCard_img", img);
    });
    bankImg.forEach((img) => {
      formData.append("bank_img", img);
    });
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/userVerify`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        dispatch(checkVerify());
        alert("Verification submitted successfully.");
        console.log("Verification submitted successfully.");
        setTimeout(() => {
          navigate("/submitted");
        }, 2000);
      } else {
        alert("Verification submission failed.");
        console.error("Verification submission failed.");
      }
    } catch (error) {
      console.error("Error submitting verification:", error);
    }

    if (idCardImg.length === 0 || bankImg.length === 0) {
      setFormValid(false);
      return;
    } else {
      setFormValid(true);
    }
  };

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
      {loading ? (
        <div>loading...</div>
      ) : (
        <Container>
          <div className="identity-verification">
            <h2 className="titleVerify">Identity verification</h2>
            <div className="headerVerify">
              <h5>ยืนยันตัวตนก่อนลงขายสินค้า</h5>
              <li>โดยต้องแนบภาพถ่ายดังนี้</li>
            </div>
            <ul className="requirements1">
              <li>1. ถ่ายภาพบัตรประจําตัวประชาชน</li>
            </ul>
            <Row>
              <Col>
                <img
                  src={"../assets/idCard.png"}
                  className="img-fluid clickable"
                  alt="ID Card"
                  onClick={() => openModal("../assets/idCardBig.png")}
                />
                <Form.Group as={Col} controlId="idCard">
                  <Form.Label>
                    Upload IDcard<span style={{ color: "red" }}> *</span>
                  </Form.Label>
                  <div className="d-flex justify-content-center align-items-center">
                    <Form.Control
                      className="idCard"
                      type="file"
                      name="receipt"
                      accept="image/*"
                      onChange={handleIdCardChange}
                      feedback="Please upload ID card image."
                      required
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <ul className="requirements2">
              <li>
                2. ถ่ายภาพหน้าสมุดบัญชีธนาคาร
                (ชื่อต้องตรงกับในบัตรประจําตัวประชาชน)
              </li>
            </ul>
            <Row>
              <Col>
                <img
                  src={"../assets/bookBank.png"}
                  className="img-fluid clickable"
                  alt="Book Bank"
                  onClick={() => openModal("../assets/bookBankBig.png")}
                />
                <Form.Group as={Col} controlId="bankAccount">
                  <Form.Label>
                    Upload book-bank<span style={{ color: "red" }}> *</span>
                  </Form.Label>
                  <div className="d-flex justify-content-center align-items-center">
                    <Form.Control
                      className="bankAccount"
                      type="file"
                      name="receipt"
                      accept="image/*"
                      onChange={handleBankAccountChange}
                      feedback="Please select a book-bank image."
                      required
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </div>
          {!formValid && (
            <div className="alertVerifySubmit">
              Please add ID card and book-bank images.
            </div>
          )}
          <button
            className="verifyButton"
            onClick={handleVerificationSubmit}
            disabled={idCardImg.length === 0 || bankImg.length === 0}
          >
            Submit Verify
          </button>

          <Modal show={isModalOpen} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Example Image</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img src={selectedImage} className="img-fluid" alt="Full Size" />
            </Modal.Body>
          </Modal>
        </Container>
      )}
    </>
  );
};

export default UserVerify;
