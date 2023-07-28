import React from "react";
import { useParams } from "react-router-dom";
import "./styles/DexDetailPage.css";
import yums, { Yum } from "../data/yums ";

const DexDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const selectedId = id ? parseInt(id) : NaN;
  const selectedYum: Yum | undefined = yums.find((yum) => yum.id === selectedId);

  // Assuming you have a state or variable that keeps track of acquired Yums' IDs
  const acquiredYumIds = [1, 2, 4]; // Example array of acquired Yum IDs

  if (!selectedYum) {
    return <div className="error-message">Yum not found</div>;
  }

  // Check if the selected yum is acquired
  const isAcquired = acquiredYumIds.includes(selectedYum.id);

  return (
    <div className="dex-detail-container">
      <h1 className="yum-name">{selectedYum.name}</h1>
      <div className="yum-details">
        <div className={`yum-image-container${isAcquired ? "" : " locked"}`}>
          <img
            className={`yum-image${isAcquired ? "" : " locked"}`}
            src={require(`../assets/StopYums/${selectedYum.name}.png`)}
            alt={selectedYum.name}
          />
          {!isAcquired && <div className="lock-icon">🔒</div>}
        </div>
        <div className={`yum-info${isAcquired ? "" : " locked"}`}>
          <p className="yum-id">#{selectedYum.id}</p>
          <p className="yum-type">Type: {selectedYum.type}</p>
          <div className="yum-personality">
            <p>Personality:</p>
            <p>{selectedYum.personality}</p>
          </div>
          <div className="yum-strengths">
            <p>Strengths:</p>
            <p>{selectedYum.strengths}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DexDetailPage;
