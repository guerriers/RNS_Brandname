import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearErrors } from "../actions/userActions";
import "../css/forgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert(message);
    }
  }, [dispatch, alert, error, message]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("email", email);

    dispatch(forgotPassword(formData));
    setEmail("");
  };

  return (
    <Fragment>
      <div className="forgot-password-container">
        <form
          className="forgot-password-form shadow-lg"
          onSubmit={submitHandler}
        >
          <h1 className="">Forgot Password</h1>
          <div className="form-group">
            <label htmlFor="email_field">Enter Your Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              style={{ opacity: 0.8 }}
            />
          </div>

          <button
            id="forgot_password_button"
            type="submit"
            className="forgotButton"
            disabled={loading ? true : false}
          >
            {loading ? "Sending..." : "Send email"}
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
