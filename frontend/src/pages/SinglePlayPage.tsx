import React, { useState, useEffect } from "react";
import "./styles/SinglePlayPage.css";
import OpenViduComponent from "../components/OpenVidu/OpenViduComponent";
import BackImg from "../assets/background_kitchen.png";
import Ours from "../assets/before_fight/01_tofu_stand.gif"
import Others from "../assets/before_fight/32_germ_standing.gif"
import Effect from "../assets/effects/effect_1.png"

const SinglePlayPage: React.FC = () => {
  const [showImages, setShowImages] = useState(true);

  // 이미지들이 닿았을 때 처리하는 함수
  const handleImageTouch = () => {
    setShowImages(false);
  };

  useEffect(() => {
    const oursImageElement = document.getElementById("oursImage") as HTMLElement | null;
    const othersImageElement = document.getElementById("othersImage") as HTMLElement | null;
  
    if (oursImageElement && othersImageElement) {
      // 이미지들이 닿았을 때 처리를 위한 이벤트 리스너 추가
      oursImageElement.addEventListener("touchmove", handleImageTouch);
      othersImageElement.addEventListener("touchmove", handleImageTouch);
    }
  
    return () => {
      if (oursImageElement && othersImageElement) {
        // 컴포넌트가 언마운트되면 이벤트 리스너 제거
        oursImageElement.removeEventListener("touchmove", handleImageTouch);
        othersImageElement.removeEventListener("touchmove", handleImageTouch);
      }
    };
  }, []);
  

  return (
    <div className="single-play-page">
      <OpenViduComponent />
      {showImages && (
        <>
           <img src={BackImg} alt="" className="overlay-image" />
          <img src={Ours} alt="" className={`ours-image ${showImages ? '' : 'hidden'}`} id="oursImage" />
          <img src={Others} alt="" className={`others-image ${showImages ? '' : 'hidden'}`} id="othersImage" />
          <img src={Effect} alt="" className="effects-image" />        </>
      )}
    </div>
  );
};

export default SinglePlayPage;
