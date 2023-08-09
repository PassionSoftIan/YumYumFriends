import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../store/store";
import { setShowEffects, selectShowEffects } from "../store/showEffectsSlice";
import "./styles/SinglePlayPage.css";
import OpenViduComponent from "../components/OpenVidu/OpenViduComponent";
import BackImg from "../assets/background_kitchen.png";
import Ours from "../assets/before_fight/01_tofu_stand.gif";
import Others from "../assets/before_fight/32_germ_standing.gif";
import Effects from "../assets/effects/1_tofu.png"


const SinglePlayPage: React.FC = () => {
  const [showImages, setShowImages] = useState(true);
  const showEffects = useSelector(selectShowEffects); // Use the corrected selector
  const dispatch = useDispatch();

  // 이미지들이 닿았을 때 처리하는 함수
  const handleImageTouch = () => {
    setShowImages(false);
    // 버튼 클릭 시 리덕스 액션을 호출하여 showEffects 상태를 토글
    dispatch(setShowEffects(!showEffects));
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
  }, [showEffects, dispatch]);

  // showEffects 상태가 변경될 때 애니메이션 시작
  useEffect(() => {
    if (showEffects) {
      // 애니메이션 시간(여기서는 2초) 후에 showEffects 상태를 다시 false로 설정
      const animationTimeout = setTimeout(() => {
        dispatch(setShowEffects(false));
      }, 1500);
      console.log(showEffects)
      return () => clearTimeout(animationTimeout);
    }
  }, [showEffects, dispatch]);

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
      {showEffects && <img src={Effects} alt="" className="effects-image" />} {/* showEffects 상태가 true일 때 이펙트 애니메이션 보여줌 */}
    </div>
  );
};

export default SinglePlayPage;
