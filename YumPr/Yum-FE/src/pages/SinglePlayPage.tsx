import React from "react";
import "./styles/SinglePlayPage.css";
import OpenViduComponent from "../components/OpenVidu/OpenViduComponent";
import BackgroundImg from "../assets/backgrond_birthday.png";

const SinglePlayPage: React.FC = () => {
  return (
    <div className="single-play-page">
      {/* 여기에 내용 추가 */}
      <OpenViduComponent />
      <img src={BackgroundImg} />
    </div>
  );
};

export default SinglePlayPage;
