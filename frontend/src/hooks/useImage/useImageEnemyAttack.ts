import { useState, useEffect } from "react";
import A from "../../assets/othersAttack/1.gif";
import B from "../../assets/othersAttack/2.gif";

const useImageEnemyAttack = () => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const currentYumValue = localStorage.getItem("currentYum");
    if (currentYumValue !== null) {
      const alphabetIndex = parseInt(currentYumValue, 10);
      let dynamicImageSrc = "";

      // Set image based on whether currentYumValue is odd or even
      if (alphabetIndex % 2 === 0) {
        dynamicImageSrc = A;
      } else {
        dynamicImageSrc = B;
      }

      setImageSrc(dynamicImageSrc);
      console.log("Current Yum:", currentYumValue, "Alphabet:", dynamicImageSrc);
    } else {
      console.log("currentYum value not found in local storage.");
      setImageSrc(A);
    }
  }, []);

  return imageSrc;
};

export default useImageEnemyAttack;
