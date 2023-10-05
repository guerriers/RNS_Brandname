import React from "react";
import "../src/css/index.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
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

function App() {
  const email = localStorage.getItem("email");

  return (
    <div className="App">
      {email ? <Navbar /> : null}
      <Navbar />
      <Container className="body_context">
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* UserPage */}
          <Route path="/myProducts" element={<MyProducts />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/productDetail/:id" element={<ProductDetail />} />
          <Route path="/editProduct/:id" element={<EditProduct />} />
          <Route
            path="/products"
            element={<ProtectedRoute component={Products} isAdmin={false} />}
          />

          {/* AdminPage */}
          <Route path="/" element={<Home />} />
          {/* <ProtectedRoute path="/" element={<Home />} isAdmin={true} /> */}

          {/* <Route path="/products" element={<Products />} /> */}
          {/* <ProtectedRoute
            path="/products"
            element={<Products />}
            isAdmin={false}
          /> */}

          {/* Add the NotFound route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
