import React, { useState } from 'react';
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
        <h1 className="decorated-h1">Featured Categories</h1>
        <section className="categories">
          <div className="category" onClick={() => handleCategoryClick('Category 1')}>
            <img src="../assets/p2.jpeg" alt="Category 1" />
            <p>Category 1</p>
          </div>

          <div className="category" onClick={() => handleCategoryClick('Category 2')}>
            <img src="../assets/p2.jpeg" alt="Category 2" />
            <p>Category 2</p>
          </div>

          <div className="category" onClick={() => handleCategoryClick('Category 3')}>
            <img src="../assets/p2.jpeg" alt="Category 3" />
            <p>Category 3</p>
          </div>

          <div className="category" onClick={() => handleCategoryClick('Category 4')}>
            <img src="../assets/p2.jpeg" alt="Category 4" />
            <p>Category 4</p>
          </div>

          <div className="category" onClick={() => handleCategoryClick('Category 5')}>
            <img src="../assets/p2.jpeg" alt="Category 4" />
            <p>Category 5</p>
          </div>

        </section>
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} RNS</p>
      </footer>
    </div>
  );
}

export default HomePage;
