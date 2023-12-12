import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearErrors } from "../actions/userActions";
import { useNavigate, useParams } from "react-router-dom";

const NewPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, success } = useSelector((state) => state.forgotPassword);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert("Password updated successfully");
      navigate("/login");
    }
  }, [dispatch, alert, error, success, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(token, formData));
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <Fragment>
      <div className="forgot-password-container">
        <form className="forgot-password-form shadow-lg" onSubmit={submitHandler}>
          <h1 className="">Reset Password</h1>
          <div className="form-group">
            <label htmlFor="password_field">Enter New Password</label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              value={password}
              placeholder="Enter New Password"
              onChange={(e) => setPassword(e.target.value)}
              style={{ opacity: 0.8 }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm_password_field">Confirm New Password</label>
            <input
              type="password"
              id="confirm_password_field"
              className="form-control"
              value={confirmPassword}
              placeholder="Confirm New Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ opacity: 0.8 }}
            />
          </div>

          <button
            id="forgot_password_button"
            type="submit"
            className="forgotButton"
          >
            Reset Password
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default NewPassword;
