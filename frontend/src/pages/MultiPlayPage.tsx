import React, { useState, useEffect } from "react";


const MultiPlayPage: React.FC = () => {
  const urlSearch = new URLSearchParams(window.location.search);
  const sessionID = urlSearch.get("SessionID");
  const hostInfo = urlSearch.get("HostInfo");
  const gameType = urlSearch.get("GameType");

  // console.log(sessionID);
  // console.log(hostInfo);
  // console.log(gameType);

  return (
    <div>
      {/* 애니메이션 */}
    </div>
  );
};
export default MultiPlayPage;