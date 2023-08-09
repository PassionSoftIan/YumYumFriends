import React from "react";
import VideoChat from "../components/MultiVidu/VideoChat";

const MultiPlayPage: React.FC = () => {
  return (
    <div className="multi-play-page">
      <div className="video-container">{/* <OpenViduComponent /> */}</div>
      <div className="game-container">
      <VideoChat />
      </div>
    </div>
  );
};

export default MultiPlayPage;
