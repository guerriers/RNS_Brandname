import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/products.css';
const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/products`)
      .then((response) => {
        setProducts(response.data);
        console.log('Received product data:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <Link to={`/productDetail/${product.id}`} key={product.id}>
            <div className="product-box">
              <img src={product.p_img} alt={product.p_name} />
            
              <div className="product-status">{product.p_status === 0 ? 'For Rent' : 'For Sell'}</div>
              <div className="product-price">{`${product.p_price} THB`}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Product;
