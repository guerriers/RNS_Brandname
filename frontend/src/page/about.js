import React,{Fragment} from 'react';

function AboutPage() {
  return (
    <Fragment>
    <div>
      <header>
        <h1>About</h1>
      </header>

      <footer>
        <p>&copy; {new Date().getFullYear()} RNS</p>
      </footer>
    </div>
    </Fragment>
  );
}

export default AboutPage;
