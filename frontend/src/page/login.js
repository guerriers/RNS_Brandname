import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, clearErrors, loadUser } from "../actions/userActions";
import { useDispatch, useSelector } from 'react-redux'
import useAuth from "../hooks/useAuth";


const LoginPage = ({ location }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const redirect = window.location.search ? window.location.search.split("=")[1] : "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }

    if (error) {
      alert(error);
      console.log(error)
      dispatch(clearErrors());
    }

  }, [dispatch, alert, isAuthenticated, error, navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    try {
      await dispatch(login(email, password))
      setEmail('')
      setPassword('') 
    }
    catch (err) {
      setIsSubmit(false);
      console.log("adasasdasd",err);
    }
};

return (
  <>
    {loading ? (
      <div>loading...</div>
    ) : (
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )}
  </>
);
};

export default LoginPage;
