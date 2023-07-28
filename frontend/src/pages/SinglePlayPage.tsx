import React from "react";
import "./styles/SinglePlayPage.css";
import OpenViduComponent from "../components/OpenVidu/OpenViduComponent";
import BackImg from "../assets/background_kitchen.png";

const SinglePlayPage: React.FC = () => {
  return (
    <div className="single-play-page">
      {/* 여기에 내용 추가 */}
      <div>
        <OpenViduComponent />
      </div>
      <div>
        <img src={BackImg} alt="" className="silge-play-footer-back" />
      </div>
    </div>
  );
};

export default SinglePlayPage;
