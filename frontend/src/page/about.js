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
      name: "เว็บไซต์ตัวกลาง",
      image: "../assets/cart_icon.png",
      desc: "เว็บไซต์ของเราเป็นแค่เว็บไซต์ตัวกลางที่ช่วยให้พ่อค้า-แม่ค้าทุกคนสามารถมาลงขายสินค้าได้ โดยเราจะไม่มีส่วนได้ส่วนเสีย และจะไม่รับผิดชอบใดๆ",
    },
    {
      name: "มีบริการเช่าสินค้า",
      image: "../assets/cart_icon.png",
      desc: "นอกจากซื้อและขายสินค้ามือสองแล้วยังสามารถเช่าสินค้าแบรนด์เนมได้ด้วย สำหรับคนที่ต้องการเช่ามาใช้ชั่วคราว",
    },
    {
      name: "สินค้าหลากหลายแบรนด์",
      image: "../assets/cart_icon.png",
      desc: "เรามีสินค้าหลากหลายแบรนด์ ไม่ว่าจะเป็น Gucci Dior Cartier และแบรนด์ดังอื่นๆ",
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
              <p>
                พวกเราคือเว็บไซต์ตัวกลางที่ช่วยให้พ่อค้า-แม่ค้าทุกคนสามารถมาลงขายสินค้าได้
              </p>
              <p>โดยเราจะไม่มีส่วนได้ส่วนเสีย และจะไม่รับผิดชอบใดๆ</p>
              <p>
                นอกจากซื้อ และขายสินค้ามือสองแล้วยังสามารถเช่าสินค้าแบรนด์เนมได้
              </p>
            </div>
          </div>
        </header>

        <section className="team-section">
          <h2 className="WWA">WHO WE ARE</h2>
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
