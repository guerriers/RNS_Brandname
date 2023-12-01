import React, { useState } from "react";
import "../css/faqs.css";

function FAQPage() {
  const questions = [
    {
      question: "What is Second-Hand Marketplace?",
      answer:
        "Second-Hand Marketplace is a platform that facilitates the renting and selling of second-hand items. Users can browse, rent, or sell a variety of products in an eco-friendly and sustainable way.",
    },
    {
      question: "How do I create an account?",
      answer:
        "To create an account, click on the 'Sign Up' button on the top right corner of the homepage. Follow the instructions to provide your details and create your account.",
    },
    {
      question: "How does the renting process work?",
      answer:
        "Browse the available items, select the one you want to rent, and follow the prompts to complete the rental process. Payments can be made securely through our platform.",
    },
    {
      question: "What happens if the rented item is damaged?",
      answer:
        "Users are responsible for taking care of rented items. If any damage occurs, please report it immediately. Refer to our Terms of Service for more details on liability and damages.",
    },
    {
      question: "How do I list an item for sale?",
      answer:
        "Log in to your account, go to your profile, and choose the 'List Item' option. Follow the steps to provide details about the item, set a price, and list it for sale.",
    },
    {
      question: "Is there a fee for selling items?",
      answer:
        "There may be a small transaction fee for successful sales. Check our Fee Policy for detailed information on fees associated with selling items on our platform.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="faq-page">
      <header>
        <h1>FAQs</h1>
      </header>

      <main className="faq-list">
        {questions.map((question, index) => (
          <div
            className={`faq-item ${index === activeIndex ? "active" : ""}`}
            key={question.question}
            onClick={() => handleToggle(index)}
          >
            <div className="question-text">{question.question}</div>
            <p className={`answer ${index === activeIndex ? "visible" : ""}`}>
              {question.answer}
            </p>
          </div>
        ))}
      </main>
    </div>
  );
}

export default FAQPage;
