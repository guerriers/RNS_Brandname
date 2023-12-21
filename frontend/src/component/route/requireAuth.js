/* eslint-disable */
import React, { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { loadUser } from "../../actions/userActions";


const RequireAuth = ({ allowedRoles, isAuthenticated }) => {
  const { user, loading } = useSelector((state) => state.auth);
  const location = useLocation();


  return user && user.roles
    ? allowedRoles.includes(user.roles) ? (
      <Outlet />
    ) : (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    )
    : user && user.email || isAuthenticated ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;
