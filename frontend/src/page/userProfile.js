import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import "../css/userProfile.css";

function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [isSellerProfile, setIsSellerProfile] = useState(false);
  const [productCount, setProductCount] = useState(0);
  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const userId = params.id;

    if (userId) {
      fetch(`${process.env.REACT_APP_BASE_URL}/api/users/${userId}`)
        .then((response) => response.json())
        .then((userData) => {
          setUser(userData);
          setIsSellerProfile(true);
          fetchProducts(id);
        })
        .catch((error) => console.error("Error fetching user details from URL: ", error));
    } else {
      fetch(`${process.env.REACT_APP_BASE_URL}/api/users/current`)
        .then((response) => response.json())
        .then((userData) => {
          setUser(userData);
          setIsSellerProfile(false);
          fetchProducts(id);
        })
        .catch((error) => console.error("Error fetching current user details: ", error));
    }

    if (isSellerProfile) {
      fetch(`${process.env.REACT_APP_BASE_URL}/api/products/count?user_id=${userId}`)
        .then((response) => response.json())
        .then((countData) => {
          setProductCount(countData.count);
        })
        .catch((error) => console.error("Error fetching product count: ", error));
    }
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
      })
      .catch((error) => {
        console.error("Error fetching user products data:", error);
      });
  };

  return (
    <Container>
      <div className="user-profile-container">
        <div className="user-profile-image">
          <img src="../assets/userProfile.png" alt="user profile" />
        </div>
        <div className="user-profile-info">
          <h1>{user.f_name} {user.l_name}</h1>
          <h3>{user.email}</h3>
          <h3>{user.phone}</h3>
          <div>
            <h3>Count Products from this seller: {productCount}</h3>
            <h3>Joined since: {user.joinDate}</h3>
          </div>
          <div>
            <h3>Report Button</h3>
          </div>
        </div>
      </div>

      <div className="userProduct-grid">
        {userProducts.length > 0 ? (
          userProducts.map((product) => (
                <Link to={`/productDetail/${product.id}`} key={product.id}>
                  <div className="product-box">
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
          <p>You have not post some Product.</p>
        )}
      </div>

    </Container>
  );
}

export default UserProfile;
