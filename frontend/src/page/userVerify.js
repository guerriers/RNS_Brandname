import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UserVerify = () => {
  const initialValues = {
    verify_status: "0",
    idCard_img: null,
    bank_img: null,
    user_id: "", 
  };

  const [formValues, setFormValues] = useState(initialValues);
  const navigate = useNavigate();

  const handleIdCardChange = (e) => {
    const file = e.target.files[0];
    setFormValues({ ...formValues, idCard_img: file });
  };

  const handleBankAccountChange = (e) => {
    const file = e.target.files[0];
    setFormValues({ ...formValues, bank_img: file });
  };

  const handleVerificationSubmit = async () => {
    const formData = new FormData();
    formData.append("idCard", formValues.idCard_img);
    formData.append("bankAccount", formValues.bank_img);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/userVerify`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.status === 201) {
        // Verification submission was successful
        console.log("Verification submitted successfully.");
        navigate("/about");
      } else {
        // Verification submission fails
        console.error("Verification submission failed.");
      }
    } catch (error) {
      console.error("Error submitting verification:", error);
    }
  };

  return (
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
  );
};

export default UserVerify;
