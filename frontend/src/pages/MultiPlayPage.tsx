<<<<<<< HEAD
import React from "react";
=======
import React, { useState } from "react";
import Button from "../components/Common/Button";
import CreateRoom from "../components/MultiPlayPage/CreateRoom";
import SelectRoom from "../components/MultiPlayPage/SelectRoom";
>>>>>>> c10fbf7dbd37d7d391fdc57850935f545f1ca714

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
        {/* 여기에 게임 컨텐츠를 추가하세요 */}
        {/* 예를 들어 게임 컴포넌트와 게임 로직을 추가할 수 있습니다 */}
        {/* 이 주석을 실제 게임 컨텐츠로 대체하세요 */}
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
