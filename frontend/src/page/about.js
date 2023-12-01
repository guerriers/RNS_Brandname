import React, { Fragment, useEffect, useState } from "react";
import "../css/about.css";

function AboutPage() {
  const [team, setTeam] = useState([
    {
      name: 'Watchara Faichai',
      image: "../assets/watchara.png"
    },
    {
      name: 'Rachen Chaisri',
      image: "../assets/rachen.png"
    },
    {
      name: 'Nawasa Jaima',
      image: "../assets/nawasa.png"
    },
  ]);

  useEffect(() => {
    team.forEach(member => {
      const img = new Image();
      img.onload = () => console.log(`${member.name}'s image loaded successfully`);
      img.onerror = () => console.log(`Failed to load ${member.name}'s image`);
      img.src = member.image;
    });
  }, [team]);

  return (
    <Fragment>
    <div>
      <header>
        <h1>About</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur rhoncus nulla dui, in dapibus mauris tristique id. Nullam semper lectus sed orci venenatis, ac scelerisque lectus luctus.</p>
      </header>

      <section className="team-section">
        <h2>Our Team</h2>
        <div className="team-members">
          {team.map((member) => (
            <div key={member.name} className="team-member">
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
