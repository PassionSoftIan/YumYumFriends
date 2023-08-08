import React, { useState, useEffect } from "react";
import "./styles/SinglePlayPage.css";
import OpenViduComponent from "../components/OpenVidu/OpenViduComponent";
import BackImg from "../assets/background_kitchen.png";
import Ours from "../assets/before_fight/01_tofu_stand.gif";
import Others from "../assets/before_fight/32_germ_standing.gif";

const SinglePlayPage: React.FC = () => {
  const [showImages, setShowImages] = useState(true);
  const [showEffects, setShowEffects] = useState(false);

  // 이미지들이 닿았을 때 처리하는 함수
  const handleImageTouch = () => {
    setShowImages(false);
    setShowEffects(true);
  };

  useEffect(() => {
    const oursImageElement = document.getElementById("oursImage") as HTMLElement | null;
    const othersImageElement = document.getElementById("othersImage") as HTMLElement | null;

    if (oursImageElement && othersImageElement) {
      oursImageElement.addEventListener("touchmove", handleImageTouch);
      othersImageElement.addEventListener("touchmove", handleImageTouch);
    }

    return () => {
      if (oursImageElement && othersImageElement) {
        oursImageElement.removeEventListener("touchmove", handleImageTouch);
        othersImageElement.removeEventListener("touchmove", handleImageTouch);
      }
    };
  }, []);

  // showEffects 상태가 변경될 때 애니메이션 시작
  useEffect(() => {
    if (showEffects) {
      // 애니메이션 시간(여기서는 2초) 후에 showEffects 상태를 다시 false로 설정
      const animationTimeout = setTimeout(() => {
        setShowEffects(false);
      }, 2000);

      return () => clearTimeout(animationTimeout);
    }
  }, [showEffects]);

  return (
    <div className="single-play-page">
      <OpenViduComponent />
      {showImages && (
        <>
          <img src={BackImg} alt="" className="overlay-image" />
          <img src={Ours} alt="" className={`ours-image ${showImages ? "" : "hidden"}`} id="oursImage" />
          <img src={Others} alt="" className={`others-image ${showImages ? "" : "hidden"}`} id="othersImage" />
        </>
      )}
      {showEffects && <div className="effects-image" />} {/* showEffects 상태가 true일 때 이펙트 애니메이션 보여줌 */}
    </div>
  );
};

export default SinglePlayPage;
