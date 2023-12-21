/* eslint-disable */
import React, { Fragment, useEffect, useState } from "react";
import "../css/about.css";

function AboutPage() {
  // const [team, setTeam] = useState([
  //   {
  //     name: 'Watchara Faichai',
  //     image: "../assets/watchara.png"
  //   },
  //   {
  //     name: 'Rachen Chaisri',
  //     image: "../assets/rachen.png"
  //   },
  //   {
  //     name: 'Nawasa Jaima',
  //     image: "../assets/nawasa.png"
  //   },
  // ]);

  // useEffect(() => {
  //   team.forEach(member => {
  //     const img = new Image();
  //     img.onload = () => console.log(`${member.name}'s image loaded successfully`);
  //     img.onerror = () => console.log(`Failed to load ${member.name}'s image`);
  //     img.src = member.image;
  //   });
  // }, [team]);
  const [info, setinfo] = useState([
    {
      name: "Centralized Platform",
      image: "../assets/logos/cPlat.png",
      desc: "Our website is a centralized platform that enables everyone to sell their products. We don't take any commission and we are not responsible for anything.",
    },
    {
      name: "Rental Services Available",
      image: "../assets/logos/rental.png",
      desc: "Explore our unique rental service for branded items, offering you the opportunity to enjoy the latest and greatest products without the commitment of ownership.",
    },
    {
      name: "Diverse Range of Brands",
      image: "../assets/logos/brandName.png",
      desc: "We cater to all tastes with a wide selection of brands from around the world. From high-end luxury labels to popular high-street names, you're sure to find brands you love.",
    },
  ]);

  useEffect(() => {
    info.forEach((list) => {
      const img = new Image();
      img.onload = () =>
        console.log(`${list.name}'s image loaded successfully`);
      img.onerror = () => console.log(`Failed to load ${list.name}'s image`);
      img.src = list.image;
    });
  }, [info]);

  return (
    <Fragment>
      <div>
        <header>
          <div className="description">
            <div>
              <h1>About Us</h1>
            </div>
            <div>
              <p className="aboutUs">
                "We're a centralized platform connecting buyers and sellers of
                brand name products. Our user-friendly platform streamlines the
                process, making it easy for users. Whether you're in search of
                exclusive brand name items or looking to sell your pre-loved."
              </p>
            </div>
          </div>
        </header>

        <section className="team-section">
          <h2 className="WWA">Our Services</h2>
          <section className="info-section">
            <div className="info-lists">
              {info.map((list) => (
                <div key={list.name} className="info-list">
                  <img src={list.image} alt={list.name} />
                  <h4>{list.name}</h4>
                  <p>{list.desc}</p>
                </div>
              ))}
            </div>
            <hr className="hh" />
          </section>
          {/* <div className="team-members">
            {team.map((member) => (
              <div key={member.name} className="team-member">
                <img src={member.image} alt={member.name} />
                <p>{member.name}</p>
              </div>
            ))}
          </div> */}
        </section>
      </div>
    </Fragment>
  );
}

export default AboutPage;
