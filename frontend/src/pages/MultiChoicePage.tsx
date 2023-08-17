import React from "react";
import Button from "../components/Common/Button";

import { useNavigate } from "react-router-dom";

const MultiChoicePage: React.FC = () => {
  const navigate = useNavigate();
  const handleSelectAction = (action: () => void) => {
    action();
  };

  return (
    <div className="multi-play-page">
      <Button
        onClick={(
        ) => handleSelectAction(() => navigate('/multicreate'))}
        className="game-button button-second"
      >
        <span style={{fontSize:"2rem"}}>방 만들기</span>
      </Button>

      <Button
        onClick={() => handleSelectAction(() => navigate("/multiroom"))}
        className="game-button button-second"
      >
        <span style={{fontSize:"2rem"}}>놀러가기</span>
      </Button>
    </div>
  );
};

export default MultiChoicePage;
