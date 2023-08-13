import React, { useState, useEffect } from "react";
import M_OpenViduComponent from "../components/MultiVidu/M_OpenViduComponent";

// 여기부터 싱글 import
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import useImageSrc from "../hooks/useImage/useImageSrc";
import useImageAttack from "../hooks/useImage/useImageAttack";
import useImageEffect from "../hooks/useImage/useImageEffect";
import { setShowEffects, selectShowEffects } from "../store/showEffectsSlice";

import "./styles/SinglePlayPage.css";
import RandomBack from "../hooks/useImage/useImageRandom";
import Others from "../assets/before_fight/32_germ_standing.gif";
import OthersAfterAttack from "../assets/Attacked/32_germ_attacked.gif";
import ProgressBar from "../components/Common/ProgressBar";
// 여기까지 싱글 import

const MultiPlayPage: React.FC = () => {

  const urlSearch = new URLSearchParams(window.location.search);
  const sessionID = urlSearch.get("SessionID");
  const encodedHostInfo = urlSearch.get("HostInfo");
  const hostInfo = decodeURIComponent(encodedHostInfo || "");
  const gameType = urlSearch.get("GameType");

  const commonProps = { sessionID, hostInfo, gameType };

// 여기부터 싱글 변수 및 함수

  const [showImages, setShowImages] = useState(true);
  const [showEffectsTemp, setShowEffectsTemp] = useState(false); // 추가된 상태

  const showEffects = useSelector(selectShowEffects);
  const detection = useSelector((state: RootState) => state.detection);
  const dispatch = useDispatch();
  const ourImageSrc = useImageSrc();
  const ourImageAttack = useImageAttack();
  const ourImageEffect = useImageEffect();
  const useImageRandom = RandomBack();
  const [mySession, setMySession] = useState<any>(null);

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

  const sendMessage = (msgdata : string, msgtype : string) => {
    if(mySession != null){
      mySession.signal({
        data: msgdata,  // Any string (optional)
        to: [],                     // Array of Connection objects (optional. Broadcast to everyone if empty)
        type: msgtype             // The type of message (optional)
      }).then(() => {
        console.log('Message successfully sent');
      }).catch((error:any) => {
        console.error(error);
      });
    }
    else{
      console.log('No session');
    }
  }

  useEffect(() => {
    if (showEffects) {
      
      // 관전자들에게 공격 여부 메시지를 전송
      sendMessage('true', 'attack-state');

      // 애니메이션 시간(여기서는 2초) 후에 showEffects 상태를 다시 false로 설정
      const animationTimeout = setTimeout(() => {
        dispatch(setShowEffects(false));
        // 공격 종료 메시지 전송
        sendMessage('false', 'attack-state');
      }, 1500);
      console.log(showEffects)

      return () => clearTimeout(animationTimeout);
    }
  }, [showEffectsTemp]);


  useEffect(() => {
    console.log(mySession);
  }, [mySession]);

  return (
    <div className="Multi-play-page">

      {/* 멀티모드에서 자기 화면 보이게 */}
      <div className="My-play-page">
        <M_OpenViduComponent onObjectCreated={handleMySession} {...commonProps}/>
      </div>

      {/* 멀티모드 애니메이션 */}
      {/* <div className="images-container">
        {showImages && (
          <div className="images">
            <img src={useImageRandom} alt="" className="overlay-image" />
            <img
              src={showEffects ? ourImageAttack : ourImageSrc}
              alt=""
              className={`ours-image ${showImages ? "" : "hidden"}`}
              id="oursImage"
            />
            <ProgressBar className="progress-bar" completed={hitPoints}/>
            <img
              src={showEffects ? OthersAfterAttack : Others}
              alt=""
              className={`others-image ${showImages ? "" : "hidden"}`}
              id="othersImage"
            />
          </div>
        )}
        {showEffects && (
          <img src={ourImageEffect} alt="" className="effects-image" />
        )}
      </div> */}
    </div>
  );


};

export default MultiPlayPage;