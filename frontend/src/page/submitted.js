import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const Submitted = () => {
  const { isVerified, verifyStatus, loading } = useSelector((state) => state.verify_status);
  const navigate = useNavigate();
  useEffect(() => {
    if (verifyStatus === "pending") {
      navigate("/userVerify");
    }
  }, [verifyStatus, navigate]);
  return (
    <>
      {loading ? (
        <div>loading...</div>
      ) : (
        <Container>
          SUBMITTED PAGE
        </Container>
      )}
    </>
  );
};

export default Submitted;
