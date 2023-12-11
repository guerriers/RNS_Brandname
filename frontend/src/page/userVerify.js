import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { checkVerify, clearErrors } from "../actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
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
        console.log("Verification submitted successfully.");
        navigate("/submitted");
        dispatch(checkVerify());
      } else {
        console.error("Verification submission failed.");
      }
    } catch (error) {
      console.error("Error submitting verification:", error);
    }
  };

  return (
    <>
      {loading ? (
        <div>loading...</div>
      ) : (
        <Container>
          <div>
            <h2 className="mt-4">User Verification</h2>
            <p>xxxxx</p>
            <p>xxxxx</p>
            <p>xxxxx</p>

            <Form>
              <Form.Group controlId="idCard">
                <Form.Label>Upload Identification Card:</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleIdCardChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="bankAccount">
                <Form.Label>Upload Bank Account Photo:</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleBankAccountChange}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleVerificationSubmit}>
                Submit Verification
              </Button>
            </Form>
          </div>
        </Container>
      )}
    </>
  );
};

export default UserVerify;
