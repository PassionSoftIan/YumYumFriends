import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import useImageSrc from "../hooks/useImage/useImageSrc";
import useImageAttack from "../hooks/useImage/useImageAttack";
import useImageEffect from "../hooks/useImage/useImageEffect";
import { setShowEffects, selectShowEffects } from "../store/showEffectsSlice";
import "./styles/SinglePlayPage.css";
import OpenViduComponent from "../components/OpenVidu/OpenViduComponent";
import BackImg from "../assets/playback.png";
import Ours from "../assets/before_fight/01_tofu_stand.gif";
import OursAttack from "../assets/AttackingYums/01_tofu_attack.gif";
import Others from "../assets/before_fight/32_germ_standing.gif";
import OthersAfterAttack from "../assets/Attacked/32_germ_attacked.gif";

const SinglePlayPage: React.FC = () => {
  const [showImages, setShowImages] = useState(true);
  const showEffects = useSelector(selectShowEffects); // Use the corrected selector
  const dispatch = useDispatch();
  const ourImageSrc = useImageSrc();
  const ourImageAttack = useImageAttack();
  const ourImageEffect = useImageEffect();
  const [mySession, setMySession] = useState<any>(null);
  const handleMySession = (obj:any) => { setMySession(obj); };

  // 이미지들이 닿았을 때 처리하는 함수
  const handleImageTouch = () => {
    setShowImages(false);
    // 버튼 클릭 시 리덕스 액션을 호출하여 showEffects 상태를 토글
    dispatch(setShowEffects(!showEffects));
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
  }, [showEffects, dispatch]);

  // showEffects 상태가 변경될 때 애니메이션 시작
  useEffect(() => {
    if (showEffects) {
      
      // 관전자들에게 공격 여부를 전송, showEffects(아마 true/false) 값을 전달
      if(mySession != null){
        mySession.signal({
          data: true,  // Any string (optional)
          to: [],                     // Array of Connection objects (optional. Broadcast to everyone if empty)
          type: 'attack-state'             // The type of message (optional)
        }).then(() => {
          console.log('Message successfully sent');
        }).catch((error:any) => {
          console.error(error);
        });
      }

      // 애니메이션 시간(여기서는 2초) 후에 showEffects 상태를 다시 false로 설정
      const animationTimeout = setTimeout(() => {
        dispatch(setShowEffects(false));
        if(mySession != null){
          mySession.signal({
            data: false,  // Any string (optional)
            to: [],                     // Array of Connection objects (optional. Broadcast to everyone if empty)
            type: 'attack-state'             // The type of message (optional)
          }).then(() => {
            console.log('Message successfully sent');
          }).catch((error:any) => {
            console.error(error);
          });
        }
      }, 1500);
      console.log(showEffects)

      return () => clearTimeout(animationTimeout);
    }
  }, [showEffects, dispatch]);

  useEffect(() => {
    console.log(mySession);
  }, [mySession]);

  return (
    <div className="single-play-page">
      <OpenViduComponent onObjectCreated= {handleMySession} />
      <div className="images-container">
        {showImages && (
          <div className="images">
            <img src={BackImg} alt="" className="overlay-image" />
            <img
              src={showEffects ? ourImageAttack : ourImageSrc}
              alt=""
              className={`ours-image ${showImages ? "" : "hidden"}`}
              id="oursImage"
            />

            <img
              src={
                showEffects ? OthersAfterAttack : Others
              } /* 애니메이션이 종료되면 OthersAfterAttack 이미지로 바꿔줌 */
              alt=""
              className={`others-image ${showImages ? "" : "hidden"}`}
              id="othersImage"
            />
          </div>
        )}
        {showEffects && (
          <img src={ourImageEffect} alt="" className="effects-image" />
        )}
      </div>
    </div>
  );
};

export default SinglePlayPage;
