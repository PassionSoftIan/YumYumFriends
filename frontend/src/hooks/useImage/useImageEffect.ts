import { useState, useEffect } from "react";
import A from "../../assets/myCharEffect/1.png"
import B from "../../assets/myCharEffect/2.png"
import G from "../../assets/myCharEffect/7.png"
import J from "../../assets/myCharEffect/10.png"
import L from "../../assets/myCharEffect/12.png"
import M from "../../assets/myCharEffect/13.png"


const useImageAttack = () => {
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

export default useImageAttack;
