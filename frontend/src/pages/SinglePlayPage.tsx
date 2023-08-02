import React from "react";
import "./styles/SinglePlayPage.css";
import OpenViduComponent from "../components/OpenVidu/OpenViduComponent";

const SinglePlayPage: React.FC = () => {
  return (
    <div className="single-play-page">
      <div>
        <OpenViduComponent />
      </div>
    </div>
  );
};

export default SinglePlayPage;
