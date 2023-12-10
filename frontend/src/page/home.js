import React, { useState, useEffect } from 'react';
import { LinkContainer } from "react-router-bootstrap";
import "../css/home.css";

function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);

  function handleCategoryClick(category) {
    // Handle category click, e.g., navigate to a specific category page
    console.log(`Clicked on ${category}`);
  }

  function handleDotClick(slideIndex) {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const imageElement = document.getElementById(`slide-${slideIndex + 1}`);

    if (imageElement) {
      const slidePosition = imageElement.offsetLeft - sliderWrapper.offsetLeft;
      sliderWrapper.scrollTo({
        left: slidePosition,
        behavior: 'smooth',
      });

      document.querySelectorAll('.slider-wrapper img').forEach((img, index) => {
        if (index === slideIndex) {
          img.classList.add('active');
        } else {
          img.classList.remove('active');
        }
      });

      setActiveSlide(slideIndex);
    }

    console.log(`Clicked on ${slideIndex + 1}`);
  }

  const [info, setinfo] = useState([
    {
      name: 'เว็บไซต์ตัวกลาง',
      image: "../assets/cart_icon.png",
      desc: "เว็บไซต์ของเราเป็นแค่เว็บไซต์ตัวกลางที่ช่วยให้พ่อค้า-แม่ค้าทุกคนสามารถมาลงขายสินค้าได้ โดยเราจะไม่มีส่วนได้ส่วนเสีย และจะไม่รับผิดชอบใดๆ"
    },
    {
      name: 'มีบริการเช่าสินค้า',
      image: "../assets/cart_icon.png",
      desc: "นอกจากซื้อและขายสินค้ามือสองแล้วยังสามารถเช่าสินค้าแบรนด์เนมได้ด้วย สำหรับคนที่ต้องการเช่ามาใช้ชั่วคราว"
    },
    {
      name: 'สินค้าหลากหลายแบรนด์',
      image: "../assets/cart_icon.png",
      desc: "เรามีสินค้าหลากหลายแบรนด์ ไม่ว่าจะเป็น แบรนด์เอ แบรนด์บี แบรนด์ซี และแบรนด์ดี"
    },
  ]);

  useEffect(() => {
    info.forEach(list => {
      const img = new Image();
      img.onload = () => console.log(`${list.name}'s image loaded successfully`);
      img.onerror = () => console.log(`Failed to load ${list.name}'s image`);
      img.src = list.image;
    });
  }, [info]);

  return (
    <div className="homepage">
      <header className="banner-slider">
        <div className='slider-wrapper'>
          <img id="slide-1" src="../assets/banner2.png" alt="Banner" className={activeSlide === 0 ? 'active' : 'inactive'} />
          <img id="slide-2" src="../assets/banner.jpeg" alt="Banner" className={activeSlide === 1 ? 'active' : 'inactive'} />
        </div>
        <div className="banner-slider-dots">
          <button onClick={() => handleDotClick(0)}></button>
          <button onClick={() => handleDotClick(1)}></button>
        </div>
      </header>
      

      <main className='main'>
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

        <hr className='h' />
      
        <h1 className="decorated-h1">Best Seller</h1>
        <section className="categories">
          <div className="category" onClick={() => handleCategoryClick('Category 1')}>
            <img src="../assets/p2.jpeg" alt="Category 1" />
            <p>Category 1</p>
          </div>

          <div className="category" onClick={() => handleCategoryClick('Category 2')}>
            <img src="../assets/BestSeller2.png" alt="Category 2" />
            <p>Category 2</p>
          </div>

          <div className="category" onClick={() => handleCategoryClick('Category 3')}>
            <img src="../assets/BestSeller3.png" alt="Category 3" />
            <p>Category 3</p>
          </div>

          <div className="category" onClick={() => handleCategoryClick('Category 4')}>
            <img src="../assets/BestSeller4.png" alt="Category 4" />
            <p>Category 4</p>
          </div>

          <div className="category" onClick={() => handleCategoryClick('Category 5')}>
            <img src="../assets/p2.jpeg" alt="Category 5" />
            <p>Category 5</p>
          </div>
        </section>

        <hr className='h' />

        <h1 className="decorated-h1">Explore by Brand</h1>
        <section className="brands">
          <div className="brand" onClick={() => handleCategoryClick('brand 1')}>
            <img src="../assets/p2.jpeg" alt="brand 1" />
            <p>brand 1</p>
          </div>

          <div className="brand" onClick={() => handleCategoryClick('gucci')}>
            <img src="../assets/brand_gucci.png" alt="gucci" />
            <p>GUCCI</p>
          </div>

          <div className="brand" onClick={() => handleCategoryClick('dior')}>
            <img src="../assets/brand_dior.png" alt="dior" />
            <p>DIOR</p>
          </div>

          <div className="brand" onClick={() => handleCategoryClick('louisvuitton')}>
            <img src="../assets/brand_lv.png" alt="louisvuitton" />
            <p>LOUIS VUITTON</p>
          </div>

          <div className="brand" onClick={() => handleCategoryClick('brand 5')}>
            <img src="../assets/p2.jpeg" alt="brand 4" />
            <p>brand 5</p>
          </div>
        </section>

        <hr className='h' />
      
        <h1 className="decorated-h1">Explore by Category</h1>
        <section className="categories">
          <div className="category" onClick={() => handleCategoryClick('Category 1')}>
            <img src="../assets/p2.jpeg" alt="Category 1" />
            <p>Category 1</p>
          </div>

          <div className="category" onClick={() => handleCategoryClick('Category 2')}>
            <img src="../assets/category_bag.png" alt="Category 2" />
            <p>Bag</p>
          </div>

          <div className="category" onClick={() => handleCategoryClick('Category 3')}>
            <img src="../assets/category_clothes.png" alt="Category 3" />
            <p>Clothes</p>
          </div>

          <div className="category" onClick={() => handleCategoryClick('Category 4')}>
            <img src="../assets/category_accessories.png" alt="Category 4" />
            <p>Accessories</p>
          </div>

          <div className="category" onClick={() => handleCategoryClick('Category 5')}>
            <img src="../assets/p2.jpeg" alt="Category 4" />
            <p>Category 5</p>
          </div>
        </section>

      </main>

      <footer className='homefooter'>
        <div className='footer-banner'>
          <img src="../assets/footerbanner.png" alt="FooterBanner" />
          <h4 className='image-text'>
            "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
            <LinkContainer to="/about">
                <button className='image-button'>About Us</button>
            </LinkContainer>
          </h4>
        </div>

        <h4 className='footer-text'>CONTACT</h4>
        <p>+666531892219</p>
        <p>rns_brandname@gmail.com</p>
        
        <div className='footer-icons'>
          <a href="https://www.facebook.com/"><img src="../assets/facebook.png" alt="Facebook" /></a>
          <a href="https://www.instagram.com/"><img src="../assets/instagram.png" alt="Instagram" /></a>
          <a href="https://www.twitter.com/"><img src="../assets/x.png" alt="Twitter" /></a>
        </div>

        <img src="../rns_logo.png" alt="Logo" className="navbar-logo" />
        <p>&copy; {new Date().getFullYear()} RNS</p>
        
      </footer>
    </div>
  );
}

export default HomePage;
