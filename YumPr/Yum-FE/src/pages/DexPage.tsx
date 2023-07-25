import React from "react";
import "./styles/DexPage.css";
// import yums, { Yum } from "../data/yums";

const DexPage: React.FC = () => {
  return (
    <div className="dex-container">
      {/* <h1 className="dex-title">YumDex</h1>
      <div className="yum-list">
        {yums.map((yum: Yum) => (
          <div key={yum.id} className="yum-card">
            <div className="yum-id">#{yum.id}</div>
            <div className="yum-name">{yum.name}</div>
            <div className="yum-type">{yum.type}</div>
            <img
              className="yum-image"
              src={require(`../assets/StopYums/${yum.name}.png`)}
              alt={yum.type}
            />
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default DexPage;
