import React from "react";
import Carousel from "../Common/Carousel";

import yums, { Yum } from "../../data/yums ";

const SelectYum: React.FC = () => {
  const acquiredYumIds = [1, 2, 4]; // Example array of acquired Yum IDs

  return (
    <React.Fragment>
      <h3>함께 할 친구를 골라봐</h3>
      {/* 여기에 캐릭터 선택 캐러셀 넣을거임 */}
      <Carousel carouselList={[
        "1_tofu",
        "2_mandarin",
        "3_hamburger",
        "4_icecream",
        "5_radish"
      ]} />
    </React.Fragment>
  );
};

export default SelectYum;
