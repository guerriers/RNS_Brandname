import React, { Fragment, useState } from "react";
import { Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({
  isAdmin,
  isAuthenticated,
  children 
}) => {
  const token = Cookies.get("token");
  const status = localStorage.getItem("status");
  if(!token){
    return <Navigate to="/login"/>
  }

  if (!isAdmin && status==="1") {
    return <Navigate to="/products" replace />
  }
  if (isAdmin && status==="0") {
    return <Navigate to="/admin" replace />
  }
  return children 

};

export default ProtectedRoute;

//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         if (!email && !status) {
//           navigate("/login");
//         }
//         if (isAdmin === true && status === "0") {
//           navigate("/home");
//         }
//         if (isAdmin === false && status === "1") {
//           navigate("/products");
//         }
//         return <Component {...props} />;
//       }}
//     />
//   );
// };
