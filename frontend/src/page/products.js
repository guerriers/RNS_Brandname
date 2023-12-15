import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Checkbox, Slider } from "antd";
import "../css/products.css";

const allCategories = [
  "Accessories",
  "Bag",
  "Clothes",
  "Eyewear",
  "Headwear",
  "Shoes/Sneakers",
  "Others",
];
const brands = [
  "Adidas",
  "Burberry",
  "Balenciaga",
  "Coach",
  "Cartier",
  "Channel",
  "Converse",
  "Calvin Klein",
  "Christian Louboutin",
  "Dior",
  "Fendi",
  "Gucci",
  "Guess",
  "H&M",
  "Hermes",
  "LVMH",
  "Lacoste",
  "Louis Vuitton",
  "Nike",
  "New Balance",
  "Puma",
  "Prada",
  "Patek Philippe",
  "Rolex",
  "Ray Ban",
  "Sephora",
  "Supreme",
  "Swarovski",
  "Tom Ford",
  "Tiffany&Co",
  "Tommy Hilfiger",
  "YSL",
  "Vans",
  "Versace",
  "Valentino",
  "Victoria's Secret",
  "Zara",
  "Others",
];

const CheckboxGroup = Checkbox.Group;
const Product = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({
    name: "",
    category: [],
    p_status: [],
    price: [0, 300000],
    condition: [0, 100],
    brand: [],
  });
  const [selected, setSelected] = useState([]);
  const [checkedCategory, setCheckedCategory] = useState([]);
  const [checkedBrand, setCheckedBrand] = useState([]);
  const checkCategory = allCategories.length === checkedCategory.length;
  const checkBrand = brands.length === checkedBrand.length;
  const indeterminate =
    checkedCategory.length > 0 && checkedCategory.length < allCategories.length;
  const indeterminateBrand =
    checkedBrand.length > 0 && checkedBrand.length < brands.length;
  const onChangeCheckbox = (type, list) => {
    if (type == "category") {
      setCheckedCategory(list);
      setFilter({
        ...filter,
        category: list,
      });
    }
    if (type == "brand") {
      setCheckedBrand(list);
      setFilter({
        ...filter,
        brand: list,
      });
    }

    if (type == "p_status") {
      setFilter({
        ...filter,
        p_status: list,
      });
    }
  };
  const onCheckAllChange = (type, e) => {
    if (e.target.checked) {
      if (type === "category") {
        setCheckedCategory(allCategories);
        onChangeCheckbox("category", allCategories);
      } else if (type === "brand") {
        setCheckedBrand(brands);
        onChangeCheckbox("brand", brands);
      }
    } else {
      if (type === "category") {
        setCheckedCategory([]);
        onChangeCheckbox("category", []);
      } else if (type === "brand") {
        setCheckedBrand([]);
        onChangeCheckbox("brand", []);
      }
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/products`, { params: filter })
      .then((response) => {
        setProducts(response.data);
        console.log("Received product data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, [filter]);
  useEffect(() => {
    const filtered = products.filter((product) => product.p_status !== "2");
    setFilteredProducts(filtered);
  }, [products]);

  const onChangeText = (e) => {
    setFilter({ ...filter, name: e.target.value });
  };

  const onChangeSlider = (type, values) => {
    setFilter({ ...filter, [type]: values });
  };

  const Price = {
    0: {
      style: {
        left: "5%",
      },
      label: "0",
    },
    300000: {
      style: {
        left: "90%",
      },
      label: "300,000",
    },
  };
  const Condition = {
    0: {
      style: {
        left: "5%",
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

  const divideCategories = (categories) => {
    const midIndex = Math.ceil(categories.length / 2);
    const firstColumn = categories.slice(0, midIndex);
    const secondColumn = categories.slice(midIndex);
    return [firstColumn, secondColumn];
  };
  const [categoriesColumn1, categoriesColumn2] =
    divideCategories(allCategories);

  const divideBrand = (brand) => {
    const midIndex = Math.ceil(brand.length / 2);
    const firstColumn = brand.slice(0, midIndex);
    const secondColumn = brand.slice(midIndex);
    return [firstColumn, secondColumn];
  };
  const [brandColumn1, brandColumn2] = divideBrand(brands);

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
            <Checkbox.Group
              style={{ width: "100%" }}
              onChange={(values) => onChangeCheckbox("p_status", values)}
            >
              <Col cols={6} className="mt-3">
                <Checkbox value="0">For Rent</Checkbox>
              </Col>
              <Col cols={6} className="mt-3 ">
                <Checkbox className="ms-2" value="1">
                  For Sell
                </Checkbox>
              </Col>
            </Checkbox.Group>
          </Col>

          <Col className="mt-4">
            <h5 className="border-text-filter">Category</h5>
            <Row>
              <Col lg={6} sm={6} xs={12} className="mt-3">
                <Checkbox
                  indeterminate={indeterminate}
                  onChange={(values) => {
                    onCheckAllChange("category", values);
                  }}
                  checked={checkCategory}
                >
                  All
                </Checkbox>
              </Col>

              <Col lg={6} sm={6} xs={12} className="mt-3">
                {checkedCategory.map((category) => (
                  <div key={category}>{category}</div>
                ))}
              </Col>

              <Col lg={6} sm={6} xs={12} className="mt-3">
                {categoriesColumn1.map((category) => (
                  <div key={category}>
                    <Checkbox
                      checked={checkedCategory.includes(category)}
                      onChange={(e) => {
                        const newCheckedCategory = [...checkedCategory];
                        if (e.target.checked) {
                          newCheckedCategory.push(category);
                        } else {
                          const index = newCheckedCategory.indexOf(category);
                          if (index !== -1) {
                            newCheckedCategory.splice(index, 1);
                          }
                        }
                        setCheckedCategory(newCheckedCategory);
                        onChangeCheckbox("category", newCheckedCategory);
                      }}
                    >
                      {category}
                    </Checkbox>
                  </div>
                ))}
              </Col>
              <Col lg={6} sm={6} xs={12} className="mt-3">
                {categoriesColumn2.map((category) => (
                  <div key={category}>
                    <Checkbox
                      checked={checkedCategory.includes(category)}
                      onChange={(e) => {
                        const newCheckedCategory = [...checkedCategory];
                        if (e.target.checked) {
                          newCheckedCategory.push(category);
                        } else {
                          const index = newCheckedCategory.indexOf(category);
                          if (index !== -1) {
                            newCheckedCategory.splice(index, 1);
                          }
                        }
                        setCheckedCategory(newCheckedCategory);
                        onChangeCheckbox("category", newCheckedCategory);
                      }}
                    >
                      {category}
                    </Checkbox>
                  </div>
                ))}
              </Col>
            </Row>
          </Col>

          <Col className="mt-5">
            <h5>Price</h5>
            <Slider
              min={0}
              max={300000}
              range={{ draggableTrack: true }}
              defaultValue={[0, 300000]}
              marks={Price}
              tooltip={{
                formatter: (value) => {
                  return `${value.toLocaleString()} บาท`;
                },
              }}
              onChange={(values) => onChangeSlider("price", values)}
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
              onChange={(values) => onChangeSlider("condition", values)}
            />
          </Col>
          <Col className="mt-5">
            <h5 className="border-text-filter">Brand</h5>
            <Row>
              <Col lg={6} sm={6} xs={12} className="mt-3">
                <Checkbox
                  indeterminate={indeterminateBrand}
                  onChange={(values) => {
                    onCheckAllChange("brand", values);
                  }}
                  checked={checkBrand}
                >
                  All
                </Checkbox>
              </Col>
              <Col lg={6} sm={6} xs={12} className="mt-3">
                {checkedBrand.map((brand) => (
                  <div key={brand}>{brand}</div>
                ))}
              </Col>

              <Col lg={6} sm={6} xs={12} className="mt-3">
                {brandColumn1.map((brand) => (
                  <div key={brand}>
                    <Checkbox
                      checked={checkedBrand.includes(brand)}
                      onChange={(e) => {
                        const newCheckedBrand = [...checkedBrand];
                        if (e.target.checked) {
                          newCheckedBrand.push(brand);
                        } else {
                          const index = newCheckedBrand.indexOf(brand);
                          if (index !== -1) {
                            newCheckedBrand.splice(index, 1);
                          }
                        }
                        setCheckedBrand(newCheckedBrand);
                        onChangeCheckbox("brand", newCheckedBrand);
                      }}
                    >
                      {brand}
                    </Checkbox>
                  </div>
                ))}
              </Col>
              <Col lg={6} sm={6} xs={12} className="mt-3">
                {brandColumn2.map((brand) => (
                  <div key={brand}>
                    <Checkbox
                      checked={checkedBrand.includes(brand)}
                      onChange={(e) => {
                        const newCheckedBrand = [...checkedBrand];
                        if (e.target.checked) {
                          newCheckedBrand.push(brand);
                        } else {
                          const index = newCheckedBrand.indexOf(brand);
                          if (index !== -1) {
                            newCheckedBrand.splice(index, 1);
                          }
                        }
                        setCheckedBrand(newCheckedBrand);
                        onChangeCheckbox("brand", newCheckedBrand);
                      }}
                    >
                      {brand}
                    </Checkbox>
                  </div>
                ))}
              </Col>
            </Row>
          </Col>
        </Col>

        <Col md={8} lg={9} xl={9}>
          <p className="product-h">Products</p>
          {filteredProducts.length === 0 ? (
            <p>There are no products that match the selected filters.</p>
          ) : (
            <Row>
              {filteredProducts.map((product) => (
                <Col md={6} lg={4} xl={4} className="mt-4">
                  <Link to={`/product/${product.id}`} key={product.id}>
                    <div className="product-box">
                      {product.p_img && product.p_img.length > 0 ? (
                        <img src={product.p_img[0].url} alt={product.p_name} />
                      ) : (
                        <p>No image available</p>
                      )}
                      <div
                        className={`product-status ${
                          product.p_status === "0"
                            ? "for-rent"
                            : product.p_status === "1"
                            ? "for-sell"
                            : "sold-out"
                        }`}
                      >
                        {product.p_status === "0"
                          ? "For Rent"
                          : product.p_status === "1"
                          ? "For Sell"
                          : "Sold Out"}
                      </div>
                      <div className="product-price">{`${product.p_price.toLocaleString()} THB`}</div>
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Product;
