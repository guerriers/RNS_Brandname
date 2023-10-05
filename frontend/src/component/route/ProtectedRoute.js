import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, isAdmin, ...rest }) => {
  const getEmail = localStorage.getItem("email");
  const getStatus = localStorage.getItem("status");
  const email = JSON.parse(getEmail);
  const status = JSON.parse(getStatus);

  if (!email || !status) {
    return <Navigate to="/login" />;
  }

  if (isAdmin && status !== "1") {
    return <Navigate to="/home" />;
  }

  if (!isAdmin && status === "1") {
    return <Navigate to="/products" />;
  }

  return <Component {...rest} />;
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
