import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/myProducts.css";
const MyProducts = () => {
  const [myProducts, setMyProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/products`)
      .then((response) => {
        setMyProducts(response.data);
        console.log("Received product data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);

  return (
    <div>
      <h1>My Products</h1>
      <Link to="/add-product" className="add-product-button">
        +Add Product
      </Link>
      <div className="product-grid">
        {myProducts.map((product) => (
          <Link to={`/productDetail/${product.id}`} key={product.id}>
            <div className="product-box">
              <img src={product.p_img} alt={product.p_name} />
              <div className="product-status">
                {product.p_status === '0' ? 'For Rent' : 'For Sell'}
                
              </div>
              
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyProducts;
