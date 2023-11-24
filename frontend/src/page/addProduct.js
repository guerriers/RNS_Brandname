import React, { useState, useEffect } from "react";
import { Form, Row, Col, Image, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../css/addProduct.css";
import { useSelector } from "react-redux";
import axios from "axios";


const AddProduct = () => {
  const { user, loading } = useSelector(state => state.auth);
  const initialValues = {
    p_name: "Product Name",
    p_category: "",
    p_price: "5000",
    p_conditions: "50",
    p_brand: "Product Brand",
    p_description:
      "Lorem Ipsum is simply dummy text.",
    p_status: "",
  };

  const [productsPreview, setProductsPreview] = useState([])
  const [products, setProducts] = useState([]);
  const [receiptsPreview, setReceiptsPreview] = useState([])
  const [receipts, setReceipts] = useState([]);
  const [formValues, setFormValues] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleReset = () => {
    setIsSubmit(false);
    navigate("/myProducts");
  };

  const handleChange = (e) => {
    const files = Array.from(e.target.files)

    setProductsPreview([]);
    setProducts([])

    files.forEach(file => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setProductsPreview(oldArray => [...oldArray, reader.result])
        }
      }

      reader.readAsDataURL(file)
    })
    setProducts(files)
  };

  const handleReceipt = (e) => {
    const files = Array.from(e.target.files)

    setReceiptsPreview([]);
    setReceipts([])

    files.forEach(file => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setReceiptsPreview(oldArray => [...oldArray, reader.result])
        }
      }

      reader.readAsDataURL(file)
    })
    setReceipts(files)
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

      const formData = new FormData();
      Object.entries(formValues).forEach(([key, value]) => {
        formData.append(key, value);
      });
  

      products.forEach(product => {
        formData.append('p_img', product)
      })
      receipts.forEach(receipt => {
        formData.append('p_receipt', receipt)
      })

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/products`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
        
      if (response.status === 201) {
        alert("Added Product successfully");
        console.log("showSuccessMessage before:", showSuccessMessage);
        setShowSuccessMessage(true);
        console.log("showSuccessMessage after:", showSuccessMessage);
        setIsSubmit(true);
        handleReset();
      } if (response.status === 401) {
        alert(response.message);
      }
    }
  };
  useEffect(() => {
    
  });
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
            {productsPreview.map(img => (
              <img src={img} key={img} alt="Products Preview" className="mt-3 mr-2" width="55" height="52" />
            ))}

            <Form.Group as={Col} controlId="formFileMultiple">
              <Form.Label>add image<span style={{ color: "red" }}> *</span></Form.Label>
              <Form.Control
                type="file"
                accept=".png, .jpg, .jpeg"
                name="p_img"
                required
                value={formValues.p_img}
                onChange={handleChange}
                multiple
              />

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
                onChange={(e) =>
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    p_name: e.target.value,
                  }))
                }
              />
              <Form.Control.Feedback type="invalid">
                Please Add Product Name
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCategory">
              <Form.Label>
                Category<span style={{ color: "red" }}> *</span>
              </Form.Label>
              <Form.Select name="p_category" onChange={(e) =>
                setFormValues((prevValues) => ({
                  ...prevValues,
                  p_category: e.target.value,
                }))
              } required>
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
                onChange={(e) =>
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    p_price: e.target.value,
                  }))
                }
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
                onChange={(e) =>
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    p_conditions: e.target.value,
                  }))
                }
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
                onChange={(e) =>
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    p_brand: e.target.value,
                  }))
                }
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
              onChange={(e) =>
                setFormValues((prevValues) => ({
                  ...prevValues,
                  p_description: e.target.value,
                }))
              }
            />
            <Form.Control.Feedback type="invalid">
              Please Add Description
            </Form.Control.Feedback>
          </Form.Group>
          {receiptsPreview.map(img => (
            <img src={img} key={img} alt="Receipts Preview" className="mt-3 mr-2" width="55" height="52" />
          ))}
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridReceipt">
              <Form.Label>Add Receipt<span style={{ color: "red" }}> +</span></Form.Label>
              <Form.Control
                type="file"
                name="p_receipt"
                accept=".png, .jpg, .jpeg"
                value={formValues.p_receipt}
                onChange={handleReceipt}
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
                onChange={(e) =>
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    p_status: e.target.value,
                  }))
                }
              />
              <Form.Check
                value="0"
                inline
                label="For Rent"
                name="p_status"
                type="radio"
                required
                onChange={(e) =>
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    p_status: e.target.value,
                  }))
                }
              />
            </Form.Group>
          </Row>
          <div className="warpPerButton">
            <button className="viewDataSubmit">Add Product</button>
            <button
              className="viewDataSubmit"
              type="button"
              onClick={handleReset}
            >
              Cancel
            </button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default AddProduct;
