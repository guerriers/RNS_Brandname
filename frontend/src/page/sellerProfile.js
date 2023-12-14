import React, { useEffect, useState } from "react";
import { Button, Modal, Container, Form, Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import "../css/sellerProfile.css";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaCheckCircle } from "react-icons/fa";

function SellerProfile() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [productCount, setProductCount] = useState(0);
  const [userProducts, setUserProducts] = useState([]);

  const [showReportModal, setShowReportModal] = useState(false);
  const [reportContent, setReportContent] = useState("");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewDate, setReviewDate] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [selectedStars, setSelectedStars] = useState(0);
  const [reviews, setReviews] = useState([
    {
      stars: 4,
      text: "Great product! Highly recommended.",
      date: "10:30 14/12/2023",
    },
    {
      stars: 5,
      text: "Excellent service.",
      date: "21:30 14/12/2023",
    },
  ]);

  const handleShowReviewModal = () => setShowReviewModal(true);
  const handleCloseModal = () => setShowReviewModal(false);
  const handleStarClick = (stars) => setSelectedStars(stars);
  const handleSendReview = () => {
    if (selectedStars > 0 && reviewContent.trim() !== "") {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString("en-GB");
      const formattedTime = currentDate.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const newReview = {
        stars: selectedStars,
        text: reviewContent,
        date: `${formattedTime} ${formattedDate}`,
      };

      setReviews([...reviews, newReview]);
      setReviewDate("");
      handleCloseModal();
    }
  };

  const { isVerified, verify_status } = useSelector(
    (state) => state.verify_status
  );
  const formatDate = (timestamp) => {
    const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
    return new Date(timestamp).toLocaleDateString(undefined, options);
  };
  useEffect(() => {
    // Fetch user details based on product user_id
    fetch(`${process.env.REACT_APP_BASE_URL}/api/users/${id}`)
      .then((response) => response.json())
      .then((userData) => {
        setUser(userData);
        fetchProducts(id);
        console.log("Received user data:", userData);
        console.log("Received user id:", id);
      })
      .catch((error) =>
        console.error("Error fetching user details from URL: ", error)
      );
  }, [id]);

  const fetchProducts = (userId) => {
    const token = localStorage.getItem("token");
    fetch(
      `${process.env.REACT_APP_BASE_URL}/api/products/myProducts?user_id=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setUserProducts(data);
        setProductCount(data.length);
        console.log("Received user products data:", data);
      })
      .catch((error) => {
        console.error("Error fetching user products data:", error);
      });
  };

  const handleReportClick = () => {
    setShowReportModal(true);
  };

  const handleCloseReportModal = () => {
    setShowReportModal(false);
    setReportContent(""); // Reset report content when closing the modal
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting report:", reportContent);
    handleCloseReportModal();
  };

  return (
    <Container>
      <Row className="sellerPro">
        <Col md={4}>
          <div className="user-profile-container">
            <div className="user-profile-image">
              <img src="../assets/userProfile.png" alt="user profile" />{" "}
              {/* Don't forgot to change the pic na */}
            </div>
            <div className="user-profile-info">
              <h2>
                {user.f_name} {user.l_name}
              </h2>
              <span className="verified-badge">
                {" "}
                {isVerified ? "Verified" : "Need Verified"}{" "}
                <FaCheckCircle
                  className="FaCheckSellerPro"
                  style={{ color: "#18af2a" }}
                />
              </span>
              <h3>E-mail: {user.email}</h3>
              <h3>Tel: {user.phone}</h3>
              <div>
                <h3>
                  {user.f_name}'s products: {productCount}
                </h3>
                <h3>
                  Joined since:{" "}
                  {user.createdAt ? formatDate(user.createdAt) : "N/A"}
                </h3>
              </div>
              <div>
                <button className="report-button" onClick={handleReportClick}>
                  Report
                </button>
              </div>
            </div>
          </div>
        </Col>
        <Col md={8}>
          <div className="userProduct-grid">
            <h4>{user.f_name}'s products</h4>
            {userProducts.length > 0 ? (
              userProducts.map((product) => (
                <Link to={`/product/${product.id}`} key={product.id}>
                  <div className="sellerProduct-box">
                    {product.p_img && product.p_img.length > 0 ? (
                      <img src={product.p_img[0].url} alt={product.p_name} />
                    ) : (
                      <p>No image available</p>
                    )}
                    <div
                      className={`product-status ${
                        product.p_status === "0" ? "for-rent" : "for-sell"
                      }`}
                    >
                      {product.p_status === "0" ? "For Rent" : "For Sell"}
                    </div>
                    <div className="product-price">{`${product.p_price.toLocaleString()} THB`}</div>
                  </div>
                </Link>
              ))
            ) : (
              <p>This seller hasn't post any Product.</p>
            )}
          </div>
        </Col>
      </Row>
      <Row>
        <div className="review-container">
          <h2>Reviews</h2>
          <div>
            <button className="reviewButton" onClick={handleShowReviewModal}>
              Write a Review
            </button>
          </div>
          <div>
            <ul>
              {reviews.map((review, index) => (
                <li key={index}>
                  <div className="review-header">
                    <p className="starClass">
                      {Array.from({ length: review.stars }, (_, i) => (
                        <FontAwesomeIcon icon={faStar} key={i} />
                      ))}
                    </p>
                    <p>{review.text}</p>
                  </div>
                  <p>{review.date}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Row>
      <Modal show={showReviewModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Write a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
            <Form.Group controlId="formReviewContent">
              <Form.Label>Write a Review:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSendReview}>
            Send Review
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showReportModal} onHide={handleCloseReportModal}>
        <Modal.Header closeButton>
          <Modal.Title>Report Seller</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Report form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="reportContent" className="form-label">
                Report Content:
              </label>
              <textarea
                className="form-control"
                id="reportContent"
                rows="4"
                value={reportContent}
                onChange={(e) => setReportContent(e.target.value)}
                required
              ></textarea>
            </div>

            <Modal.Footer>
              <Button type="submit">Submit</Button>
              <Button onClick={handleCloseReportModal}>Close</Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default SellerProfile;
