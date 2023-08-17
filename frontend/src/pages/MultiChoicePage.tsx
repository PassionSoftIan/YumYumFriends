import React from "react";
import Button from "../components/Common/Button";

import { useNavigate } from "react-router-dom";

const MultiChoicePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="multi-play-page">
      <Button onClick={() => navigate("/multicreate")}>
        <span style={{ fontSize: "2rem", color: "#fff2db" }}>방 만들기</span>
      </Button>

      <Button onClick={() => navigate("/multiroom")}>
        <span style={{ fontSize: "2rem", color: "#fff2db" }}>놀러가기</span>
      </Button>
    </div>
  );
};

export default MultiChoicePage;
