/* eslint-disable */
import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/home.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Col from "react-bootstrap/Col";

function HomePage() {
  const navigate = useNavigate();

  const [activeSlide, setActiveSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/products`)
      .then((response) => {
        // Sort the products based on the createdAt timestamp in descending order
        const sortedProducts = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setProducts(sortedProducts);
        console.log("Received product data :", sortedProducts);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);

  function handleCategoryClick(category) {
    navigate(`/products`, { state: { categoryId: category } });
  }

  function handleBrandClick(brand) {
    navigate(`/products`, { state: { brandId: brand } });
  }

  function handleDotClick(slideIndex) {
    const sliderWrapper = document.querySelector(".slider-wrapper");
    const imageElement = document.getElementById(`slide-${slideIndex + 1}`);

    if (imageElement) {
      const slidePosition = imageElement.offsetLeft - sliderWrapper.offsetLeft;
      sliderWrapper.scrollTo({
        left: slidePosition,
        behavior: "smooth",
      });

      document.querySelectorAll(".slider-wrapper img").forEach((img, index) => {
        if (index === slideIndex) {
          img.classList.add("active");
        } else {
          img.classList.remove("active");
        }
      });

      setActiveSlide(slideIndex);
    }

    console.log(`Clicked on ${slideIndex + 1}`);
  }

  const autoSlideSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };

  const redirectToURL = (targetURL) => {
    window.location.href = targetURL;
  };

  const categories = [
    {
      img: `assets/categories/clothes.jpeg`,
      text: `Clothes`,
      targetURL: ``,
    },
    {
      img: `assets/categories/accessories.jpeg`,
      text: `Accessories`,
      targetURL: ``,
    },
    {
      img: `assets/categories/headwear.jpeg`,
      text: `Headwear`,
      targetURL: ``,
    },
    {
      img: `assets/categories/eyewear.jpg`,
      text: `Eyewear`,
      targetURL: ``,
    },
    {
      img: `assets/categories/bag.jpeg`,
      text: `Bag`,
      targetURL: ``,
    },
    {
      img: `assets/categories/shoe.jpeg`,
      text: `Shoe/Sneakers`,
      targetURL: ``,
    },
  ];
  const brandname = [
    {
      img: `assets/brands/Nike.png`,
      text: `Nike`,
      targetURL: ``,
    },
    {
      img: `assets/brands/vans.png`,
      text: `Vans`,
      targetURL: ``,
    },
    {
      img: `assets/brands/channel.png`,
      text: `Channel`,
      targetURL: ``,
    },
    {
      img: `assets/brands/gucci.png`,
      text: `Gucci`,
      targetURL: ``,
    },
    {
      img: `assets/brands/tiffany-co.jpeg`,
      text: `Tiffany & CO.`,
      targetURL: ``,
    },
    {
      img: `assets/brands/Adidas.jpeg`,
      text: `Adidas`,
      targetURL: ``,
    },
    {
      img: `assets/brands/Sephora.png`,
      text: `Sephora`,
      targetURL: ``,
    },
    {
      img: `assets/brands/puma.png`,
      text: `Puma`,
      targetURL: ``,
    },
    {
      img: `assets/brands/versace.png`,
      text: `Versace`,
      targetURL: ``,
    },
    {
      img: `assets/brands/lvmh.png`,
      text: `LVMH`,
      targetURL: ``,
    },
    {
      img: `assets/brands/tommyhilfiger.png`,
      text: `Tommy Hilfiger`,
      targetURL: ``,
    },
    {
      img: `assets/brands/guess.png`,
      text: `Guess`,
      targetURL: ``,
    },
    {
      img: `assets/brands/ck.png`,
      text: `Calvin Klein`,
      targetURL: ``,
    },
    {
      img: `assets/brands/coach.png`,
      text: `Coach`,
      targetURL: ``,
    },
    {
      img: `assets/brands/prada.png`,
      text: `Prada`,
      targetURL: ``,
    },
    {
      img: `assets/brands/lacoste.jpeg`,
      text: `Lacoste`,
      targetURL: ``,
    },
    {
      img: `assets/brands/Converse.png`,
      text: `Converse`,
      targetURL: ``,
    },
    {
      img: `assets/brands/cartier.jpeg`,
      text: `Cartier`,
      targetURL: ``,
    },
    {
      img: `assets/brands/lv.png`,
      text: `Louis Vuitton`,
      targetURL: ``,
    },
    {
      img: `assets/brands/rolex.jpeg`,
      text: `Rolex`,
      targetURL: ``,
    },
    {
      img: `assets/brands/zara.png`,
      text: `Zara`,
      targetURL: ``,
    },
    {
      img: `assets/brands/hm.jpeg`,
      text: `H&M`,
      targetURL: ``,
    },
    {
      img: `assets/brands/hermes.png`,
      text: `Hermes`,
      targetURL: ``,
    },
    {
      img: `assets/brands/fendi.png`,
      text: `Fendi`,
      targetURL: ``,
    },
    {
      img: `assets/brands/ysl.jpeg`,
      text: `YSL`,
      targetURL: ``,
    },
    {
      img: `assets/brands/Balenciaga.png`,
      text: `Balenciaga`,
      targetURL: ``,
    },
    {
      img: `assets/brands/supreme.png`,
      text: `Supreme`,
      targetURL: ``,
    },
    {
      img: `assets/brands/valentino.jpg`,
      text: `Valentino`,
      targetURL: ``,
    },
    {
      img: `assets/brands/dior.jpeg`,
      text: `Dior`,
      targetURL: ``,
    },
    {
      img: `assets/brands/patek.jpeg`,
      text: `Patek Philippe`,
      targetURL: ``,
    },
    {
      img: `assets/brands/swarovski.png`,
      text: `Swarovski`,
      targetURL: ``,
    },
    {
      img: `assets/brands/burberry.jpeg`,
      text: `Burberry`,
      targetURL: ``,
    },
    {
      img: `assets/brands/tomford.jpeg`,
      text: `Tom Ford`,
      targetURL: ``,
    },
    {
      img: `assets/brands/vs.png`,
      text: `Victoria's Secret`,
      targetURL: ``,
    },
    {
      img: `assets/brands/nb.png`,
      text: `New Balance`,
      targetURL: ``,
    },
    {
      img: `assets/brands/louboutin.png`,
      text: `Christian Louboutin`,
      targetURL: ``,
    },
    {
      img: `assets/brands/rayban.png`,
      text: `Ray Ban`,
      targetURL: ``,
    },
  ];

  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    const filtered = products.filter((product) => product.p_status !== "2");
    setFilteredProducts(filtered);
  }, [products]);

  return (
    <div className="homepage">
      <header className="banner-slider">
        <div className="slider-wrapper">
          <img
            id="slide-1"
            src="../assets/banners/banner2.png"
            alt="Banner"
            className={activeSlide === 0 ? "active" : "inactive"}
          />
          <img
            id="slide-2"
            src="../assets/banners/banner3.jpg"
            alt="Banner"
            className={activeSlide === 1 ? "active" : "inactive"}
          />
        </div>
        <div className="banner-slider-dots">
          <button onClick={() => handleDotClick(0)}></button>
          <button onClick={() => handleDotClick(1)}></button>
        </div>
      </header>

      <main className="main">
        {/* <section className="info-section">
          <div className="info-lists">
            {info.map((list) => (
              <div key={list.name} className="info-list">
                <img src={list.image} alt={list.name} />
                <h4>{list.name}</h4>
                <p>{list.desc}</p>
              </div>
            ))}
          </div>
        </section> */}
        {/* <hr className="h" /> */}

        <h1 className="decorated-h1">Recently Posted Products</h1>
        <Slider {...autoSlideSettings}>
          {filteredProducts.map((product) => (
            <div className="home-product">
              <Link to={`/product/${product.id}`} key={product.id}>
                {product.p_img && product.p_img.length > 0 ? (
                  <img src={product.p_img[0].url} alt={product.p_name} />
                ) : (
                  <p>No image available</p>
                )}

                <div
                  className={`product-status-home ${
                    product.p_status === "0"
                      ? "for-rent-home"
                      : product.p_status === "1"
                      ? "for-sell-home"
                      : "sold-out-home"
                  }`}
                >
                  {product.p_status === "0"
                    ? "For Rent"
                    : product.p_status === "1"
                    ? "For Sell"
                    : "Sold Out"}
                </div>

                <div className="product-price-home">{`${product.p_price.toLocaleString()} THB`}</div>
              </Link>
            </div>
          ))}
        </Slider>

        <hr className="h" />

        <h1 className="decorated-h1">Explore by Brand</h1>
        <Slider {...autoSlideSettings}>
          {brandname.map((d) => (
            <div className="brand" onClick={() => handleBrandClick(d.text)}>
              <img src={d.img} alt={d.text} />
              <p>{d.text}</p>
            </div>
          ))}
        </Slider>

        <hr className="h" />

        <h1 className="decorated-h1">Explore by Category</h1>
        <Slider {...autoSlideSettings}>
          {categories.map((d) => (
            <div
              className="category"
              onClick={() => handleCategoryClick(d.text)}
            >
              <img src={d.img} alt={d.text} />
              <p>{d.text}</p>
            </div>
          ))}
        </Slider>
      </main>

      <footer className="homefooter">
        <div className="footer-banner">
          <img src="../assets/banners/footerbanner.png" alt="FooterBanner" />
          <h4 className="image-text">
            "We're a centralized platform connecting buyers and sellers of brand
            name products, providing a user-friendly experience."
            <LinkContainer to="/about">
              <button className="image-button">About Us</button>
            </LinkContainer>
          </h4>
        </div>

        <h4 className="footer-text">CONTACT</h4>
        <p>+666531892219</p>
        <p>rnsbrandname@gmail.com</p>

        <div className="footer-icons">
          <a href="https://www.facebook.com/">
            <img src="../assets/logos/facebook.png" alt="Facebook" />
          </a>
          <a href="https://www.instagram.com/">
            <img src="../assets/logos/instagram.png" alt="Instagram" />
          </a>
          <a href="https://www.twitter.com/">
            <img src="../assets/logos/x.png" alt="Twitter" />
          </a>
        </div>

        <img src="../rns_logo.png" alt="Logo" className="navbar-logo" />
        <p>&copy; {new Date().getFullYear()} RNS. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}

export default HomePage;
