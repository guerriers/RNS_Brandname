import React from "react";

function FAQPage() {
  return (
    <div className="faq-page">
      <header>
        <h1>Frequently Asked Questions</h1>
        <p>
          Find answers to common questions about our Second-Hand Marketplace.
        </p>
      </header>

      <section className="general-questions">
        <h2>General Questions</h2>
        <div className="faq-item">
          <h3>What is Second-Hand Marketplace?</h3>
          <p>
            Second-Hand Marketplace is a platform that facilitates the renting
            and selling of second-hand items. Users can browse, rent, or sell a
            variety of products in an eco-friendly and sustainable way.
          </p>
        </div>

        <div className="faq-item">
          <h3>How do I create an account?</h3>
          <p>
            To create an account, click on the "Sign Up" button on the top right
            corner of the homepage. Follow the instructions to provide your
            details and create your account.
          </p>
        </div>

        {/* Add more general questions as needed */}
      </section>

      <section className="renting">
        <h2>Renting Items</h2>
        <div className="faq-item">
          <h3>How does the renting process work?</h3>
          <p>
            Browse the available items, select the one you want to rent, and
            follow the prompts to complete the rental process. Payments can be
            made securely through our platform.
          </p>
        </div>

        <div className="faq-item">
          <h3>What happens if the rented item is damaged?</h3>
          <p>
            Users are responsible for taking care of rented items. If any damage
            occurs, please report it immediately. Refer to our Terms of Service
            for more details on liability and damages.
          </p>
        </div>

        {/* Add more renting-related questions as needed */}
      </section>

      <section className="selling">
        <h2>Selling Items</h2>
        <div className="faq-item">
          <h3>How do I list an item for sale?</h3>
          <p>
            Log in to your account, go to your profile, and choose the "List
            Item" option. Follow the steps to provide details about the item,
            set a price, and list it for sale.
          </p>
        </div>

        <div className="faq-item">
          <h3>Is there a fee for selling items?</h3>
          <p>
            There may be a small transaction fee for successful sales. Check our
            Fee Policy for detailed information on fees associated with selling
            items on our platform.
          </p>
        </div>

        {/* Add more selling-related questions as needed */}
      </section>

      <footer>
        <p>&copy; {new Date().getFullYear()} RNS</p>
      </footer>
    </div>
  );
}

export default FAQPage;
