import React from "react";
import "./styles/SinglePlayPage.css";
import OpenViduComponent from "../OpenVidu";

const SinglePlayPage: React.FC = () => {
  return (
    <div className="single-play-page">
      <h1>Single Play Page</h1>
      {/* 여기에 내용 추가 */}
      <OpenViduComponent/>
    </div>
  );
};

export default SinglePlayPage;
