import React from "react";
import { Link } from "react-router-dom";
import "./styles/DexPage.css";
import yums, { Yum } from "../data/yums ";

const DexPage: React.FC = () => {
  return (
    <div className="dex-container">
      <h1 className="dex-title">YumDex</h1>
      <div className="yum-list">
        {yums.map((yum: Yum) => (
          <Link key={yum.id} to={`/dexdetail/${yum.id}`} className="yum-link">
            {/* Wrap the content of each yum card with the Link component */}
            <div className="yum-card">
              <div className="yum-id">#{yum.id}</div>
              <div className="yum-name">{yum.name}</div>
              <div className="yum-type">{yum.type}</div>
              <img
                className="yum-image"
                src={require(`../assets/StopYums/${yum.name}.png`)} // Add .default here for the require function
                alt={yum.type}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DexPage;
