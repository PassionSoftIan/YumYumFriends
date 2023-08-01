import React, { useState } from "react";
import "./styles/SinglePlayPage.css";
import OpenViduComponent from "../components/OpenVidu/OpenViduComponent";
import BackImg from "../assets/background_kitchen.png";
import GetYum from "../components/SinglePage/GetYum";

const SinglePlayPage: React.FC = () => {
  // 여기서 랜덤으로 수집할 냠냠이를 정해줘야함
  const targetYum = {
    name: "eggplant",
    type: "가지맨",
  };

  const [clear, setClear] = useState(true);

  return (
    <div className="single-play-page">
      {clear ? (
        <div>
          <GetYum yum={targetYum} />
        </div>
      ) : (
        <div>
          <OpenViduComponent />
          <img src={BackImg} alt="" className="overlay-image" />
        </div>
      )}
      <div>
        {/* <img src={BackImg} alt="" className="silge-play-footer-back" /> */}
      </div>
    </div>
  );
};

export default SinglePlayPage;
