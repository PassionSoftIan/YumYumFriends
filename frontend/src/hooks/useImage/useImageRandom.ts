import { useState, useEffect } from "react";

const useImageRandom = () => {
  const [imageSrc, setImageSrc] = useState<string>(""); // Specify type as string
  const totalImageCount = 1; // 전체 이미지 파일의 개수
  const imageExtension = ".png"; // 이미지 파일의 확장자

  useEffect(() => {
    // 랜덤한 인덱스 생성
    const randomIndex = Math.floor(Math.random() * totalImageCount) + 1; // 1부터 시작
    const randomImageFileName = `${randomIndex}${imageExtension}`;

    // 이미지 파일의 경로 설정
    const randomImagePath = require(`../../assets/fightClub/${randomImageFileName}`);
    
    // 이미지 파일의 경로 설정
    setImageSrc(randomImagePath);
  }, []);

  return imageSrc;
};

export default useImageRandom;
