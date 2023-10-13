import React from "react";
import { Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ isAdmin, isAuthenticated, children }) => {
  const token = Cookies.get("token");
  const status = localStorage.getItem("status");
  if (!token) {
    return <Navigate to="/login" />;
  }
  if (isAdmin && status === "0") {
    return <Navigate to="/admin" replace />;
  }
  if (!isAdmin && status === "1") {
    return <Navigate to="/products" replace />;
  }
  return children;
};

export default ProtectedRoute;