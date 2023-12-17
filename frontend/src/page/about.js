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
        <div className="description">
          <div><h1>About</h1></div>
          <div>
            <p>พวกเราคือเว็บไซต์ตัวกลางที่ช่วยให้พ่อค้า-แม่ค้าทุกคนสามารถมาลงขายสินค้าได้ 
            </p>
            <p>
              โดยเราจะไม่มีส่วนได้ส่วนเสีย และจะไม่รับผิดชอบใดๆ
            </p>
            <p>
              นอกจากซื้อและขายสินค้ามือสองแล้วยังสามารถเช่าสินค้าแบรนด์เนมได้ 
            </p>
          </div>
        </div>
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
      </div>
    </Fragment>
  );
}

export default AboutPage;
