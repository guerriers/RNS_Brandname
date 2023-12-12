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
  //   const [isPopupBoxVisible, setIsPopupBoxVisible] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isTermsOfServicePopupVisible, setIsTermsOfServicePopupVisible] =
    useState(false);

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
    if (!isTermsOfServicePopupVisible) {
      setTermsOfService(e.target.checked);
    }
  };

  const handleTermsOfServiceClick = () => {
    setIsTermsOfServicePopupVisible(!isTermsOfServicePopupVisible);
  };

  const handleAccept = () => {
    setTermsOfService(true);
    setIsTermsOfServicePopupVisible(false);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    const formData = new FormData();
    formData.set("firstName", firstName);
    formData.set("lastName", lastName);
    formData.set("email", email);
    formData.set("phone", phone);
    formData.set("password", password);

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
      await dispatch(register(formData));
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
      {isTermsOfServicePopupVisible && (
        <div className="terms-of-service-popup">
          <h3>Terms of Service</h3>
          <div className="terms-of-service-content">
            <p>
              1.
              ทีมผู้พัฒนาเป็นเพียงสื่อกลางในการซื้อขายแลกเปลี่ยนสินค้าแบรนด์เนมมือสองเท่านั้น
              หากเกิดความเสียหายขึ้น
              ทางทีมผู้พัฒนาจะไม่รับผิดชอบในกรณีใดทั้งสิ้น
            </p>
            <p>
              2. ทีมผู้พัฒนามีการเก็บรวบรวมข้อมูลผู้ใช้บริการ
              และอาจมีการเปิดเผยชื่อ นามสกุล อีเมล หมายเลขโทรศัพท์
              หมายเลขบัตรประชาชน บัญชีทางการเงิน และอื่นๆ
              เพื่อใช้เป็นการยืนยันตัวตนรวมถึงช่องทางการติดต่อระหว่างผู้ซื้อและผู้ขาย
            </p>
            <p>
              3.
              ทีมผู้พัฒนาขอสงวนสิทธิ์ในการเปลี่ยนแปลงข้อตกลงในการให้บริการได้ตลอดเวลา
              โดยไม่ต้องแจ้งให้ผู้ใช้บริการทราบล่วงหน้า
            </p>
          </div>
          <div className="termsButton">
            <button
              className="acceptButton"
              type="button"
              onClick={handleAccept}
            >
              Accept
            </button>
            <button className="closeButton" onClick={handleTermsOfServiceClick}>
              Close
            </button>
          </div>
        </div>
      )}
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className="register">
          <div className="register-box">
            <div className="box-border-register">
              <div>
                <img
                  src="../rns_logo.png"
                  alt="Logo"
                  className="img-logo-register"
                />
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
                    Yes, I agree to the{" "}
                    <a href="#" onClick={handleTermsOfServiceClick}>
                      Terms of Service
                    </a>
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
