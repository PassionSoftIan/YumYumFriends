import React from "react";
import { useParams } from "react-router-dom";
import "./styles/DexDetailPage.css";
import yums, { Yum } from "../data/yums ";

const DexDetailPage: React.FC = () => {
  // Get the selected yum's ID from the URL
  const { id } = useParams<{ id: string | undefined }>();

  // Check if the id is valid and convert it to a number
  const selectedId = id ? parseInt(id) : NaN;

  // Find the selected yum object from the yums array
  const selectedYum: Yum | undefined = yums.find((yum) => yum.id === selectedId);

  // If the selected yum is not found or the id is not valid, display an error message
  if (!selectedYum) {
    return <div className="error-message">Yum not found</div>;
  }

  return (
    <div className="dex-detail-container">
      <h1 className="yum-name">{selectedYum.name}</h1>
      <div className="yum-details">
        <div className="yum-image-container">
          <img
            className="yum-image"
            src={require(`../assets/StopYums/${selectedYum.name}.png`)}
            alt={selectedYum.name}
          />
        </div>
        <div className="yum-info">
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
