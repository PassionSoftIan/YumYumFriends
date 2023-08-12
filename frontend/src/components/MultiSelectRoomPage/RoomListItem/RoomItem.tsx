import React from "react";
import styles from '../../styles/MultiPlayPage/RoomItem.module.css'

import { useNavigate } from "react-router-dom";

interface RoomItemProps {
  name: string;
  sessionID: string;
}

const RoomItem: React.FC<RoomItemProps> = (props) => {
  const navigate = useNavigate();
  const handleAction = (action: () => void) => {
    action();
  };

  const SessionID = props.sessionID
  const HostInfo = props.name
  const GameType = 'Multi'
  
  return (
    <div>
        <button 
          onClick={() => handleAction(() => navigate(`/multiplay?SessionID=${ SessionID }&HostInfo=${ HostInfo }&GameType=${ GameType }`))}        
          className={styles.item}
        >
          {props.name}
        </button>
    </div>
  );
};

export default RoomItem;
