import React from "react";
import RoomItem from "./RoomItem";

const RoomList: React.FC = () => {
  const roomList = ["냠 1", "냠 2", "냠 3"];

  return (
    <div>
      <h3>RoomList</h3>
      {roomList.map((roomName, index) => (
        <RoomItem key={index} name={roomName} />
      ))}
    </div>
  );
};

export default RoomList;
