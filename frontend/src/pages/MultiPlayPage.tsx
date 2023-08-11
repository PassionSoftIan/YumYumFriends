import React, { useState } from "react";
import Button from "../components/Common/Button";
import CreateRoom from "../components/MultiPlayPage/CreateRoom";
import SelectRoom from "../components/MultiPlayPage/SelectRoom";
import '../pages/styles/MultiPlayPage.css';

const MultiPlayPage: React.FC = () => {
  const [showButtons, setShowButtons] = useState(true);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [showSelectRoom, setShowSelectRoom] = useState(false);

  
  const handleAction = (action: () => void) => {
    const buttons = document.querySelectorAll('.multi-button');

    buttons.forEach((button, index) => {
      setTimeout(() => {
        button.classList.add("hide");
      }, index * 150);
    });

    setTimeout(() => {
      action();
      buttons.forEach(button => {
        button.classList.remove("hide");
      });
    }, buttons.length * 150 + 500);
  };
  
  const handleCreateRoomClick = () => {
    setShowButtons(false);
    setShowCreateRoom(true);
  };

  const handleSelectRoomClick = () => {
    setShowButtons(false);
    setShowSelectRoom(true);
  };

  return (
    <div className="multi-play-page">
      {showButtons && (
        <div>
          <Button onClick={() => handleAction(handleCreateRoomClick)} className='multi-button'>
            <span>Create Room</span>
          </Button>
          <Button onClick={() => handleAction(handleSelectRoomClick)} className='multi-button'>
            <span>Select Room</span>
          </Button>
        </div>
      )}
      {showCreateRoom && <CreateRoom />}
      {showSelectRoom && <SelectRoom />}
    </div>
  );
};

export default MultiPlayPage;
