import React from "react";
import styles from '../../styles/MultiPlayPage/RoomItem.module.css'

import { useNavigate } from "react-router-dom";

interface RoomItemProps {
  name: string;
}

const RoomItem: React.FC<RoomItemProps> = (props) => {
  const navigate = useNavigate();
  const handleAction = (action: () => void) => {
    action();
  };

  const SessionID = 'aa'
  const HostInfo = 'bb'
  
  return (
    <div>
        <button 
          onClick={() => handleAction(() => navigate(`/multiplay?SessionID=${ SessionID }&HostInfo=${ HostInfo }`))}        
          className={styles.item}
        >
          {props.name}
        </button>
    </div>
  );
};

export default RoomItem;
