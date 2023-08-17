import React, { useState } from "react";
import styles from "../../styles/MultiPlayPage/RoomItem.module.css";
import EnterModal from "./EnterModal";

interface RoomItemProps {
  name: string;
  sessionID: string;
}

const RoomItem: React.FC<RoomItemProps> = (props) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <div>
      <div className={styles.item} onClick={handleClick}>
        <p className={styles["item-name"]}>
          {props.name}
        </p>
        <img
          className={styles["lock-icon"]}
          src={require(`../../../assets/Common/lock.png`)}
          alt=""
        />
      </div>
      {showModal && (
        <EnterModal
          name={props.name}
          sessionID={props.sessionID}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default RoomItem;
