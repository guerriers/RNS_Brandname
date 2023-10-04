// // import "../css/login.css";
// import React from "react";
// import { useState, useEffect } from "react";
// import auth from "../component/route/auth";

// const LoginPage = ({ history, location }) => {
//   const initialValues = {
//     email: "user@user.com",
//     password: "1234",
//   };
//   const [formValues, setFormValues] = useState(initialValues);
//   const [formErrors, setFormErrors] = useState({});
//   const [isSubmit, setIsSubmit] = useState(false);
//   // const [loader, setLoader] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//   };

//   const validate = (values) => {
//     const errors = {};
//     if (!values.email) {
//       errors.email = "Email is Required";
//     }
//     if (!values.password) {
//       errors.email = "Password is Required";
//     }
//     return errors;
//   };
//   const redirect = location ? (location.search ? location.search.split("=")[1] : "/") : "/";
//   useEffect(() => {
//     if (!auth.isAuthenticated) {
//       history.push(redirect);
//     }
//     if (Object.keys(formErrors).length === 0 && isSubmit) {
//       console.log(formValues);
//     }

//   }, []);
//   const onSubmit = async (roomData) => {
//     roomData.preventDefault();
//     setFormErrors(validate(formValues));
//     // setLoader(true);

//     await fetch(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formValues),
//     })
//       .then((response) => response.json())
//       .then((res) => {
//         if (res.statusCode === 200) {

//           alert("login success");
//           if (res.data.status === "1") {
//             localStorage.setItem("email", JSON.stringify(res.data.email));
//             localStorage.setItem("status", res.data.status);
//             setIsSubmit(true);
//             auth.authenticated = true;
//             auth.isAdmin = true;
//             // setLoader(false);

//           } else {
//             localStorage.setItem("email", JSON.stringify(res.data.email));
//             localStorage.setItem("status", res.data.status);
//             setIsSubmit(true);
//             auth.authenticated = true;
//             auth.isAdmin = false;
//             history.push("/product");
//             window.location.reload();
//             // setLoader(false);
//           }
//         }
//         if (res.statusCode === 401) {
//           setIsSubmit(false);
//           auth.authenticated = false;
//           alert(res.message);
//           window.location.reload();
//           // setLoader(false);
//         }
//       })

//   };
//   return (
//     <>
//     <div className="box_login">
//       <div className="box_border">
//         <div className="box_context">
//           <div className="head_context">
//             <img
//               className="img_logo"
//               src={"../rns_logo.png"}
//               alt="logo"
//             />
//             <p className="p">rns </p>
//           </div>
//           <form className="form_warpper" onSubmit={onSubmit}>
//             <input
//               className="input"
//               type="text"
//               name="email"
//               placeholder="email"
//               value={formValues.email}
//               onChange={handleChange}
//             />
//             <input
//               className="input"
//               type="password"
//               name="password"
//               placeholder="password"
//               value={formValues.password}
//               onChange={handleChange}
//             />
//             <button className="button_submit" type="submit">
//               Login
//             </button>
//           </form>
//           <p className="p">{formErrors.email}</p>
//         </div>
//       </div>
//     </div>
//     {/* <Fragment>{loader ? (<Fragment><Loader /></Fragment>) : ""}</Fragment> */}
//     </>
//   );
// };

// export default LoginPage;