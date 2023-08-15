import { useEffect, useState } from "react";

// 최소(min)와 최대(max) 사이의 랜덤 정수를 얻는 함수
const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const useRandomImage = (folderPath: string) => {
  const [randomImage, setRandomImage] = useState<string | null>(null);

  useEffect(() => {
    // 폴더 내 이미지 파일 목록을 가져오는 함수
    const fetchImages = async () => {
      try {
        const response = await fetch(folderPath);

        if (!response.ok) {
          throw new Error("이미지 불러오기 실패");
        }

        const fileListText = await response.text();
        // 이미지 파일 목록을 줄 단위로 분할하여 배열로 만듭니다.
        const fileList = fileListText.split("\n");
        const randomIndex = getRandomInt(0, fileList.length);
        const randomImageName = fileList[randomIndex].trim(); // 공백 제거

        // 랜덤한 이미지 URL 생성
        setRandomImage(`${folderPath}/${randomImageName}`);
      } catch (error) {
        console.error("이미지 불러오기 오류: ", error);
      }
    };

    fetchImages();
  }, [folderPath]);

  return randomImage;
};

export default useRandomImage;
