import React from 'react';
import "../css/home.css";

function HomePage() {
  return (
    <div className="homepage">
      <header className='banner'>
        <img src="../assets/banner.jpeg" alt="Banner" />
      </header>

      <main>
        <section className="featured-categories">
          <div className="category" onClick={() => handleCategoryClick('Category 1')}>
            <img src="../assets/p1.jpeg" alt="Category 1" />
          </div>

          <div className="category" onClick={() => handleCategoryClick('Category 2')}>
            <img src="../assets/p1.jpeg" alt="Category 2" />
          </div>

        </section>
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} RNS</p>
      </footer>
    </div>
  );
}

function handleCategoryClick(category) {
  // Handle category click, e.g., navigate to a specific category page
  console.log(`Clicked on ${category}`);
}

export default HomePage;
