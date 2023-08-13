import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import useImageSrc from "../hooks/useImage/useImageSrc";
import useImageAttack from "../hooks/useImage/useImageAttack";
import useImageEffect from "../hooks/useImage/useImageEffect";
import useImageCharge from "../hooks/useImage/useImageCharge";
import { setShowEffects, selectShowEffects } from "../store/showEffectsSlice";

import "./styles/SinglePlayPage.css";
import OpenViduComponent from "../components/OpenVidu/OpenViduComponent";
import RandomBack from "../hooks/useImage/useImageRandom";
import Others from "../assets/1313.gif";
import OthersAfterAttack from "../assets/Attacked/2.gif";
import ProgressBar from "../components/Common/ProgressBar";

import InvitationYum from "../components/SinglePage/InvitationYum";

const SinglePlayPage: React.FC = () => {
  const [showImages, setShowImages] = useState(true);
  const [showEffectsTemp, setShowEffectsTemp] = useState(false); // 추가된 상태

  const showEffects = useSelector(selectShowEffects);
  const detection = useSelector((state: RootState) => state.detection);
  const dispatch = useDispatch();
  const ourImageSrc = useImageSrc();
  const ourImageAttack = useImageAttack();
  const ourImageEffect = useImageEffect();
  const ourImageCharge = useImageCharge();
  const useImageRandom = RandomBack();
  const [mySession, setMySession] = useState<any>(null);
  const [showOthersAfterAttack, setShowOthersAfterAttack] = useState(false);
  const [showOthersWithDelay, setShowOthersWithDelay] = useState(false);

  const eating = useSelector((state: RootState) => state.eating.value);
  const maxEating = useSelector((state: RootState) => state.maxEating.value);
  const hitPoints = ((1 - eating / maxEating) * 100).toFixed(0);

  const handleMySession = (obj: { eatValue: boolean }) => {
    console.log("Received eatValue:", obj.eatValue);
    if (obj.eatValue) {
      setShowEffectsTemp(true); // eatValue가 true일 때 showEffectsTemp를 true로 설정
    }
    setMySession(obj);
  };

  const handleImageTouch = () => {
    setShowImages(false);
    dispatch(setShowEffects(!showEffectsTemp)); // showEffectsTemp 값으로 변경
  };

  useEffect(() => {
    const oursImageElement = document.getElementById(
      "oursImage"
    ) as HTMLElement | null;
    const othersImageElement = document.getElementById(
      "othersImage"
    ) as HTMLElement | null;

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
  }, [showEffectsTemp, dispatch]);

  useEffect(() => {
    if (showEffects) {
      // 관전자들에게 공격 여부를 전송, showEffects(아마 true/false) 값을 전달
      if (mySession != null) {
        mySession
          .signal({
            data: true, // Any string (optional)
            to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
            type: "attack-state", // The type of message (optional)
          })
          .then(() => {
            console.log("Message successfully sent");
          })
          .catch((error: any) => {
            console.error(error);
          });
      }

      // 애니메이션 시간(여기서는 2초) 후에 showEffects 상태를 다시 false로 설정
      const animationTimeout = setTimeout(() => {
        dispatch(setShowEffects(false));
        if (mySession != null) {
          mySession
            .signal({
              data: false, // Any string (optional)
              to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
              type: "attack-state", // The type of message (optional)
            })
            .then(() => {
              console.log("Message successfully sent");
            })
            .catch((error: any) => {
              console.error(error);
            });
        }
        setShowOthersWithDelay(true); // 이미지 지연 처리
        setShowOthersAfterAttack(true);
      }, 1500);
      console.log(showEffects);

      return () => clearTimeout(animationTimeout);
    }
  }, [showEffectsTemp]);

  useEffect(() => {
    console.log(mySession);
  }, [mySession]);

  useEffect(() => {
    const imageElement = document.querySelector(".effects-image");

    const handleAnimationEnd = () => {
      setShowEffects(false);
    };

    if (imageElement) {
      imageElement.addEventListener("animationend", handleAnimationEnd);
    }

    return () => {
      if (imageElement) {
        imageElement.removeEventListener("animationend", handleAnimationEnd);
      }
    };
  }, []);

  return (
    <div className="single-play-page">
      <OpenViduComponent onObjectCreated={handleMySession} />
      <div>
        <InvitationYum />
      </div>
      <div className="images-container">
        {showImages && (
          <div className="images">
            <img src={useImageRandom} alt="" className="overlay-image" />
            <img
              src={
                showEffects
                  ? "attack-animation"
                  : eating % 5 === 4
                  ? ourImageCharge
                  : ourImageSrc
              }
              alt=""
              className={`ours-image ${showImages ? "" : "hidden"}`}
              id="oursImage"
            />

            <ProgressBar className="progress-bar" completed={hitPoints} />
            <img
              src={showEffects ? OthersAfterAttack : Others}
              alt=""
              className={`others-image ${showImages ? "" : "hidden"}`}
              id="othersImage"
            />
          </div>
        )}
        {showEffects && eating % 5 !== 0 && (
          <img
            src={ourImageAttack}
            alt=""
            className={`effects-image ${showEffects ? ourImageSrc : "hidden"}`}
            onAnimationEnd={() => setShowEffects(false)} // 애니메이션 종료 시 이미지 숨김
          />
        )}

        {!(eating % 5) && eating != 0 && (
          <img
            src={ourImageEffect}
            alt=""
            className={`effects-image ${showImages ? "" : "hidden"}`}
          />
        )}
      </div>
    </div>
  );
};

export default SinglePlayPage;
