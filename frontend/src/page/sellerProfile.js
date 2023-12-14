import React, { useEffect, useState } from "react";
import { Button, Modal, Container } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import "../css/sellerProfile.css";

function SellerProfile() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [productCount, setProductCount] = useState(0);
  const [userProducts, setUserProducts] = useState([]);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportContent, setReportContent] = useState("");
  const { isVerified, verify_status } = useSelector(
    (state) => state.verify_status
  );

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
        .catch((error) => console.error("Error fetching user details from URL: ", error));
        
  }, [id]);

  const fetchProducts = (userId) => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_BASE_URL}/api/products/myProducts?user_id=${userId}`, {
      method: 'GET',
      headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserProducts(data);
        setProductCount(data.length);
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

    // Perform the submission logic here
    console.log("Submitting report:", reportContent);

    // Add logic for sending the report to the server or performing other actions
    // For example, you might want to send a request to your server to handle the report
    // ...

    // Close the modal after submission
    handleCloseReportModal();
  };


  return (
    <Container>
      <div className="user-profile-container">
        <div className="user-profile-image">
          <img src="../assets/userProfile.png" alt="user profile" /> {/* Don't forgot to change the pic na */}
        </div>
        <div className="user-profile-info">
          <h2>{user.f_name} {user.l_name}</h2>
          <span className="verified-badge"> {isVerified ? "Verified" : "Need Verified"} </span>
          <h3>{user.email}</h3>
          <h3>{user.phone}</h3>
          <div>
            <h3>Products from {user.f_name}: {productCount}</h3>
            <h3>Joined since: {user.createdAt}</h3>
          </div>
          <div>
          <button className='report-button' onClick={handleReportClick}>Report</button>
          </div>
        </div>
      </div>

      <div className="sellerProduct-grid">
        <h4>Products from this seller:</h4>
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
        <Modal show={showReportModal} onHide={handleCloseReportModal}>
        <Modal.Header closeButton>
            <Modal.Title>Report Seller</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {/* Report form */}
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="reportContent" className="form-label">Report Content:</label>
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
