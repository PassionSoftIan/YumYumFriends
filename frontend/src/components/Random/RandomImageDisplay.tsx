import React from "react";
import useRandomImage from "../../hooks/RandomChar/useRandomImage";

interface RandomImageDisplayProps {
  folderPath: string;
}

const RandomImageDisplay: React.FC<RandomImageDisplayProps> = ({ folderPath }) => {
  const randomImage = useRandomImage(folderPath);

  if (!randomImage) {
    return <div>Loading...</div>; // 이미지가 로딩 중일 때 표시할 내용
  }

  return (
    <img
      src={randomImage}
      alt="랜덤 이미지"
      style={{ width: "300px", height: "300px" }} // 이미지 크기는 필요에 따라 조정해주세요
    />
  );
};

export default RandomImageDisplay;
