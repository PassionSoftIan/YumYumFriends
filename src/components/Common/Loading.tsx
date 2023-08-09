import React from "react";
import { HashLoader } from "react-spinners";

const Loading: React.FC = () => {
  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "rgba(0, 0, 0, 0)",
        }}
      >
        <HashLoader
          color="#ff9494"
        />
      </div>
    </div>
  );
};

export default Loading;
