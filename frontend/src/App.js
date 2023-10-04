import React from "react";
import "../src/css/index.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
// import ProtectedRoute from "./component/route/ProtectedRoute";
import Navbar from "./component/navbar";
import Home from "./page/home";
import Login from "./page/login";
import Products from "./page/products";
import MyProducts from "./page/myProducts";
import ProductDetail from "./page/productDetail";
import NotFound from "./component/notFound";

function App() {
  // const getEmail = localStorage.getItem("email");
  // const email = JSON.parse(getEmail);

  return (
    <div className="App">
      {/* {email ? <Navbar /> : null} */}
      <Navbar />
      <Container className="body_context">
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* UserPage */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/myProducts" element={<MyProducts />} />
          <Route path="/productDetail" element={<ProductDetail />} />
          {/* <ProtectedRoute path="/" element={<Home />} isAdmin={true} /> */}
          {/* <ProtectedRoute path="/product" element={<Product />} isAdmin={true} /> */}
          {/* AdminPage */}
          {/* <ProtectedRoute path="/admin" element={<Home />} isAdmin={false} /> */}
          {/* Add the NotFound route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;