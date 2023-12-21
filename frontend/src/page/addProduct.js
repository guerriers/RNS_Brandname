/* eslint-disable */
import React, { Fragment, useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/addProduct.css";

const AddProduct = () => {
  const initialValues = {
    p_name: "",
    p_category: "",
    p_price: "",
    p_conditions: "",
    p_brand: "",
    p_description: "",
    p_status: "",
  };

  const [productsPreview, setProductsPreview] = useState([]);
  const [products, setProducts] = useState([]);
  const [receiptsPreview, setReceiptsPreview] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [formValues, setFormValues] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleReset = () => {
    setIsSubmit(false);
    navigate("/myProducts");
  };

  const handleChange = (e) => {
    const files = Array.from(e.target.files);

    setProductsPreview([]);
    setProducts([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setProductsPreview((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
    setProducts(files);
  };

  const handleReceipt = (e) => {
    const files = Array.from(e.target.files);

    setReceiptsPreview([]);
    setReceipts([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setReceiptsPreview((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
    setReceipts(files);
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

      products.forEach((product) => {
        formData.append("p_img", product);
      });
      receipts.forEach((receipt) => {
        formData.append("p_receipt", receipt);
      });

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/products`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
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
      }
      if (response.status === 401) {
        alert(response.message);
      }
    }
  };
  return (
    <Fragment>
      <>
        <p className="addProduct-h">Add Product</p>
        <Row>
          <Col md={5}>
            <Form>
              <Form.Group as={Col} controlId="formFileMultiple">
                <Form.Label>
                  <div className="addProductGrid">
                  <span className="span-add-product" style={{ color: "red" }}> *</span>
                    <div className="addProductBox1">
                      {productsPreview.length > 0 ? (
                        <div>
                          <img
                            src={productsPreview[0]}
                            alt={`Product Preview 1`}
                            className="productPreview"
                          />
                        </div>
                      ) : (
                        <img src={"../assets/addImage.jpg"} />
                      )}
                      <div className="addProductActions">
                        <span className="plus-sign">+</span>
                      </div>
                    </div>
                    <div className="addProductBox">
                      {productsPreview.map((img, index) => (
                        <div key={index}>
                          <img
                            src={img}
                            alt={`Products Preview ${index + 1}`}
                            className="productPreview"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </Form.Label>
                <Form.Control
                  type="file"
                  name="img"
                  accept="image/*"
                  value={formValues.p_img}
                  onChange={handleChange}
                  style={{ display: "none" }}
                  multiple
                  required
                />
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <div className="addProductContainer">
              {showSuccessMessage && (
                <div className="success-message">
                  Product added successfully!
                </div>
              )}

              <Form
                className="wrapperViewProduct"
                noValidate
                validated={validated}
                onSubmit={onSubmit}
              >
                <Row className="mb-3">
                  {/* <Form.Group as={Col} md={1}></Form.Group> */}
                  <Form.Group as={Col} md={4} controlId="formGridName">
                    <Form.Label>
                      Product Name<span style={{ color: "red" }}> *</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Product name"
                      value={formValues.p_name}
                      onChange={(e) =>
                        setFormValues((prevValues) => ({
                          ...prevValues,
                          p_name: e.target.value,
                        }))
                      }
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Add Product Name
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md={1}></Form.Group>
                  <Form.Group as={Col} md={2} controlId="formGridCategory">
                    <Form.Label>
                      Category<span style={{ color: "red" }}> *</span>
                    </Form.Label>
                    <Form.Select
                      name="category"
                      onChange={(e) =>
                        setFormValues((prevValues) => ({
                          ...prevValues,
                          p_category: e.target.value,
                        }))
                      }
                      required
                    >
                      <option value={""}>Select Category</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Bag">Bag</option>
                      <option value="Clothes">Clothes</option>
                      <option value="Eyewear">Eyewear</option>
                      <option value="Headwear">Headwear</option>
                      <option value="Shoes/Sneakers">Shoes/Sneakers</option>
                      <option value="Others">Others</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Please Select Category
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md={1}></Form.Group>
                </Row>

                <Row className="mb-3">
                  {/* <Form.Group as={Col} md={4}></Form.Group> */}
                  <Form.Group as={Col} md={2} controlId="formGridPrice">
                    <Form.Label>
                      Price | THB<span style={{ color: "red" }}> *</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Product Price"
                      name="price"
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
                  <Form.Group as={Col} md={2} controlId="formGridCondition">
                    <Form.Label>
                      Conditions<span style={{ color: "red" }}> *</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Conditions (%)"
                      name="conditions"
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
                  <Form.Group as={Col} md={1}></Form.Group>
                  <Form.Group as={Col} md={2} controlId="formGridBrand">
                    <Form.Label>
                      Brand<span style={{ color: "red" }}> *</span>
                    </Form.Label>
                    <Form.Select
                      name="brand"
                      onChange={(e) =>
                        setFormValues((prevValues) => ({
                          ...prevValues,
                          p_brand: e.target.value,
                        }))
                      }
                      required
                    >
                      <option value={""}>Select Brand</option>
                      <option value={"Adidas"}>Adidas</option>
                      <option value={"Burberry"}>Burberry</option>
                      <option value={"Balenciaga"}>Balenciaga</option>
                      <option value={"Coach"}>Coach</option>
                      <option value={"Cartier"}>Cartier</option>
                      <option value={"Channel"}>Channel</option>
                      <option value={"Converse"}>Converse</option>
                      <option value={"Calvin Klein"}>Calvin Klein</option>
                      <option value={"ChristianLouboutin"}>
                        Christian Louboutin
                      </option>
                      <option value={"Dior"}>Dior</option>
                      <option value={"Fendi"}>Fendi</option>
                      <option value={"Gucci"}>Gucci</option>
                      <option value={"Guess"}>Guess</option>
                      <option value={"H&M"}>H&M</option>
                      <option value={"Hermes"}>Hermes</option>
                      <option value={"LVMH"}>LVMH</option>
                      <option value={"Lacoste"}>Lacoste</option>
                      <option value={"Louis Vuitton"}>Louis Vuitton</option>
                      <option value={"Nike"}>Nike</option>
                      <option value={"NewBalance"}>New Balance</option>
                      <option value={"Prada"}>Prada</option>
                      <option value={"Puma"}>Puma</option>
                      <option value={"Patek Philippe"}>Patek Philippe</option>
                      <option value={"Rolex"}>Rolex</option>
                      <option value={"RayBan"}>Ray Ban</option>
                      <option value={"Sephora"}>Sephora</option>
                      <option value={"Supreme"}>Supreme</option>
                      <option value={"Swarovski"}>Swarovski</option>
                      <option value={"Tom Ford"}>Tom Ford</option>
                      <option value={"Tiffany&Co."}>Tiffany&Co.</option>
                      <option value={"Tommy Hilfiger"}>Tommy Hilfiger</option>
                      <option value={"YSL"}>YSL</option>
                      <option value={"Vans"}>Vans</option>
                      <option value={"Versace"}>Versace</option>
                      <option value={"Valentino"}>Valentino</option>
                      <option value={"VictoriaSecret"}>
                        Victoria's Secret
                      </option>
                      <option value={"Zara"}>Zara</option>
                      <option value={"Others"}>Others</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Please Add Brand
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md={7} controlId="formGridDescription">
                    <Form.Label>
                      Description<span style={{ color: "red" }}> *</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
                      placeholder="Product Description"
                      name="description"
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
                </Row>

                {receiptsPreview.map((img) => (
                  <img
                    src={img}
                    key={img}
                    alt="Receipts Preview"
                    className="mt-3 mr-2"
                    width="55"
                    height="52"
                  />
                ))}
                <Row className="mb-3">
                  {/* <Form.Group as={Col} md={4}></Form.Group> */}
                  <Form.Group as={Col} md={2} controlId="formGridReceipt">
                    <Form.Label>
                      Receipt
                      <p className="receiptAddFile">Add File</p>
                    </Form.Label>
                    <Form.Control
                      type="file"
                      name="receipt"
                      placeholder="Add File"
                      accept="image/*"
                      value={formValues.p_receipt}
                      onChange={handleReceipt}
                      style={{ display: "none" }}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md={3}></Form.Group>
                  <Form.Group as={Col} md={2} controlId="formGridStatus">
                    <Form.Label>
                      Rent | Sell
                      <span style={{ color: "red" }}> *</span>
                    </Form.Label>
                    <Form.Select
                      name="status"
                      onChange={(e) =>
                        setFormValues((prevValues) => ({
                          ...prevValues,
                          p_status: e.target.value,
                        }))
                      }
                      required
                    >
                      <option value={""}>Select Status</option>
                      <option value="0">Rent</option>
                      <option value="1">Sell</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Please Select Status
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <div className="addProductButton2">
                  <button className="addButton">Add Product</button>
                  <button
                    className="cancelButton"
                    type="button"
                    onClick={handleReset}
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </>
    </Fragment>
  );
};

export default AddProduct;
