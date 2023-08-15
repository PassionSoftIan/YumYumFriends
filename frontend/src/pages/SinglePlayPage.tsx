import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import useImageSrc from "../hooks/useImage/useImageSrc";
import useImageAttack from "../hooks/useImage/useImageAttack";
import useImageEffect from "../hooks/useImage/useImageEffect";
import useImageCharge from "../hooks/useImage/useImageCharge";
import useImageEnemy from "../hooks/useImage/useImageEnemy";
import useImageAed from "../hooks/useImage/useImageAed";
import useImageFail from "../hooks/useImage/useImageFail";
import useImageShow from "../hooks/useImage/useImageShow";
import useImageSick from "../hooks/useImage/useImageSick";
import useImageBigEffects from "../hooks/useImage/useImageBigEffects";
import useImageEnemyAttack from "../hooks/useImage/useImageEnemyAttack";
import { setShowEffects, selectShowEffects } from "../store/showEffectsSlice";
import GameStage from "../components/OpenVidu/GameStage";

import virus from "../assets/effects/1.png";

import { setEnemyEnergy, setMaxEnemyEnergy } from "../store/enemyEnergySlice";

import "./styles/SinglePlayPage.css";
import OpenViduComponent from "../components/OpenVidu/OpenViduComponent";
import RandomBack from "../hooks/useImage/useImageRandom";

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
  const ourImageSick = useImageSick();
  const otherImageEnemy = useImageEnemy();
  const otherImageAed = useImageAed();
  const otherImageFail = useImageFail();
  const otherImageShow = useImageShow();
  const otherImageEnemyAttack = useImageEnemyAttack();
  const useImageRandom = RandomBack();
  const otherImageBigEffects = useImageBigEffects();

  const enemyEnergy = useSelector(
    (state: RootState) => state.enemyEnergy.enemyEnergy
  ); // enemyEnergy 가져오기
  const maxEnemyEnergy = useSelector(
    (state: RootState) => state.enemyEnergy.maxEnemyEnergy
  ); // maxEnemyEnergy 가져오기

  const [mySession, setMySession] = useState<any>(null);
  const [showOthersAfterAttack, setShowOthersAfterAttack] = useState(false);
  const [showOthersWithDelay, setShowOthersWithDelay] = useState(false);
  const [openViduLoaded, setOpenViduLoaded] = useState(false);
  const [loadingPageVisible, setLoadingPageVisible] = useState(true);
  const [initialImageVisible, setInitialImageVisible] = useState(true);
  const [showFailImage, setShowFailImage] = useState(false);

  const eating = useSelector((state: RootState) => state.eating.value);
  const maxEating = useSelector((state: RootState) => state.maxEating.value);
  // const hitPoints = ((1 - eating / maxEating) * 100).toFixed(0);

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

  const sendMessage = (msgdata: string, msgtype: string) => {
    if (mySession != null) {
      mySession
        .signal({
          data: msgdata, // Any string (optional)
          to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
          type: msgtype, // The type of message (optional)
        })
        .then(() => {
          console.log("Message successfully sent");
        })
        .catch((error: any) => {
          console.error(error);
        });
    } else {
      console.log("No session");
    }
  };

  useEffect(() => {
    if (showEffects) {
      // 관전자들에게 공격 여부 메시지를 전송
      sendMessage("true", "attack-state");

      // 애니메이션 시간(여기서는 2초) 후에 showEffects 상태를 다시 false로 설정
      const animationTimeout = setTimeout(() => {
        dispatch(setShowEffects(false));
        // 공격 종료 메시지 전송
        sendMessage("false", "attack-state");
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

  // const handlePageClick = () => {
  //   setLoadingPageVisible(false); // 로딩 페이지를 사라지게 만들기 위한 상태 변경
  //   setOpenViduLoaded(true);
  // };

  useEffect(() => {
    if (eating === maxEating) {
      setShowFailImage(true);

      const timeout = setTimeout(() => {
        setShowFailImage(false);
      }, 5000); // 5 seconds in milliseconds

      return () => clearTimeout(timeout);
    }
  }, [eating]);

  useEffect(() => {
    // 처음 이미지가 랜더링될 때 1초 후에 initialImageVisible 상태를 false로 변경
    const initialImageTimeout = setTimeout(() => {
      setInitialImageVisible(false);
    }, 1740);

    return () => clearTimeout(initialImageTimeout);
  }, []);

  return (
    <div className="single-play-page">
      <OpenViduComponent onObjectCreated={handleMySession} />
      <div>
        <InvitationYum />
      </div>
      <div className="gamestage-container">
        <GameStage />
      </div>
      <div className="images-container">
        {showImages && (
          <div className="images">
            <img src={useImageRandom} alt="" className="overlay-image" />
            <img
              src={
                showEffects
                  ? "attack-animation"
                  : eating % 3 === 2
                  ? ourImageCharge
                  : enemyEnergy > maxEnemyEnergy - 1
                  ? ourImageSick
                  : ourImageSrc
              }
              alt=""
              className={`ours-image ${showImages ? "" : "hidden"}`}
              id="oursImage"
            />
            {/* <ProgressBar className="progress-bar" completed={hitPoints} /> */}
            <img
              src={
                showFailImage
                  ? otherImageFail
                  : showEffects
                  ? eating === maxEating
                    ? otherImageFail
                    : eating % 3 === 0
                    ? otherImageBigEffects // 3의 배수일 때 다른 이미지
                    : otherImageAed
                  : eating === 0 && initialImageVisible
                  ? otherImageShow
                  : enemyEnergy === maxEnemyEnergy
                  ? otherImageEnemyAttack
                  : otherImageEnemy
              }
              alt=""
              className={`others-image ${showImages ? "" : "hidden"}`}
              id="othersImage"
            />
          </div>
        )}
        {showEffects && eating % 3 !== 0 && (
          <img
            src={ourImageAttack}
            alt=""
            className={`effects-image ${showEffects ? ourImageSrc : "hidden"}`}
            onAnimationEnd={() => setShowEffects(false)} // 애니메이션 종료 시 이미지 숨김
          />
        )}

        {!(eating % 3) && eating !== 0 && (
          <img
            src={ourImageEffect}
            alt=""
            className={`effects-image2 ${showImages ? "" : ""}`}
          />
        )}
        {enemyEnergy > maxEnemyEnergy - 1 && (
          <img
            src={virus}
            alt=""
            className={`others-Effects ${showImages ? "" : "hidden"}`}
          />
        )}
      </div>
    </div>
  );
};

export default SinglePlayPage;
