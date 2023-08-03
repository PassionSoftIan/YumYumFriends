import React from "react";
import "./styles/SinglePlayPage.css";
import OpenViduComponent from "../components/OpenVidu/OpenViduComponent";
import BackImg from "../assets/background_kitchen.png";

const SinglePlayPage: React.FC = () => {
  return (
    <div className="single-play-page">
      <OpenViduComponent />
      <img src={BackImg} alt="" className="overlay-image" />
    </div>
  );
};

export default SinglePlayPage;
