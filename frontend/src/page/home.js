import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/home.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Col from "react-bootstrap/Col";

function HomePage() {
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
    // Handle category click, e.g., navigate to a specific category page
    console.log(`Clicked on ${category}`);
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

  const [info, setinfo] = useState([
    {
      name: "เว็บไซต์ตัวกลาง",
      image: "../assets/cart_icon.png",
      desc: "เว็บไซต์ของเราเป็นแค่เว็บไซต์ตัวกลางที่ช่วยให้พ่อค้า-แม่ค้าทุกคนสามารถมาลงขายสินค้าได้ โดยเราจะไม่มีส่วนได้ส่วนเสีย และจะไม่รับผิดชอบใดๆ",
    },
    {
      name: "มีบริการเช่าสินค้า",
      image: "../assets/cart_icon.png",
      desc: "นอกจากซื้อและขายสินค้ามือสองแล้วยังสามารถเช่าสินค้าแบรนด์เนมได้ด้วย สำหรับคนที่ต้องการเช่ามาใช้ชั่วคราว",
    },
    {
      name: "สินค้าหลากหลายแบรนด์",
      image: "../assets/cart_icon.png",
      desc: "เรามีสินค้าหลากหลายแบรนด์ ไม่ว่าจะเป็น Gucci Dior Cartier และแบรนด์ดังอื่นๆ",
    },
  ]);

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
  };
  const redirectToURL = (targetURL) => {
    window.location.href = targetURL;
  };

  const categories = [
    {
      img: `../assets/clothes.jpeg`,
      text: `Clothes`,
      targetURL: ``,
    },
    {
      img: `../assets/accessories.jpeg`,
      text: `Accessories`,
      targetURL: ``,
    },
    {
      img: `../assets/headwear.jpeg`,
      text: `Headwear`,
      targetURL: ``,
    },
    {
      img: `../assets/eyewear.jpg`,
      text: `Eyewear`,
      targetURL: ``,
    },
    {
      img: `../assets/bag.jpeg`,
      text: `Bag`,
      targetURL: ``,
    },
    {
      img: `../assets/shoe.jpeg`,
      text: `Shoe/Sneakers`,
      targetURL: ``,
    },
  ];
  const brandname = [
    {
      img: `../assets/Nike.jpeg`,
      text: `Nike`,
      targetURL: ``,
    },
    {
      img: `../assets/vans.jpeg`,
      text: `Vans`,
      targetURL: ``,
    },
    {
      img: `../assets/channel.jpeg`,
      text: `Channel`,
      targetURL: ``,
    },
    {
      img: `../assets/gucci.png`,
      text: `Gucci`,
      targetURL: ``,
    },
    {
      img: `../assets/tiffany-co.jpeg`,
      text: `Tiffany & CO.`,
      targetURL: ``,
    },
    {
      img: `../assets/Adidas.jpeg`,
      text: `Adidas`,
      targetURL: ``,
    },
    {
      img: `../assets/Sephora.jpeg`,
      text: `Sephora`,
      targetURL: ``,
    },
    {
      img: `../assets/puma.png`,
      text: `Puma`,
      targetURL: ``,
    },
    {
      img: `../assets/versace.jpeg`,
      text: `Versace`,
      targetURL: ``,
    },
    {
      img: `../assets/lvmh.png`,
      text: `LVMH`,
      targetURL: ``,
    },
    {
      img: `../assets/tommyhilfiger.png`,
      text: `Tommy Hilfiger`,
      targetURL: ``,
    },
    {
      img: `../assets/guess.png`,
      text: `Guess`,
      targetURL: ``,
    },
    {
      img: `../assets/ck.png`,
      text: `Calvin Klein`,
      targetURL: ``,
    },
    {
      img: `../assets/coach.png`,
      text: `Coach`,
      targetURL: ``,
    },
    {
      img: `../assets/prada.png`,
      text: `Prada`,
      targetURL: ``,
    },
    {
      img: `../assets/lacoste.jpeg`,
      text: `Lacoste`,
      targetURL: ``,
    },
    {
      img: `../assets/Converse.png`,
      text: `Converse`,
      targetURL: ``,
    },
    {
      img: `../assets/cartier.jpeg`,
      text: `Cartier`,
      targetURL: ``,
    },
    {
      img: `../assets/lv.png`,
      text: `Louis Vuitton`,
      targetURL: ``,
    },
    {
      img: `../assets/rolex.jpeg`,
      text: `Rolex`,
      targetURL: ``,
    },
    {
      img: `../assets/zara.png`,
      text: `Zara`,
      targetURL: ``,
    },
    {
      img: `../assets/hm.jpeg`,
      text: `H&M`,
      targetURL: ``,
    },
    {
      img: `../assets/hermes.png`,
      text: `Hermes`,
      targetURL: ``,
    },
    {
      img: `../assets/fendi.png`,
      text: `Fendi`,
      targetURL: ``,
    },
    {
      img: `../assets/ysl.jpeg`,
      text: `YSL`,
      targetURL: ``,
    },
    {
      img: `../assets/Balenciaga.jpeg`,
      text: `Balenciaga`,
      targetURL: ``,
    },
    {
      img: `../assets/supreme.png`,
      text: `Supreme`,
      targetURL: ``,
    },
    {
      img: `../assets/valentino.jpg`,
      text: `Valentino`,
      targetURL: ``,
    },
    {
      img: `../assets/dior.jpeg`,
      text: `Dior`,
      targetURL: ``,
    },
    {
      img: `../assets/patek.jpeg`,
      text: `Patek Philippe`,
      targetURL: ``,
    },
    {
      img: `../assets/swarovski.png`,
      text: `Swarovski`,
      targetURL: ``,
    },
    {
      img: `../assets/burberry.jpeg`,
      text: `Burberry`,
      targetURL: ``,
    },
    {
      img: `../assets/tomford.jpeg`,
      text: `Tom Ford`,
      targetURL: ``,
    },
    {
      img: `../assets/vs.png`,
      text: `Victoria's Secret`,
      targetURL: ``,
    },
    {
      img: `../assets/nb.png`,
      text: `New Balance`,
      targetURL: ``,
    },
    {
      img: `../assets/louboutin.png`,
      text: `Christian Louboutin`,
      targetURL: ``,
    },
    {
      img: `../assets/rayban.png`,
      text: `Ray Ban`,
      targetURL: ``,
    },
  ];

  useEffect(() => {
    info.forEach((list) => {
      const img = new Image();
      img.onload = () =>
        console.log(`${list.name}'s image loaded successfully`);
      img.onerror = () => console.log(`Failed to load ${list.name}'s image`);
      img.src = list.image;
    });
  }, [info]);

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
            src="../assets/banner2.png"
            alt="Banner"
            className={activeSlide === 0 ? "active" : "inactive"}
          />
          <img
            id="slide-2"
            src="../assets/bg1.jpg"
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
        <section className="info-section">
          <div className="info-lists">
            {info.map((list) => (
              <div key={list.name} className="info-list">
                <img src={list.image} alt={list.name} />
                <h4>{list.name}</h4>
                <p>{list.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="h" />

        <h1 className="decorated-h1">Recently Posted Products</h1>
        <Slider {...autoSlideSettings}>
          {filteredProducts.map((product) => (
            <div className="category">
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
            <div
              className="category"
              onClick={() => redirectToURL(d.targetURL)}
            >
              <img src={d.img} />
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
              onClick={() => redirectToURL(d.targetURL)}
            >
              <img src={d.img} />
              <p>{d.text}</p>
            </div>
          ))}
        </Slider>
      </main>

      <footer className="homefooter">
        <div className="footer-banner">
          <img src="../assets/footerbanner.png" alt="FooterBanner" />
          <h4 className="image-text">
            "เว็บไซต์ของเราเป็นแค่เว็บไซต์ตัวกลางที่ช่วยให้ พ่อค้า-แม่ค้า
            ทุกคนสามารถมาลงขายสินค้าได้ เรามีสินค้าหลากหลายแบรนด์
            <br />
            นอกจากซื้อและขายสินค้ามือสองแล้วยังสามารถเช่าสินค้าแบรนด์เนมได้ด้วย
            สำหรับคนที่ต้องการเช่ามาใช้ชั่วคราว"
            <LinkContainer to="/about">
              <button className="image-button">About Us</button>
            </LinkContainer>
          </h4>
        </div>

        <h4 className="footer-text">CONTACT</h4>
        <p>+666531892219</p>
        <p>rns_brandname@gmail.com</p>

        <div className="footer-icons">
          <a href="https://www.facebook.com/">
            <img src="../assets/facebook.png" alt="Facebook" />
          </a>
          <a href="https://www.instagram.com/">
            <img src="../assets/instagram.png" alt="Instagram" />
          </a>
          <a href="https://www.twitter.com/">
            <img src="../assets/x.png" alt="Twitter" />
          </a>
        </div>

        <img src="../rns_logo.png" alt="Logo" className="navbar-logo" />
        <p>&copy; {new Date().getFullYear()} RNS</p>
      </footer>
    </div>
  );
}

export default HomePage;