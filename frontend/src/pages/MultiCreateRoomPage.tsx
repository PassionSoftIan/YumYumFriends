import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import useSoundEffect from "../hooks/useSoundEffect";
import Button from "../components/Common/Button";
import styles from "./styles/MultiCreateRoomPage.module.css";

const MultiCreateRoomPage: React.FC = () => {
  const UserID = localStorage.getItem("id");
  const storedNickname = localStorage.getItem("nickname");
  const UserName = storedNickname
    ? storedNickname.replace(/['"]+/g, "")
    : "null";
  const GameType = "Multi";
  const URL = "https://yumyumfriends.site";
  const [showWarning, setShowWarning] = useState(false);
  const soundEffectOn = useSelector(
    (state: RootState) => state.soundEffect.soundEffectOn
  );

  const navigate = useNavigate();

  const [password, setPassword] = useState(""); // 비밀번호 입력값을 상태로 관리

  const alertSoundSource = require("../assets/sound/alert.mp3");
  const alertSound = useSoundEffect(alertSoundSource, 0.3);


  const handlePlayAction = () => {
    navigate(
      `/multiplay?SessionID=${UserID}&HostInfo=${UserName}&GameType=${GameType}`
    );
  };

  const handleCreateAction = () => {
    const sendPasswordToServer = () => {
      axios
        .post(`${URL}/api/v1/session?session_id=${UserID}&password=${password}`)
        .then((response) => {
          console.log(response.data);
          if (response.data) {
            axios
              .put(
                `${URL}/api/v1/session/enter?session_id=${UserID}&password=${password}`
              )
              .then((response) => {
                console.log(response.data);
                if (response.data) {
                  handlePlayAction();
                }
              })
              .catch((error) => console.log(error));
          }
        })
        .catch((error) => console.log(error));
    };

    if (password === "") {
      if (soundEffectOn) {
        alertSound.play();
      }
      setShowWarning(true);
      return;
    }

    sendPasswordToServer();
  };

  return (
    <div className={styles["create-card"]}>
      <div className={styles["create-input"]}>
        <p>비밀번호 설정하기</p>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setShowWarning(false); // 입력 중일 때 경고 문구 감추기
          }}
        />
        {showWarning && (
          <p className={styles["warning-text"]}>비밀번호를 입력해주세요.</p>
        )}
      </div>
      <Button
        onClick={handleCreateAction}
        className={`${styles["create-button"]} ${
          showWarning ? styles["disabled"] : ""
        }`}
      >
        <span>방 만들기</span>
      </Button>
    </div>
  );
};

export default MultiCreateRoomPage;
