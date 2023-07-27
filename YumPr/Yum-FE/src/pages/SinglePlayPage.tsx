import React from "react";
import "./styles/SinglePlayPage.css";
import OpenViduComponent from "../components/OpenVidu/OpenViduComponent";
import BackImg from "../assets/background_kitchen.png";
import Ham from "../assets/MovingYums/MovingHamburger.gif";
import Bacteria from "../assets/MovingYums/MovingBacteria.gif";

const SinglePlayPage: React.FC = () => {
  return (
    <div className="single-play-page">
      {/* 여기에 내용 추가 */}
      <div>
        <OpenViduComponent />
      </div>
      <div>
        <img src={BackImg} alt="" className="silge-play-footer-back" />
        <div className="fightChars">
          <img src={Ham} alt="내캐릭" className="MyCharacter" />
          <img src={Bacteria} alt="세균" className="Bacteria" />
        </div>
      </div>
    </div>
  );
};

export default SinglePlayPage;
