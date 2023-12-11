import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/products.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Checkbox, Slider } from "antd";
const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/products`)
      .then((response) => {
        setProducts(response.data);
        console.log("Received product data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);

  const onChangeText = (checkedValues) => {
    const { value } = checkedValues.target;
    console.log("Value-----> : ", value);
  };
  const onChange = (checkedValues) => {
    console.log("checked-----> :", checkedValues);
  };
  const Price = {
    0: {
      style: {
        left: "10%",
      },
      label: "0",
    },
    100000: {
      style: {
        left: "85%",
      },
      label: "100,000",
    },
  };
  const Condition = {
    0: {
      style: {
        left: "10%",
      },
      label: "0%",
    },
    100: {
      style: {
        left: "90%",
      },
      label: "100%",
    },
  };
  return (
    <>
      <Row style={{ height: "100%", textAlign: "start", margin: 0 }}>
        <Col
          md={4}
          lg={3}
          xl={3}
          style={{ background: "#505050", padding: "25px" }}
          className="filter-side"
        >
          <Col>
            <Input
              placeholder="Search products"
              suffix={<SearchOutlined style={{ color: "#E7C264" }} />}
              onChange={onChangeText}
              onPressEnter={onChangeText}
            />
          </Col>
          <Col>
            <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
              <Col cols={6} className="mt-3">
                <Checkbox value="A">For Rent</Checkbox>
              </Col>
              <Col cols={6} className="mt-3 ">
                <Checkbox className="ms-2" value="B">
                  For Sell
                </Checkbox>
              </Col>
            </Checkbox.Group>
          </Col>
          <Col className="mt-4">
            <h5 className="border-text-filter">Category</h5>
            <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
              <Row>
                <Col lg={6} sm={6} xs={12} className="mt-3">
                  <Checkbox value="A">All</Checkbox>
                </Col>
                <Col lg={6} sm={6} xs={12} className="mt-3">
                  <Checkbox value="B">Clotges</Checkbox>
                </Col>
                <Col lg={6} sm={6} xs={12} className="mt-3">
                  <Checkbox value="C">Accessories</Checkbox>
                </Col>
                <Col lg={6} sm={6} xs={12} className="mt-3">
                  <Checkbox value="D">Shoes/Sneakers</Checkbox>
                </Col>
                <Col lg={6} sm={6} xs={12} className="mt-3">
                  <Checkbox value="E">Headwear</Checkbox>
                </Col>
                <Col lg={6} sm={6} xs={12} className="mt-3">
                  <Checkbox value="F">Eyewear</Checkbox>
                </Col>
                <Col lg={6} sm={6} xs={12} className="mt-3">
                  <Checkbox value="G">Bag</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Col>
          <Col className="mt-5">
            <h5>Price</h5>
            <Slider
              min={0}
              max={100000}
              range={{ draggableTrack: true }}
              defaultValue={[0, 100000]}
              marks={Price}
              tooltip={{
                formatter: (value) => {
                  return `${value.toLocaleString()} บาท`;
                },
              }}
              onChange={onChange}
            />
          </Col>
          <Col className="mt-5">
            <h5>Condition</h5>
            <Slider
              min={0}
              max={100}
              range={{ draggableTrack: true }}
              defaultValue={[0, 100]}
              marks={Condition}
              tooltip={{
                formatter: (value) => {
                  return `${value}%`;
                },
              }}
              onChange={onChange}
            />
          </Col>
          <Col className="mt-5">
            <h5 className="border-text-filter">Brand</h5>
            <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
              <Row>
                <Col lg={6} sm={6} xs={12} className="mt-3">
                  <Checkbox value="A">All</Checkbox>
                </Col>
                <Col lg={6} sm={6} xs={12} className="mt-3">
                  <Checkbox value="B">Balenciaga</Checkbox>
                </Col>
                <Col lg={6} sm={6} xs={12} className="mt-3">
                  <Checkbox value="C">Channel</Checkbox>
                </Col>
                <Col lg={6} sm={6} xs={12} className="mt-3">
                  <Checkbox value="D">Fendi</Checkbox>
                </Col>
                <Col lg={6} sm={6} xs={12} className="mt-3">
                  <Checkbox value="E">Prada</Checkbox>
                </Col>
                <Col lg={6} sm={6} xs={12} className="mt-3">
                  <Checkbox value="F">Dior</Checkbox>
                </Col>
                <Col lg={6} sm={6} xs={12} className="mt-3">
                  <Checkbox value="G">YSL</Checkbox>
                </Col>
                <Col lg={6} sm={6} xs={12} className="mt-3">
                  <Checkbox value="H">Hermes</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Col>
        </Col>

        <Col md={8} lg={9} xl={9}>
          <p className="product-h">Products</p>
          <Row>
            {products.map((product) => (
              <Col md={6} lg={4} xl={4} className="mt-4">
                <Link to={`/productDetail/${product.id}`} key={product.id}>
                  <div className="product-box">
                    {product.p_img && product.p_img.length > 0 ? (
                      <img src={product.p_img[0].url} alt={product.p_name} />
                    ) : (
                      <p>No image available</p>
                    )}
                    <div
                      className={`product-status ${
                        product.p_status === "0" ? "for-rent" : "for-sell"
                      }`}
                    >
                      {product.p_status === "0" ? "For Rent" : "For Sell"}
                    </div>
                    <div className="product-price">{`${product.p_price.toLocaleString()} THB`}</div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Product;
