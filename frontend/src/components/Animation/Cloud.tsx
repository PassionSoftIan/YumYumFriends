import React from "react";
import "../styles/Animation/Cloud.css";
import Clo from "../../assets/Common/cloud.png";

const Cloud: React.FC = () => {
  return (
    <div>
      <div className="cloud-container">
        <div className="cloud">
          <img src={Clo} alt="" style={{ width: "150px" }} />{" "}
        </div>
        <div className="cloud_2">
          <img src={Clo} alt="" style={{ width: "150px" }} />{" "}
        </div>
      </div>
    </div>
  );
};

export default Cloud;
