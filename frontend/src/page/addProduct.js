import React, { useState, useEffect } from "react";
import { Form, Row, Col, Image, Container } from "react-bootstrap";
import "../css/addProduct.css";

const AddProduct = () => {
  const initialValues = {
    user_id: "1",
    p_name: "",
    p_category: "",
    p_price: "",
    p_conditions: "",
    p_brand: "",
    p_description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing.",
    p_receipt: "",
    p_status: "",
    p_img: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleReset = () => {
    setIsSubmit(false);
    window.location = "/myProduct";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "p_img") {
      setFormValues({ ...formValues, [name]: value });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const onSubmit = async (Product) => {
    const form = Product.currentTarget;
    Product.preventDefault();
    Product.stopPropagation();
    if (form.checkValidity() === false) {
      Product.preventDefault();
      Product.stopPropagation();
    }

    setValidated(true);

    if (form.checkValidity()) {
      await fetch(`${process.env.REACT_APP_BASE_URL}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.statusCode === 201) {
            alert("Added Product successfully");
            console.log("showSuccessMessage before:", showSuccessMessage);
            setShowSuccessMessage(true);
            console.log("showSuccessMessage after:", showSuccessMessage);
            setIsSubmit(true);
            handleReset();
          }
          if (res.statusCode === 401) {
            alert(res.message);
          }
        });
    }
  };
  useEffect(() => {});
  return (
    <Container>
      <div>
        {showSuccessMessage && (
          <div className="success-message">Product added successfully!</div>
        )}
        <div className="Header">
          <h1>Add Product</h1>
        </div>

        <Form
          className="wrapperViewProduct"
          noValidate
          validated={validated}
          onSubmit={onSubmit}
        >
          <Col xs={6} md={4}>
            {/* <Image src="xxx.jpeg" rounded /> */}
            <Form.Group as={Col} controlId="formFileMultiple">
              <Form.Label>add image +</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                name="p_img"
                value={formValues.p_img}
                onChange={handleChange}
              />
              <span style={{ color: "red" }}> (only .png, .jpg, .jpeg)</span>
              <Form.Control.Feedback type="invalid">
                Please Add Receipt
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>
                Name<span style={{ color: "red" }}> *</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Product name"
                value={formValues.p_name}
                name="p_name"
                required
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please Add Product Name
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCategory">
              <Form.Label>
                Category<span style={{ color: "red" }}> *</span>
              </Form.Label>
              <Form.Select name="p_category" onChange={handleChange} required>
                <option value={""}>Category</option>
                <option value="Clothes">Clothes</option>
                <option value="Accessories">Accessories</option>
                <option value="Shoes/Sneakers">Shoes/Sneakers</option>
                <option value="Headwear">Headwear</option>
                <option value="Eyewear">Eyewear</option>
                <option value="Bag">Bag</option>
                <option value="Others">Others</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please Select Category
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridPrice">
              <Form.Label>
                Price | THB<span style={{ color: "red" }}> *</span>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Product Price"
                name="p_price"
                required
                value={formValues.p_price}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please Add Product Price
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCondition">
              <Form.Label>
                Conditions<span style={{ color: "red" }}> *</span>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Product Condition (%)"
                name="p_conditions"
                required
                value={formValues.p_conditions}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please Add Condition
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridBrand">
              <Form.Label>
                Brand<span style={{ color: "red" }}> *</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Product Brand"
                name="p_brand"
                required
                value={formValues.p_brand}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please Add Brand
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>
              Description<span style={{ color: "red" }}> *</span>
            </Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              placeholder="Product Description"
              name="p_description"
              style={{ height: "100px" }}
              required
              value={formValues.p_description}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please Add Description
            </Form.Control.Feedback>
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridReceipt">
              <Form.Label>Receipt</Form.Label>
              <Form.Control
                type="file"
                name="p_receipt"
                value={formValues.p_receipt}
                onChange={handleChange}
              />
              <span style={{ color: "red" }}> (only .png, .jpg, .jpeg)</span>
              <Form.Control.Feedback type="invalid">
                Please Add Receipt
              </Form.Control.Feedback>
            </Form.Group>

            {/* <div className="check"> */}
            <Form.Group as={Col} controlId="formGridStatus">
              <span style={{ color: "red" }}> *</span>
              <Form.Check
                value="1"
                inline
                label="For Sell"
                name="p_status"
                type="radio"
                required
                onChange={handleChange}
                checked={formValues.p_status === "1"}
              />
              <Form.Check
                value="0"
                inline
                label="For Rent"
                name="p_status"
                type="radio"
                required
                onChange={handleChange}
                checked={formValues.p_status === "0"}
              />
            </Form.Group>
          </Row>
          <div className="warpPerButton">
            <button className="viewDataSubmit">Add Product</button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default AddProduct;