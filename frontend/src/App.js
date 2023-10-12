import React, { useState, useEffect } from "react";
import "../src/css/index.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import ProtectedRoute from "./component/route/ProtectedRoute";
import Navbar from "./component/navbar";
import Home from "./page/home";
import Login from "./page/login";
import Products from "./page/products";
import MyProducts from "./page/myProducts";
import AddProduct from "./page/addProduct";
import EditProduct from "./page/editProduct";
import ProductDetail from "./page/productDetail";
import NotFound from "./component/notFound";
import UserVerify from "./page/userVerify";
import About from "./page/about";
import FAQs from "./page/faqs";
import AdminVerify from "./page/adminVerify";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/auth/me`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.status === 200) {
          localStorage.setItem("status", response.data.user.status);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error(err);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/login" element={<Login />} />
        {/* UserPage */}
        <Route
          path="/products"
          element={
            <ProtectedRoute isAdmin={false} isAuthenticated={isAuthenticated}>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/productDetail/:id"
          element={
            <ProtectedRoute isAdmin={false} isAuthenticated={isAuthenticated}>
              <ProductDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userVerify"
          element={
            <ProtectedRoute isAdmin={false} isAuthenticated={isAuthenticated}>
              <UserVerify />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myProducts"
          element={
            <ProtectedRoute isAdmin={false} isAuthenticated={isAuthenticated}>
              <MyProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addProduct"
          element={
            <ProtectedRoute isAdmin={false} isAuthenticated={isAuthenticated}>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editProduct/:id"
          element={
            <ProtectedRoute isAdmin={false} isAuthenticated={isAuthenticated}>
              <EditProduct />
            </ProtectedRoute>
          }
        />
        {/* AdminPage */}
        <Route
          path="/adminVerify"
          element={
            <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}>
              <AdminVerify />
            </ProtectedRoute>
          }
        />

        {/* Add the NotFound route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
