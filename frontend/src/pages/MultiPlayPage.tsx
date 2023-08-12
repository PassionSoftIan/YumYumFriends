<<<<<<< HEAD
import React from "react";
<<<<<<< HEAD
=======
import React, { useState } from "react";
import Button from "../components/Common/Button";
import CreateRoom from "../components/MultiPlayPage/CreateRoom";
import SelectRoom from "../components/MultiPlayPage/SelectRoom";
>>>>>>> c10fbf7dbd37d7d391fdc57850935f545f1ca714
=======
import VideoChat from "../components/MultiVidu/VideoChat";
>>>>>>> 5fe25c1f62622c409cbce073f158a2d2d85b3b77

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
<<<<<<< HEAD
      <div className="video-container">{/* <OpenViduComponent /> */}</div>
      <div className="game-container">
      <VideoChat />
      </div>
=======
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
>>>>>>> c10fbf7dbd37d7d391fdc57850935f545f1ca714
    </div>
  );
};

export default MultiPlayPage;
