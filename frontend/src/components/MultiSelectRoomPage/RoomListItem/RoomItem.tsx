import React, { useState } from "react";
import ReactDOM from "react-dom";
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

  const [password, setPassword] = useState(""); // 비밀번호 입력값을 상태로 관리
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleAction = () => {
    axios
      .put(
        `${URL}/api/v1/session/enter?session_id=${props.sessionID}&password=${password}`
      )
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          // 비밀번호 검증 후 성공 시 페이지 이동
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <footer className={styles.actions}>
          <Button onClick={handleAction}>입장하기</Button>
        </footer>
      </div>
    );
  };

  return (
    <div>
      <div className={styles.item} onClick={handleClick}>
        <p className={styles["item-yum"]}>냠냠이</p>
        <p className={styles["item-name"]}>{props.name}</p>
        <img
          className={styles["lock-icon"]}
          src={require(`../../../assets/Common/lock.png`)}
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
