import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from "../store/store";
import { setShowEffects, selectShowEffects } from "../store/showEffectsSlice";
import "./styles/SinglePlayPage.css";
import OpenViduComponent from "../components/OpenVidu/OpenViduComponent";
import BackImg from "../assets/background_kitchen.png";
import Ours from "../assets/before_fight/01_tofu_stand.gif";
import Others from "../assets/before_fight/32_germ_standing.gif";
import Effects from "../assets/effects/effect_1.png"


const SinglePlayPage: React.FC = () => {
  const [showImages, setShowImages] = useState(true);
  const showEffects = useSelector(selectShowEffects);
  const dispatch = useDispatch();

  const handleImageTouch = () => {
    if (showImages) { // 이미지가 보이는 경우에만 처리
      setShowImages(false);
      dispatch(setShowEffects(!showEffects));
    }
  };

  useEffect(() => {
    const handleTouchMove = (event: TouchEvent) => {
      handleImageTouch();
    };

    const oursImageElement = document.getElementById("oursImage");
    const othersImageElement = document.getElementById("othersImage");

    if (oursImageElement && othersImageElement) {
      oursImageElement.addEventListener("touchmove", handleTouchMove);
      othersImageElement.addEventListener("touchmove", handleTouchMove);
    }

    return () => {
      if (oursImageElement && othersImageElement) {
        oursImageElement.removeEventListener("touchmove", handleTouchMove);
        othersImageElement.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, [showImages, dispatch, showEffects]);

  useEffect(() => {
    if (showEffects) {
      const animationTimeout = setTimeout(() => {
        dispatch(setShowEffects(false));
      }, 1500);

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
      {showEffects && <img src={Effects} alt="" className="effects-image" />}
    </div>
  );
};

export default SinglePlayPage;
