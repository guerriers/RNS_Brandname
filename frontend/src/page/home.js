import React from 'react';

function HomePage() {
  return (
    <div>
      <header>
        <h1>Welcome to RNS BrandName</h1>
      </header>

      <footer>
        <p>&copy; {new Date().getFullYear()} RNS</p>
      </footer>
    </div>
  );
}

export default HomePage;
