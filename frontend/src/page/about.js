import React, { Fragment } from "react";

function AboutPage() {
  return (
    <Fragment>
    <div>
      <header>
        <h1>About</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur rhoncus nulla dui, in dapibus mauris tristique id. Nullam semper lectus sed orci venenatis, ac scelerisque lectus luctus.</p>
      </header>

      <section className="crew-section">
        <h2>Our Team</h2>
        <div className="crew-members">
          {team.map((member) => (
            <div key={member.name} className="crew-member">
              <img src={member.image} alt={member.name} />
              <p>{member.name}</p>
            </div>
          ))}
        </div>
      </section>

        <footer>
          <p>&copy; {new Date().getFullYear()} RNS</p>
        </footer>
      </div>
    </Fragment>
  );
}

export default AboutPage;
