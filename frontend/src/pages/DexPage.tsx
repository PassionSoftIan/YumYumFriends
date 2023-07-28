import React from "react";
import { Link } from "react-router-dom";
import "./styles/DexPage.css";
import yums, { Yum } from "../data/yums ";

const DexPage: React.FC = () => {
  // Assuming you have a state or variable that keeps track of acquired Yums' IDs
  const acquiredYumIds = [1, 2, 4]; // Example array of acquired Yum IDs

  return (
    <div className="dex-container">
      <h1 className="dex-title">YumDex</h1>
      <div className="yum-list">
        {yums.map((yum: Yum) => (
          <Link
            key={yum.id}
            to={`/dexdetail/${yum.id}`}
            className={`yum-link${acquiredYumIds.includes(yum.id) ? "" : " locked"}`}
          >
            {/* Wrap the content of each yum card with the Link component */}
            <div className={`yum-card${acquiredYumIds.includes(yum.id) ? "" : " locked"}`}>
              <div className="yum-id">#{yum.id}</div>
              <div className="yum-name">{yum.name}</div>
              <div className="yum-type">{yum.type}</div>
              <img
                className="yum-image"
                src={require(`../assets/StopYums/${yum.name}.png`)} // Add .default here for the require function
                alt={yum.type}
              />
              {!acquiredYumIds.includes(yum.id) && <div className="lock-icon">🔒</div>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DexPage;
