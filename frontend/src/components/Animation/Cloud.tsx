import React from "react";
import "../styles/Animation/Cloud.css";
import Clo from "../../assets/Common/cloud.png";
import { div } from "@tensorflow/tfjs";

const Cloud: React.FC = () => {
  return (
    <div>
      <div className="cloud">
        <img src={Clo} alt="" style={{ width: "150px" }} />{" "}
      </div>
      <div className="cloud_2">
        <img src={Clo} alt="" style={{ width: "150px" }} />{" "}
      </div>
    </div>
  );
};

export default Cloud;
