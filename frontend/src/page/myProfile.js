import React, { useState, useEffect } from "react";
import { Form, Col, Container, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import "../css/myProfile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const navigate = useNavigate();
  const [profilePreview, setProfilePreview] = useState([]);
  const [profile, setProfile] = useState([]);
  const [oldProfile, setOldProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [validated, setValidated] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const id = localStorage.getItem("id");
  const [formValues, setFormValues] = useState({
    profile_img: [],
    f_name: "",
    l_name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchInitialValues = async () => {
      try {
        if (!user || !user.id) {
          console.error("User object or user ID is null or undefined.");
          setLoading(false);
          return;
        }

        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/users/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFormValues(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching initial values:", error);
        setLoading(false);
      }
    };

    fetchInitialValues();
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleChange = (e) => {
    const files = Array.from(e.target.files);

    setProfilePreview([]);
    setProfile([]);

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
        formData.append("img", file);
      });

      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/users/${user.id}`,
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
        // navigate("/myProfile");
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
    });
  };

  return (
    <Container>
      <div>
        <h1 className="title">My Profile</h1>

        <Form>
          <Form.Group as={Col} controlId="formFileMultiple">
            <Form.Label>
              <div className="myProfile-img-grid">
                <div className="profileImgBox">
                  {oldProfile.map((img, index) => (
                    <img
                      key={`${img.url}-${index}`}
                      src={img.url}
                      alt={img.url}
                      className="mt-3 mr-2"
                      width="55"
                      height="52"
                    />
                  ))}
                  <img
                    className="imagePreview"
                    src={"../assets/userProfile.png"}
                  />

                  {profilePreview.map((img) => (
                    <img
                      src={img}
                      key={img}
                      alt="Images Preview"
                      className="mt-3 mr-2"
                      width="55"
                      height="52"
                    />
                  ))}
                  {editMode && (
                    <div className="addProfileImgActions">
                      <span className="plus-sign-myP">+</span>
                      <Form.Control
                        type="file"
                        name="img"
                        accept="image/*"
                        onChange={handleChange}
                        style={{ display: "none" }}
                        multiple
                      />
                    </div>
                  )}
                </div>
              </div>
            </Form.Label>
          </Form.Group>
        </Form>

        <Col>
          <div className="editProfileForm">
            <Form.Group controlId="formGridFirstName">
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

            <Form.Group controlId="formGridLastName">
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

            <Form.Group controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={formValues.email}
                onChange={(e) =>
                  setFormValues({ ...formValues, email: e.target.value })
                }
                disabled={!editMode}
              />
            </Form.Group>

            <Form.Group controlId="formGridPhone">
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

            <div className="editProfileBtn">
              {editMode ? (
                <>
                  <Button variant="primary" type="submit" onClick={onSubmit}>
                    Save
                  </Button>
                  <Button variant="secondary" onClick={handleCancelClick}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button variant="primary" onClick={handleEditClick}>
                  Edit
                </Button>
              )}
            </div>
          </div>
        </Col>
      </div>
    </Container>
  );
};

export default MyProfile;
