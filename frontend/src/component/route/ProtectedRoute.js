import React from "react";
import { Route, useNavigate } from "react-router-dom";
const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const navigate = useNavigate();
  const getEmail = localStorage.getItem("email");
  const getStatus = localStorage.getItem("status");
  const email = JSON.parse(getEmail);
  const status = JSON.parse(getStatus);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!email && !status) {
          navigate("/login");
        }
        if (isAdmin === true && status === "0") {
          navigate("/home");
        }
        if (isAdmin === false && status === "1") {
          navigate("/product");
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;
