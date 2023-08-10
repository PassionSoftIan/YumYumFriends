import { useState, useEffect } from "react";
import A from "../../assets/myChar/1.gif"
import B from "../../assets/myChar/2.gif"
import G from "../../assets/myChar/7.gif"
import J from "../../assets/myChar/10.gif"
import L from "../../assets/myChar/12.gif"
import M from "../../assets/myChar/13.gif"


const useImageSrc = () => {
  const [imageSrc, setImageSrc] = useState(""); // 초기값은 빈 문자열로 설정

  useEffect(() => {
    const currentYumValue = localStorage.getItem("currentYum");
    if (currentYumValue !== null) {
      let dynamicImageSrc = ""; // 동적으로 설정할 이미지 경로 변수
      const alphabetIndex = parseInt(currentYumValue, 10); // currentYum을 정수로 변환
      
      // 알파벳에 해당하는 이미지 경로 설정
      switch (alphabetIndex) {
        case 1:
          dynamicImageSrc = A;
          break;
        case 2:
          dynamicImageSrc = B;
          break;
        case 7:
          dynamicImageSrc = G;
          break;
        case 10:
          dynamicImageSrc = J;
          break;
        case 12:
          dynamicImageSrc = L;
          break;
        case 13:
          dynamicImageSrc = M;
          break;
        // ... 다른 알파벳에 대한 케이스 추가
        default:
          dynamicImageSrc = A; // 기본 이미지 경로 설정
          break;
      }
      
      setImageSrc(dynamicImageSrc);
      console.log("Current Yum:", currentYumValue, "Alphabet:", dynamicImageSrc);
    } else {
      console.log("currentYum value not found in local storage.");
      // currentYum 값이 없을 경우에 기본 이미지 경로 설정
      setImageSrc(A);
    }
  }, []);

  return imageSrc;
};

export default useImageSrc;
