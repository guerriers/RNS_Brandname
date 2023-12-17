import React, { useEffect, useState } from "react";
import { Button, Modal, Container, Form, Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import "../css/sellerProfile.css";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";

function SellerProfile() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [productCount, setProductCount] = useState(0);
  const [userProducts, setUserProducts] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewDate, setReviewDate] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [selectedStars, setSelectedStars] = useState(0);
  const dispatch = useDispatch();
  const verifyStatus = useSelector((state) => state.verify_status);
  const [reviews, setReviews] = useState([]);

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
  
  const formatDate = (timestamp) => {
    const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
    return new Date(timestamp).toLocaleDateString(undefined, options);
  };

  const fetchProducts = (userId) => {
    const token = localStorage.getItem("token");
    fetch(
      `${process.env.REACT_APP_BASE_URL}/api/products/user/${userId}`,
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
        const sortedProducts = data.sort((a, b) => a.p_status - b.p_status);
        setUserProducts(data);
        setProductCount(data.length);
        console.log("Received user products data:", data);
      })
      .catch((error) => {
        console.error("Error fetching user products data:", error);
      });
  };

  const fetchReviews = (userId) => {
    const token = localStorage.getItem("token");
    fetch(
      `${process.env.REACT_APP_BASE_URL}/api/reviews/user/${userId}`,
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
        setReviews(data);
        console.log("Received user reviews data:", data);
      })
      .catch((error) => {
        console.error("Error fetching user reviews data:", error);
      });
    };

  const fetchVerificationStatus = async (userId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/user-verification/${userId}`
      );
      const verifyStatus = response.data.verify_status;
      dispatch({ type: "SET_VERIFY_STATUS", verify_status: verifyStatus });
    } catch (error) {
      console.error("Error fetching verification status:", error);
    }
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

      fetchVerificationStatus(id);
      fetchReviews(id);
  }, [id]);



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
                {verifyStatus ? "Verified" : "Need Verified"}{" "}
                <FaCheckCircle
                  className="FaCheckSellerPro"
                  style={{ color: "#18af2a" }}
                />
              </span>
              <h3><b>E-mail: </b>{user.email}</h3>
              <h3><b>Tel: </b>{user.phone}</h3>
              <div>
                <h3>
                  <b>{user.f_name}'s products: </b>
                  {productCount}
                </h3>
                <h3>
                <b>Joined since: </b>{" "}
                  {user.createdAt ? formatDate(user.createdAt) : "N/A"}
                </h3>
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
                      className={`product-status-seller ${
                        product.p_status === "0"
                          ? "for-rent-seller"
                          : product.p_status === "1"
                          ? "for-sell-seller"
                          : "sold-out-seller"
                      }`}
                    >
                      {product.p_status === "0"
                        ? "For Rent"
                        : product.p_status === "1"
                        ? "For Sell"
                        : "Sold Out"}
                    </div>
                    <div className="product-price-seller">{`${product.p_price.toLocaleString()} THB`}</div>
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
          {reviews.length > 0 ? (   
          <div>
            <ul>
              {reviews.map((review, index) => (
                <li key={index}>
                  <div className="review-header">
                    <p className="starClass">
                      {Array.from({ length: review.re_score }, (_, i) => (
                        <FontAwesomeIcon icon={faStar} key={i} />
                      ))}
                    </p>
                    <p>{review.re_text}</p>
                  </div>
                  <p>{review.createdAt ? formatDate(review.createdAt) : "N/A"}</p>
                </li>
              ))}
            </ul>
          </div>
         ) : (
            <p>This seller hasn't received any reviews.</p>
          )
        }
          
        </div>
      </Row>
    </Container>
  );
}

export default SellerProfile;
