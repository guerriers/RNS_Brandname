import React from 'react';

function AboutPage() {
  return (
    <div>
      <header>
        <h1>About</h1>
      </header>

      <footer>
        <p>&copy; {new Date().getFullYear()} RNS</p>
      </footer>
    </div>
  );
}

export default AboutPage;
