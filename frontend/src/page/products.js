import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Row, Col, OverlayTrigger, Popover } from "react-bootstrap";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Checkbox, Slider } from "antd";
import { useSelector } from "react-redux";
import { FaRegHeart, FaHeart } from "react-icons/fa";
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
  const { state } = useLocation();
  console.log("STATE", state);
  const [favorites, setFavorites] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [userData, setUserData] = useState({});
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
  useEffect(() => {
    // if(state.categoryId){
    //   setFilter({category:state.categoryId})
    // }else if(state.brandId){
    //   setFilter({brand:state.brandId})
    // }
  }, [setFilter]);

  const onChangeCheckbox = (type, list) => {
    if (type == "category") {
      setCheckedCategory(list);
      setFilter((prevFilter) => ({
        ...prevFilter,
        category: list,
      }));
    }
    if (type == "brand") {
      setCheckedBrand(list);
      setFilter((prevFilter) => ({
        ...prevFilter,
        brand: list,
      }));
    }

    if (type == "p_status") {
      setFilter((prevFilter) => ({
        ...prevFilter,
        p_status: list,
      }));
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
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const productResponse = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/products`,
          {
            params: filter,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProducts(productResponse.data);

        // Update the product count after fetching new data
        const filteredCount = productResponse.data.filter(
          (product) => product.p_status !== "2"
        ).length;
        setProductCount(filteredCount);

        if (productResponse.data.length > 0) {
          const userResponse = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/users/${productResponse.data[0].user_id}`
          );
          setUserData(userResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [filter]);

  useEffect(() => {
    const filtered = products.filter((product) => product.p_status !== "2");
    setFilteredProducts(filtered);
  }, [products]);

  const handleFavoriteClick = async (productId, action) => {
    try {
      const token = localStorage.getItem("token");

      if (!user.id) {
        console.error("User ID not found in localStorage");
        return;
      }
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/users/${user.id}/addFavorites`,
        { productId, action },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Favorites updated successfully");
        fetchFavorites();
      } else {
        console.error("Failed to update favorites. Please try again.");
      }
    } catch (error) {
      console.error("Error updating user favorites:", error);
    }
  };

  const fetchFavorites = async (token) => {
    try {
      if (!user.id) {
        console.error("User ID not found in localStorage");
        return;
      }

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/users/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setFavorites(response.data.favor || []);
      } else {
        console.error("Failed to fetch favorites. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching user favorites:", error);
    }
  };

  const onChangeText = (e) => {
    setFilter({ ...filter, name: e.target.value });
  };

  function handleSelect(value, name) {
    if (value) {
      setSelected([...selected, name]);
    } else {
      setSelected(selected.filter((item) => item !== name));
    }
  }

  function selectAll(value) {
    if (value) {
      // if true
      setSelected(allCategories); // select all
    } else {
      // if false
      setSelected([]); // unselect all
    }
  }

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

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const [popoverShow, setPopoverShow] = useState(false);

  const popover = (product) => (
    <Popover className="pop-over" id={`popover-${product.id}`}>
      <Popover.Header as="h3" className="popover-header">
        Product Details
      </Popover.Header>
      <Popover.Body className="popover-body">
        <p>{product.p_name}</p>
        <hr className="hr-line" />
        <p className="posted-by">
          Posted by: K.{userData.f_name} {userData.l_name}
        </p>
        <hr className="hr-line" />
        <a className="more-detail"> Click to see more details... </a>
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <Row
        style={{ height: "100%", textAlign: "start", margin: 0 }}
        className="s-container"
      >
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

        <Col>
          <p className="product-h">Products</p>
          {filteredProducts.length === 0 ? (
            <p>There are no products that match the selected filter.</p>
          ) : (
            <>
              <p>{`We have ${productCount} ${
                productCount === 1 ? "product" : "products"
              } matched the selected filter.`}</p>
              <Row>
                {filteredProducts.map((product) => (
                  <Col md={6} lg={4} xl={4} key={product.id}>
                    <OverlayTrigger
                      trigger="hover"
                      placement="top"
                      overlay={popover(product)}
                      onMouseOver={() => setPopoverShow(true)}
                      onMouseOut={() => setPopoverShow(false)}
                    >
                      <div
                        className="product-box"
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                      >
                        <Link to={`/product/${product.id}`}>
                          <div className="product-box1">
                            {product.p_img && product.p_img.length > 0 ? (
                              <img
                                src={product.p_img[0].url}
                                alt={product.p_name}
                              />
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
                          </div>
                        </Link>
                        <div className="product-price">{`${product.p_price.toLocaleString()} THB`}</div>
                        <div className="product-favorite">
                          <button
                            className="favButton"
                            variant="gray"
                            onClick={() =>
                              handleFavoriteClick(product.id, "add")
                            }
                          >
                            {favorites.some(
                              (item) => item.productId === product.id
                            ) ? (
                              <FaHeart style={{ color: "#ff0000" }} />
                            ) : (
                              <FaRegHeart style={{ color: "#000000" }} />
                            )}
                          </button>
                        </div>
                      </div>
                    </OverlayTrigger>
                  </Col>
                ))}
              </Row>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Product;
