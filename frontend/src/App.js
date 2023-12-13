import React, { useState, useEffect } from "react";
import "../src/css/index.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./component/route/ProtectedRoute";
import Navbar from "./component/navbar";
import Home from "./page/home";
import Login from "./page/login";
import Register from "./page/register";
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
import AdminViewRequest from "./page/adminViewRequest";
import RequireAuth from "./component/route/RequireAuth";
import Layout from "./component/Layout";
import NewPassword from "./page/NewPassword";
import ForgotPassword from "./page/ForgotPassword";
import Submitted from "./page/submitted";
import MyProfile from "./page/myProfile";
// import UserProfile from "./page/userProfile";

// from store
import store from "./store";
import { useSelector } from "react-redux";
import { loadUser } from "./actions/userActions";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
    console.log("User loaded");
  }, [store]);

  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) {
    return null;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/password/forgot" element={<ForgotPassword />} exact />
        <Route path="/password/reset/:token" element={<NewPassword />} exact />
        {/* UserPage */}
        <Route
          element={
            <RequireAuth
              allowedRoles={"user"}
              isAuthenticated={isAuthenticated}
            />
          }
        >
          <Route path="products" element={<Products />} />
        </Route>
        <Route
          element={
            <RequireAuth
              allowedRoles={"user"}
              isAuthenticated={isAuthenticated}
            />
          }
        >
          <Route path="productDetail/:id" element={<ProductDetail />} />
        </Route>
        <Route
          element={
            <RequireAuth
              allowedRoles={"user"}
              isAuthenticated={isAuthenticated}
            />
          }
        >
          <Route path="userVerify" element={<UserVerify />} />
        </Route>
        <Route
          element={
            <RequireAuth
              allowedRoles={"user"}
              isAuthenticated={isAuthenticated}
            />
          }
        >
          <Route path="myProfile" element={<MyProfile />} />
        </Route>
        <Route
          element={
            <RequireAuth
              allowedRoles={"user"}
              isAuthenticated={isAuthenticated}
            />
          }
        >
          <Route path="submitted" element={<Submitted />} />
        </Route>
        <Route
          element={
            <RequireAuth
              allowedRoles={"user"}
              isAuthenticated={isAuthenticated}
            />
          }
        >
          <Route path="myProducts" element={<MyProducts />} />
        </Route>

        {/* <Route
          element={
            <RequireAuth
              allowedRoles={"user"}
              isAuthenticated={isAuthenticated}
            />
          }
        >
          <Route path="userProfile" element={<UserProfile />} />
        </Route> */}
        <Route
          element={
            <RequireAuth
              allowedRoles={"user"}
              isAuthenticated={isAuthenticated}
            />
          }
        >
          <Route path="addProduct" element={<AddProduct />} />
        </Route>
        <Route
          element={
            <RequireAuth
              allowedRoles={"user"}
              isAuthenticated={isAuthenticated}
            />
          }
        >
          <Route path="editProduct/:id" element={<EditProduct />} />
        </Route>
        {/* AdminPage */}
        <Route
          element={
            <RequireAuth
              allowedRoles={"admin"}
              isAuthenticated={isAuthenticated}
            />
          }
        >
          <Route path="adminVerify" element={<AdminVerify />} />
        </Route>
        <Route
          element={
            <RequireAuth
              allowedRoles={"admin"}
              isAuthenticated={isAuthenticated}
            />
          }
        >
          <Route path="viewRequest/:id" element={<AdminViewRequest />} />
        </Route>

        {/* Add the NotFound route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
