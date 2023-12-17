import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { reviewProduct, clearErrors } from "../actions/userActions";
import { useParams, useNavigate } from "react-router-dom";

const ReviewForm = () => {
  const { token } = useParams
  const [reviewText, setReviewText] = useState("");
  const [reviewScore, setReviewScore] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, success } = useSelector((state) => state.review);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert("Thank you for your review!");
      navigate("/home");
    }
  }, [dispatch, alert, error, success, navigate]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("reviewScore", reviewScore);
    formData.set("reviewText", reviewText);

    dispatch(reviewProduct(token, formData));
    console.log("Review : ", formData);
    setReviewText("");
    setReviewScore("");
  };

  return (
    <Form onSubmit={handleReviewSubmit}>
      <Form.Group controlId="reviewText">
        <Form.Label>Review Message</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="reviewScore">
        <Form.Label>Review Score</Form.Label>
        <Form.Control
          type="number"
          min={1}
          max={5}
          value={reviewScore}
          onChange={(e) => setReviewScore(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit Review
      </Button>
    </Form>
  );
};
export default ReviewForm;