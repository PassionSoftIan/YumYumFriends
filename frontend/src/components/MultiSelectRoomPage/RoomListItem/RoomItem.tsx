import React, { useState } from "react";
import { useSelector } from "react-redux";
import ReactDOM from "react-dom";
import { RootState } from "../../../store/store";
import useSoundEffect from "../../../hooks/useSoundEffect";
import styles from "../../styles/MultiPlayPage/RoomItem.module.css";
import axios from "axios";
import Button from "../../Common/Button";

import { useNavigate } from "react-router-dom";

interface RoomItemProps {
  name: string;
  sessionID: string;
}

const RoomItem: React.FC<RoomItemProps> = (props) => {
  const navigate = useNavigate();
  const URL = "https://yumyumfriends.site";

  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const soundEffectOn = useSelector(
    (state: RootState) => state.soundEffect.soundEffectOn
  );

  const alertSoundSource = require("../../../assets/sound/alert.mp3");
  const alertSound = useSoundEffect(alertSoundSource, 0.3);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleAction = () => {
    if (password.length === 0) {
      if (soundEffectOn) {
        alertSound.play();
      }
      setIsEmpty(true);
      return;
    }

    axios
      .put(
        `${URL}/api/v1/session/enter?session_id=${props.sessionID}&password=${password}`
      )
      .then((response) => {
        if (response.data === false) {
          if (soundEffectOn) {
            alertSound.play();
          }

          setShowWarning(true);
          return;
        }
        if (response.data) {
          navigate(
            `/multiplay?SessionID=${props.sessionID}&HostInfo=${props.name}&GameType=Multi`
          );
        }
      })
      .catch((error) => console.log(error));
  };

  const Backdrop: React.FC = () => {
    return (
      <div
        className={styles.backdrop}
        onClick={() => {
          setShowModal(false);
        }}
      />
    );
  };

  const ModalOverlay: React.FC = () => {
    return (
      <div className={styles.modal}>
        <div className={styles.content}>
          <p>{props.name}의 방에 놀러가기</p>
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setIsEmpty(false);
              setShowWarning(false);
            }}
          />
        </div>
        {isEmpty && <p className={styles.warning}>비밀번호를 입력하세요.</p>}
        {showWarning && (
          <p className={styles.warning}>비밀번호를 확인하세요.</p>
        )}
        <footer className={styles.actions}>
          <Button onClick={handleAction}>입장하기</Button>
        </footer>
      </div>
    );
  };

  return (
    <div>
      <div className={styles.item} onClick={handleClick}>
        <p className={styles["item-yum"]}>🍆</p>
        <p className={styles["item-name"]}>
          {props.name}
          <span>여기 쓸거 뭐있지</span>
        </p>
        <img
          className={styles["lock-icon"]}
          src={require(`../../../assets/Common/lock.png`)}
          alt=""
        />
      </div>
      {showModal && (
        <React.Fragment>
          {ReactDOM.createPortal(
            <Backdrop />,
            document.getElementById("backdrop-root")!
          )}
          {ReactDOM.createPortal(
            <ModalOverlay />,
            document.getElementById("overlay-root")!
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default RoomItem;
