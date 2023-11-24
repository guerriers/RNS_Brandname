import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Row, Col, Image, Container } from "react-bootstrap";
import "../css/addProduct.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { updateProduct, getProductDetails, clearErrors } from '../actions/productActions'


const EditProduct = ({ history }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const history = useHistory();
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
  const [productsPreview, setProductsPreview] = useState([])
  const [products, setProducts] = useState([]);
  const [oldProducts, setOldProducts] = useState([]);
  const [oldProductsPreview, setOldProductsPreview] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [receiptsPreview, setReceiptsPreview] = useState([])
  const [oldReceipts, setOldReceipts] = useState([]);
  const [oldReceiptsPreview, setOldReceiptsPreview] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [validated, setValidated] = useState(false);
  const [productEdit, setProductEdit] = useState(initialValues);
  const [hasLoaded, setHasLoaded] = useState(false);
  // const [hasLoaded, setHasLoaded] = useState(false);
  const { error, product } = useSelector(state => state.productDetails)

  const handleChange = (e) => {
    const files = Array.from(e.target.files)

    setProductsPreview([]);
    setProducts([])
    setOldProducts([])

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
    setOldReceipts([])

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

  // const handleReset = () => {
  //   history.push("/myProducts");
  // };
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
        products.forEach(product => {
          formData.append('p_img', product)
        })
      }

      if(receipts.length > 0) {
        receipts.forEach(receipt => {
          formData.append('p_receipt', receipt)
        })
      }

      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/products/${id}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        alert("Edit Success");
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
      setProductEdit(prevValues => {
        const { p_img, p_receipt,...productWithoutPImg } = prevValues;
        return productWithoutPImg;
      });
      setOldProducts(product.p_img || []);
      setOldProductsPreview(product.p_img || []);
      setOldReceipts(product.p_receipt || []);
      setOldReceiptsPreview(product.p_receipt || []);
    }
  }, [id, dispatch, hasLoaded, product]);

  return (
    <Container>
      {/* <Fragment>
      {hasLoaded ? (
        <Fragment> */}
      <div>
        <div className="Header">
          <h1>Edit Product</h1>
        </div>
        <Col xs={6} md={4}>
          {oldProducts.map((img, index) => (
            <img key={`${img.url}-${index}`} src={img.url} alt={img.url} className="mt-3 mr-2" width="55" height="52" />
          ))}

          {productsPreview.map(img => (
            <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
          ))}
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>+</Form.Label>
            <Form.Control
              type="file"
              accept=".png, .jpg, .jpeg"
              name="p_img"
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
              value={productEdit && productEdit.p_name}
              name="p_name"
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

          <Form.Group as={Col} controlId="formGridCategory">
            <Form.Label>
              Category<span style={{ color: "red" }}> *</span>
            </Form.Label>
            <Form.Select name="p_category" onChange={(e) =>
              setProductEdit((prevValues) => ({
                ...prevValues,
                p_category: e.target.value,
              }))

            }
              value={productEdit.p_category} required>
              <option value="">Category</option>
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

          <Form.Group as={Col} controlId="formGridCondition">
            <Form.Label>
              Condition<span style={{ color: "red" }}> *</span>
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Product Condition (%)"
              name="p_conditions"
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
          <Form.Group as={Col} controlId="formGridBrand">
            <Form.Label>
              Brand<span style={{ color: "red" }}> *</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Product Brand"
              name="p_brand"
              required
              value={productEdit.p_brand}
              onChange={(e) =>
                setProductEdit((prevValues) => ({
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


        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridReceipt">
            <Form.Label>Receipt</Form.Label>
            {oldReceipts.map((img, index) => (
            <img key={`${img.url}-${index}`} src={img.url} alt={img.url} className="mt-3 mr-2" width="55" height="52" />
          ))}

          {receiptsPreview.map(img => (
            <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
          ))}
            <Form.Control
              type="file"
              placeholder="(.png, .jpg, .jpeg)"
              name="p_receipt"
              // value={productEdit.p_receipt}
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
              name="status"
              type="radio"
              onChange={(e) =>
                setProductEdit((prevValues) => ({
                  ...prevValues,
                  p_status: e.target.value,
                }))
              }
              checked={productEdit.p_status === "1"}
            />
            <Form.Check
              value="0"
              inline
              label="For Rent"
              name="status"
              type="radio"
              onChange={(e) =>
                setProductEdit((prevValues) => ({
                  ...prevValues,
                  p_status: e.target.value,
                }))
              }
              checked={productEdit.p_status === "0"}
            />
          </Form.Group>
        </Row>
        <Form className="wrapperViewProduct" onSubmit={onSubmit}>
          <div className="warpPerButton">
            <button className="viewDataSubmit">Update Product</button>
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
      {/* </Fragment>
      ) : (
        <Fragment>Loading...</Fragment>
      )}
    </Fragment> */}
    </Container>
  );
};

export default EditProduct;
