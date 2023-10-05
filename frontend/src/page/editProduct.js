import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Row, Col, Image, Container } from "react-bootstrap";
import "../css/addProduct.css";

const EditProduct = ({ history }) => {
  const { id } = useParams(); 
  // const history = useHistory();

  const initialValues = {
    p_name: "",
    p_category: "",
    p_price: "",
    p_condition: "",
    p_brand: "",
    p_description: "",
    p_receipt: "",
    p_status: "",
    p_img:
      "https://lofficielthailand.com/wp-content/uploads/2020/07/Tote-Bag-Brand-Name-Celine-Paris-1-LOfficiel-Thaialnd.jpg",
    user_id: "2",
  };

  const [setIsSubmit] = useState(false);
  const [setValidated] = useState(false);
  const [productEdit, setProductEdit] = useState(initialValues);
  const [setHasLoaded] = useState(false);
  // const [hasLoaded, setHasLoaded] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductEdit({ ...productEdit, [name]: value });
  };

  const handleReset = () => {
    history.push("/myProducts");
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
      await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/products/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productEdit),
        }
      )
        .then((response) => response.json())
        .then((res) => {
          if (res.statusCode === 201) {
            alert("Edit Success");
            setIsSubmit(true);
            history.push("/myProducts");
          }
          if (res.statusCode === 401) {
            alert(res.message);
          }
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/products/${id}`
        );
        const data = await response.json();
        if (data.data) {
          setProductEdit(data.data);
          setHasLoaded(true);
        }
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, [id]);

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
              <Image src="xxx.jpeg" rounded />
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>+</Form.Label>
                <Form.Control type="file" multiple />
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
                  value={productEdit.p_name}
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
                  <option value={productEdit.p_category}>Category</option>
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
                  onChange={handleChange}
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
                  name="p_condition"
                  required
                  value={productEdit.p_condition}
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
                  value={productEdit.p_brand}
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
                value={productEdit.p_description}
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
                  placeholder="(.png, .jpg, .jpeg)"
                  name="p_receipt"
                  value={productEdit.p_receipt}
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
                  name="status"
                  type="radio"
                  onChange={handleChange}
                  checked={productEdit.status === "1"}
                />
                <Form.Check
                  value="0"
                  inline
                  label="For Rent"
                  name="status"
                  type="radio"
                  onChange={handleChange}
                  checked={productEdit.status === "0"}
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
