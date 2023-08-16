import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../store/store";
import useSoundEffect from "../../../hooks/useSoundEffect";
import axios from "axios";
import Button from "../../Common/Button";
import styles from "../../styles/MultiPlayPage/EnterModal.module.css";

interface EnterModalProps {
  name: string;
  sessionID: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EnterModal: React.FC<EnterModalProps> = (props) => {
  const navigate = useNavigate();
  const URL = "https://yumyumfriends.site";

  const [password, setPassword] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const soundEffectOn = useSelector(
    (state: RootState) => state.soundEffect.soundEffectOn
  );

  const alertSoundSource = require("../../../assets/sound/alert.mp3");
  const alertSound = useSoundEffect(alertSoundSource, 0.3);

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
          props.setShowModal(false);
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
            autoFocus={true}
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
          <Button
            onClick={handleAction}
            className={`${styles["enter-button"]} ${
              showWarning ? styles["disabled"] : ""
            }`}
          >
            입장하기
          </Button>
        </footer>
      </div>
    );
  };

  return (
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
  );
};

export default EnterModal;
