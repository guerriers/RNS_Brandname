import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { reviewProduct, clearErrors } from "../actions/userActions";
import { getProductDetails } from "../actions/productActions";
import { useParams, useNavigate } from "react-router-dom";
import "../css/reviewForm.css";
import axios from "axios";

const ReviewForm = () => {
  const token = localStorage.getItem("token");

  const [reviewText, setReviewText] = useState("");
  const [selectedStars, setSelectedStars] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleStarClick = (stars) => setSelectedStars(stars);

  const { product } = useSelector((state) => state.productDetails);
  const { user_id } = product; // Seller's ID
  const { id } = product; // Product's ID
  //console.log("Product : ", product);
  //console.log("Product ID : ", id);
  //console.log("Seller ID : ", user_id);

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
  }, [dispatch, alert, error, success, navigate, id]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        try {
        const newReview = {
            re_score: selectedStars,
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

            alert("Review submitted successfully, Thank you for your review!");
            // Optionally, you can fetch updated reviews for the product and update the UI
        }
        } catch (error) {
        console.error("Error submitting review:", error);
        // Handle the error, show an alert, etc.
        }
    };
    

  return (
    <div>
      <Card>
        <Card.Body>
        <div className="product-image">
          {product.p_img &&
            product.p_img.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Product Image ${index + 1}`}
                style={{
                  display: "block",
                  margin: "auto",
                }}
              />
            ))}
        </div>
          <Card.Title>{product.p_name}</Card.Title>
          <Card.Text>Price: ${product.p_price}</Card.Text>
        </Card.Body>
      </Card>

      <Form className='reviewform-container' onSubmit={handleReviewSubmit}>
        <Form.Group controlId="reviewText">
          <Form.Label>Review Message</Form.Label>
          <Form.Control className="review-text"
            as="textarea"
            rows={3}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formStars">
              <Form.Label>Select Stars:</Form.Label>
              {[1, 2, 3, 4, 5].map((stars) => (
                <span
                  key={stars}
                  className={`star ${selectedStars >= stars ? "selected" : ""}`}
                  onClick={() => handleStarClick(stars)}
                >
                  &#9733;
                </span>
              ))}
            </Form.Group>

        <Button variant="primary" type="submit">
          Submit Review
        </Button>
      </Form>
    </div>
  );
};
export default ReviewForm;