import React, { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import "../css/submitted.css";

const Submitted = () => {
  const { verifyStatus, loading } = useSelector((state) => state.verify_status);
  const navigate = useNavigate();

  useEffect(() => {
    if (verifyStatus === "pending") {
      navigate("/userVerify");
    }
  }, [verifyStatus, navigate]);

  return (
    <div className="submitted-container">
      {loading ? (
        <div className="loading-spinner">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Container>
          <p className="waiting-message">
            Waiting for admin to verify your account
          </p>
        </Container>
      )}
    </div>
  );
};

export default Submitted;
