import React, { useState, useEffect } from "react";
import { Form, Col, Row, Container, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import "../css/myProfile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const navigate = useNavigate();
  const [profilePreview, setProfilePreview] = useState([]);
  const [profile, setProfile] = useState([]);
  const [oldProfile, setOldProfile] = useState([]);
  const [oldProfilePreview, setOldProfilePreview] = useState([]);
  const [validated, setValidated] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { user, loading } = useSelector((state) => state.auth);
  const id = localStorage.getItem("id");
  const [formValues, setFormValues] = useState({
    profile_img: [],
    f_name: "",
    l_name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (loading) {
      return;
    }
    console.log("Loading profile", oldProfilePreview);
    if (user && user.profile_img) {
      console.log("USER", user);
      setFormValues(user);
      setOldProfile(user.profile_img || []);
      setOldProfilePreview(user.profile_img || []);
    }
  }, [user, setOldProfilePreview]);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  const handleChange = (e) => {
    const files = Array.from(e.target.files);

    setProfilePreview([]);
    setProfile([]);
    setOldProfile([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setProfilePreview((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
    setProfile(files);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("f_name", formValues.f_name);
      formData.append("l_name", formValues.l_name);
      formData.append("email", formValues.email);
      formData.append("phone", formValues.phone);
      profile.forEach((file) => {
        formData.append("profile_img", file);
      });

      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/auth/me/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Edit successfully");
        window.location.reload();
      } else {
        alert("Failed to edit. Please try again.");
      }
    } catch (error) {
      console.error("Error editing user:", error);
      alert("An error occurred while editing. Please try again.");
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setFormValues({
      profile_img: [],
      f_name: oldProfile.f_name,
      l_name: oldProfile.l_name,
      email: oldProfile.email,
      phone: oldProfile.phone,
      profile_img: oldProfile.map((img) => img.url),
    });
  };

  return (
    <Container>
      <div>
        <h1 className="title">My Profile</h1>
        <Row className="mb-3">
          <Form>
            <Form.Group as={Col} controlId="formFileMultiple">
              <Form.Label>
                <div className="myProfile-img-grid">
                  <div className="profileImgBox">

                  {/* {oldProfilePreview&&oldProfilePreview.map((img, index) => (
                      <img
                        key={`${img.url}`}
                        src={img.url}
                        alt={img.public_id}
                        className="mt-3 mr-2"
                        width="55"
                        height="52"
                      />
                    ))} */}
                    
                    <img
                        className="imagePreview"
                        src={"../assets/userProfile.png"}
                        alt="Default Profile"
                      />

                    {editMode && (
                      <div className="addProfileImgActions">
                        {profilePreview.map((img) => (
                          <img
                            key={`${img.url}`}
                            src={img.url}
                            alt={img.public_id}
                            className="mt-3 mr-2"
                            width="55"
                            height="52"
                          />
                        ))}
                        {/* <span className="plus-sign-myP">+</span> */}
                        {/* <Form.Control
                          type="file"
                          name="img"
                          accept="image/*"
                          onChange={handleChange}
                          style={{ display: "none" }}
                          multiple
                        /> */}
                      </div>
                    )}
                  </div>
                </div>
              </Form.Label>
            </Form.Group>
          </Form>
        </Row>

        <div className="addProductContainer">
          <Form className="wrapperViewProduct">
            <Row className="mb-3">
              <Form.Group as={Col} md={1}></Form.Group>
              <Form.Group as={Col} md={4} controlId="formGridFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  name="f_name"
                  value={formValues.f_name}
                  onChange={(e) =>
                    setFormValues({ ...formValues, f_name: e.target.value })
                  }
                  disabled={!editMode}
                />
              </Form.Group>
              <Form.Group as={Col} md={2}></Form.Group>
              <Form.Group as={Col} md={4} controlId="formGridLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  name="l_name"
                  value={formValues.l_name}
                  onChange={(e) =>
                    setFormValues({ ...formValues, l_name: e.target.value })
                  }
                  disabled={!editMode}
                />
              </Form.Group>
              <Form.Group as={Col} md={1}></Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md={1}></Form.Group>
              <Form.Group as={Col} md={4} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formValues.email}
                  onChange={(e) =>
                    setFormValues({ ...formValues, email: e.target.value })
                  }
                  disabled
                />
              </Form.Group>
              <Form.Group as={Col} md={2}></Form.Group>
              <Form.Group as={Col} md={4} controlId="formGridPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Phone"
                  name="phone"
                  value={formValues.phone}
                  onChange={(e) =>
                    setFormValues({ ...formValues, phone: e.target.value })
                  }
                  disabled={!editMode}
                />
              </Form.Group>
              <Form.Group as={Col} md={1}></Form.Group>
            </Row>
          </Form>
          <div className="editProfileButton">
            {editMode ? (
              <>
                <button className="addButton" onClick={onSubmit}>
                  Save
                </button>
                <button
                  className="cancelButton"
                  type="button"
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button className="editButton" onClick={handleEditClick}>
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MyProfile;
