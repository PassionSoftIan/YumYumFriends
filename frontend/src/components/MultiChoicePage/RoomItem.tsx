import React from "react";
import styles from '../styles/MultiPlayPage/RoomItem.module.css'

interface RoomItemProps {
  name: string;
}

const RoomItem: React.FC<RoomItemProps> = (props) => {
  return (
    <div>
        <button className={styles.item}>{props.name}</button>
    </div>
  );
};

export default RoomItem;
