import React, { useState } from "react";
import Button from "../components/Common/Button";
import CreateRoom from "../components/MultiPlayPage/CreateRoom";
import SelectRoom from "../components/MultiPlayPage/SelectRoom";

const MultiPlayPage: React.FC = () => {
  const [showButtons, setShowButtons] = useState(true);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [showSelectRoom, setShowSelectRoom] = useState(false);

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
          <Button onClick={handleCreateRoomClick}>
            <span>Create Room</span>
          </Button>
          <Button onClick={handleSelectRoomClick}>
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
