import React, { useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


const ProtectedRoute = ({ path, element }) => {
  const {isAuthenticated} = useSelector((state) => state.auth);

  return isAuthenticated ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default ProtectedRoute;