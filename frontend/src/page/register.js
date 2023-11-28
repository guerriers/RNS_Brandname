import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { register, clearErrors, loadUser } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";
import "../css/register.css";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [termsOfService, setTermsOfService] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  // Redirect logged in
  const redirect = window.location.search
    ? window.location.search.split("=")[1]
    : "/";

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

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRePasswordChange = (e) => {
    setRePassword(e.target.value);
  };

  const handleTermsOfServiceChange = (e) => {
    setTermsOfService(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    if (!termsOfService) {
      alert("Please agree to the terms of service.");
      setIsSubmit(false);
      return;
    }

    if (password !== rePassword) {
      alert("Passwords do not match.");
      setIsSubmit(false);
      return;
    }

    try {
      await dispatch(
        register(firstName, lastName, email, phone, password, rePassword)
      );
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRePassword("");
      setTermsOfService(false);
    } catch (err) {
        setIsSubmit(false);
        if (err.response) {
      
          const { message } = err.response.data;
          alert(message);
          dispatch(clearErrors()); 
        } else {
          console.error("Error:", err);
        }
    }
  };
  return (
    <>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className="register">
          <div className="register-box">
            <div className="box-border-register">
              <div>
                <img src="../rns_logo.png" alt="Logo" className="img-logo-register" />
              </div>
              <form className="form-wrapper-register" onSubmit={handleSubmit}>
                <div className="rowInput-register">
                  <input
                    className="input-register"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    required
                  />
                  <input
                    className="input2-register"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={handleLastNameChange}
                    required
                  />
                </div>
                <input
                  className="input-register"
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                <input
                  className="input-register"
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={handlePhoneChange}
                  required
                />
                <div className="rowInput-register">
                  <input
                    className="input-register"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                  <input
                    className="input2-register"
                    type="password"
                    name="rePassword"
                    placeholder="Re-enter Password"
                    value={rePassword}
                    onChange={handleRePasswordChange}
                    required
                  />
                </div>

                <div className="checkbox-container-register">
                  <input
                    type="checkbox"
                    id="termsOfService"
                    checked={termsOfService}
                    onChange={handleTermsOfServiceChange}
                  />
                  <label for="termsOfService">
                    Yes, I agree to the <a href="#">Terms of Service</a>
                  </label>
                </div>

                <button
                  className="button-submit-register"
                  type="submit"
                  disabled={isSubmit}
                >
                  {isSubmit ? "Registering..." : "SIGN UP"}
                </button>
                <p className="fffText-register">
                  Already have an account? | <a href="/login">Sign-in here!</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterPage;
