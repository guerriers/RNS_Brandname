import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import "../css/addProduct.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../actions/productActions";

const EditProduct = ({ history }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    p_name: "",
    p_category: "",
    p_price: "",
    p_conditions: "",
    p_brand: "",
    p_description: "",
    p_receipt: [],
    p_status: "",
    p_img: [],
  };
  const [productsPreview, setProductsPreview] = useState([]);
  const [products, setProducts] = useState([]);
  const [oldProducts, setOldProducts] = useState([]);
  const [oldProductsPreview, setOldProductsPreview] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [receiptsPreview, setReceiptsPreview] = useState([]);
  const [oldReceipts, setOldReceipts] = useState([]);
  const [oldReceiptsPreview, setOldReceiptsPreview] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [validated, setValidated] = useState(false);
  const [productEdit, setProductEdit] = useState(initialValues);
  const [hasLoaded, setHasLoaded] = useState(false);
  // const [hasLoaded, setHasLoaded] = useState(false);
  const { error, product } = useSelector((state) => state.productDetails);

  const handleChange = (e) => {
    const files = Array.from(e.target.files);

    setProductsPreview([]);
    setProducts([]);
    setOldProducts([]);

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
    setOldReceipts([]);

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

  const handleReset = () => {
    setIsSubmit(false);
    navigate("/myProducts");
  };
  const onSubmit = async (productData) => {
    const form = productData.currentTarget;
    productData.preventDefault();
    productData.stopPropagation();
    if (form.checkValidity() === false) {
      productData.preventDefault();
      productData.stopPropagation();
    }
    setValidated(true);

    if (form.checkValidity()) {
      const formData = new FormData();
      Object.entries(productEdit).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (products.length > 0) {
        products.forEach((product) => {
          formData.append("p_img", product);
        });
      }

      if (receipts.length > 0) {
        receipts.forEach((receipt) => {
          formData.append("p_receipt", receipt);
        });
      }

      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/products/${id}`,
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
        setIsSubmit(true);
        navigate("/myProducts");
      }
      if (response.status === 401) {
        alert(response.message);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getProductDetails(id));
        setHasLoaded(true);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (!hasLoaded) {
      fetchData();
    } else {
      setProductEdit(product);
      setProductEdit((prevValues) => {
        const { p_img, p_receipt, ...productWithoutPImg } = prevValues;
        return productWithoutPImg;
      });
      setOldProducts(product.p_img || []);
      setOldProductsPreview(product.p_img || []);
      setOldReceipts(product.p_receipt || []);
      setOldReceiptsPreview(product.p_receipt || []);
    }
  }, [id, dispatch, hasLoaded, product]);

  return (
    <Fragment>
      <>
        <p className="addProduct-h">Edit Product</p>
        <Row>
          <Col md={5}>
            <Form>
              <Form.Group as={Col} controlId="formFileMultiple">
                <Form.Label>
                  <div className="addProductGrid">
                    <div className="addProductBox">
                      {oldProducts.map((img, index) => (
                        <img
                          key={`${img.url}-${index}`}
                          src={img.url}
                          alt={img.url}
                          className="mt-3 mr-2"
                          width="55"
                          height="52"
                        />
                      ))}

                      {productsPreview.map((img) => (
                        <img
                          src={img}
                          key={img}
                          alt="Images Preview"
                          className="mt-3 mr-2"
                          width="55"
                          height="52"
                        />
                      ))}
                      <div className="addProductActions">
                        <span className="plus-sign">+</span>
                      </div>
                    </div>
                  </div>
                </Form.Label>
                <Form.Control
                  type="file"
                  name="img"
                  accept="image/*"
                  onChange={handleChange}
                  style={{ display: "none" }}
                  multiple
                />
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <div className="addProductContainer">
              {/* {showSuccessMessage && (
              <div className="success-message">Product added successfully!</div>
            )} */}
              <Form className="wrapperViewProduct" onSubmit={onSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} md={4} controlId="formGridName">
                    <Form.Label>
                      Product Name<span style={{ color: "red" }}> *</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Product name"
                      value={productEdit && productEdit.p_name}
                      required
                      onChange={(e) =>
                        setProductEdit((prevValues) => ({
                          ...prevValues,
                          p_name: e.target.value,
                        }))
                      }
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
                        setProductEdit((prevValues) => ({
                          ...prevValues,
                          p_category: e.target.value,
                        }))
                      }
                      value={productEdit.p_category}
                      required
                    >
                      <option value="">Select Category</option>
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
                  <Form.Group as={Col} md={1}></Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md={2} controlId="formGridPrice">
                    <Form.Label>
                      Price | THB<span style={{ color: "red" }}> *</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Product Price"
                      name="price"
                      required
                      value={productEdit.p_price}
                      onChange={(e) =>
                        setProductEdit((prevValues) => ({
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
                      Conditions %<span style={{ color: "red" }}> *</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Product Condition (%)"
                      name="conditions"
                      required
                      value={productEdit.p_conditions}
                      onChange={(e) =>
                        setProductEdit((prevValues) => ({
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
                      value={productEdit.p_brand}
                      onChange={(e) =>
                        setProductEdit((prevValues) => ({
                          ...prevValues,
                          p_brand: e.target.value,
                        }))
                      }
                      required
                    >
                      <option value={""}>Select Brand</option>
                      <option value={"Nike"}>Nike</option>
                      <option value={"Vans"}>Vans</option>
                      <option value={"Channel"}>Channel</option>
                      <option value={"Gucci"}>Gucci</option>
                      <option value={"Tiffany&Co"}>Tiffany&Co.</option>
                      <option value={"Adidas"}>Adidas</option>
                      <option value={"Sephora"}>Sephora</option>
                      <option value={"Puma"}>Puma</option>
                      <option value={"Versace"}>Versace</option>
                      <option value={"LVMH"}>LVMH</option>
                      <option value={"TommyHilfiger"}>Tommy Hilfiger</option>
                      <option value={"Guess"}>Guess</option>
                      <option value={"CalvinKlein"}>Calvin Klein</option>
                      <option value={"Coach"}>Coach</option>
                      <option value={"Prada"}>Prada</option>
                      <option value={"Lacoste"}>Lacoste</option>
                      <option value={"Converse"}>Converse</option>
                      <option value={"Cartier"}>Cartier</option>
                      <option value={"LouisVuitton"}>Louis Vuitton</option>
                      <option value={"Rolex"}>Rolex</option>
                      <option value={"Zara"}>Zara</option>
                      <option value={"H&M"}>H&M</option>
                      <option value={"Hermes"}>Hermes</option>
                      <option value={"Fendi"}>Fendi</option>
                      <option value={"YSL"}>YSL</option>
                      <option value={"Balenciaga"}>Balenciaga</option>
                      <option value={"Supreme"}>Supreme</option>
                      <option value={"Valentino"}>Valentino</option>
                      <option value={"Dior"}>Dior</option>
                      <option value={"PatekPhilippe"}>Patek Philippe</option>
                      <option value={"Swarovski"}>Swarovski</option>
                      <option value={"Burberry"}>Burberry</option>
                      <option value={"TomFord"}>Tom Ford</option>
                      <option value={"VictoriaSecret"}>
                        Victoria's Secret
                      </option>
                      <option value={"NewBalance"}>New Balance</option>
                      <option value={"ChristianLouboutin"}>
                        Christian Louboutin
                      </option>
                      <option value={"RayBan"}>Ray Ban</option>
                      <option value={"other"}>Other</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Please Select Brand
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
                      value={productEdit.p_description}
                      onChange={(e) =>
                        setProductEdit((prevValues) => ({
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

                {oldReceipts.map((img, index) => (
                  <img
                    key={`${img.url}-${index}`}
                    src={img.url}
                    alt={img.url}
                    className="mt-3 mr-2"
                    width="55"
                    height="52"
                  />
                ))}
                {receiptsPreview.map((img) => (
                  <img
                    src={img}
                    key={img}
                    alt="Images Preview"
                    className="mt-3 mr-2"
                    width="55"
                    height="52"
                  />
                ))}
                <Row className="mb-3">
                  <Form.Group as={Col} md={2} controlId="formGridReceipt">
                    <Form.Label>
                      Receipt
                      <p className="receiptAddFile">Add File</p>
                    </Form.Label>

                    <Form.Control
                      name="receipt"
                      type="file"
                      accept="image/*"
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
                        setProductEdit((prevValues) => ({
                          ...prevValues,
                          p_status: e.target.value,
                        }))
                      }
                      value={productEdit.p_status}
                      required
                    >
                      <option value="">Select Status</option>
                      <option value="0">For Rent</option>
                      <option value="1">For Sell</option>
                      <option value="2">Sold Out</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Please Select Category
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <div className="addProductButton2">
                  <button className="addButton">Update Product</button>
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

export default EditProduct;
