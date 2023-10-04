import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "admin@admin.com" && password === "1234") {
      localStorage.setItem("email", email);
      localStorage.setItem("status", "0");
      navigate("/products"); 
    } else if (email === "user@user.com" && password === "1234") {
      localStorage.setItem("email", email);
      localStorage.setItem("status", "1");
      navigate("/"); 
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
