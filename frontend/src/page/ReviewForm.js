import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { reviewProduct, clearErrors } from "../actions/userActions";
import { getProductDetails } from "../actions/productActions";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ReviewForm = () => {
    const token = localStorage.getItem("token");

  const [reviewText, setReviewText] = useState("");
  const [reviewScore, setReviewScore] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { product } = useSelector((state) => state.productDetails);
  const { user_id } = product; // Seller's ID
  const { id } = product; // Product's ID

  const { error, success } = useSelector((state) => state.review);

  useEffect(() => {

    dispatch(getProductDetails(id));
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert("Thank you for your review!");
      navigate("/home");
    }
  }, [dispatch, alert, error, success, navigate]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        try {
        const newReview = {
            re_score: reviewScore,
            re_text: reviewText,
            seller_id: user_id,
        };

        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          };

        // Send the review to the server
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/reviews`,
            newReview,
            config
        );

        if (response.status === 201) {
            // Review submitted successfully, you can handle the response as needed
            console.log("Review submitted successfully");
            // Optionally, you can fetch updated reviews for the product and update the UI
        }
        } catch (error) {
        console.error("Error submitting review:", error);
        // Handle the error, show an alert, etc.
        }
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