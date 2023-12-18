import React from 'react';
import '../css/component/footer.css';

const Footer = () => {
  return (
    <footer className="footer">

        <h4 className="footer-text"><b>CONTACT</b></h4>
        <p className='contact'>+66623725430</p>
        <p className='contact'>rnsbrandname@gmail.com</p>

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

        <img src="../rns_logo.png" alt="Logo" className="footer-logo" />
        <p>&copy; {new Date().getFullYear()} RNS. ALL RIGHTS RESERVED.</p>
    </footer>
  );
};

export default Footer;
