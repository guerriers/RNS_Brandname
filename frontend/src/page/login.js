import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, clearErrors, loadUser } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";
import "../css/login.css";

const LoginPage = ({ location }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [formErrors, setFormErrors] = useState({});
  // const [loader, setLoader] = useState(false);

  const { user, isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const redirect = window.location.search
    ? window.location.search.split("=")[1]
    : "/products";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }

    if (error) {
      alert(error);
      console.log(error);
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
      await dispatch(login(email, password));
      setEmail("");
      setPassword("");
    } catch (err) {
      setIsSubmit(false);
      // console.log(err);
    }
  };

  return (
    <>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className="login">
          <div className="login-box">
            <div className="box-border">
              <div>
                <img src="../rns_logo.png" alt="Logo" className="img-logo" />
              </div>
              <form className="form-wrapper" onSubmit={handleSubmit}>
                <input
                  className="input"
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                <input
                  className="input2"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />

                <div className="checkbox-container">
                  <input type="checkbox" id="rememberMe" />
                  <label for="rememberMe">Remember me</label>

                  <a class="forgetPW" href="#">
                    Forget password?
                  </a>
                </div>

                <button className="button-submit" type="submit">
                  LOGIN
                </button>
                <p className="fffText">
                  Don't have an account? | <a href="/register">Create a new account</a>
                </p>
              </form>
            </div>
          </div>
          {/* <Fragment>{loader ? (<Fragment><Loader /></Fragment>) : ""}</Fragment> */}
        </div>
      )}
    </>
  );
};

export default LoginPage;
