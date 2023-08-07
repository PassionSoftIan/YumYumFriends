import React from "react";
import Carousel from "../Common/Carousel";
import Button from "../Common/Button";
import { useFetch } from "../../hooks/useFetch";
import { string } from "@tensorflow/tfjs";

// import yums, { Yum } from "../../data/yums ";

const SelectYum: React.FC = () => {
  const acquiredYumIds = [1, 2, 4]; 

  const handleSelectedYum = () => {
    console.log('유저의 대표냠 설정 요청 보내기')
  }

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
      <Button onClick={handleSelectedYum}>설정하기</Button>
    </React.Fragment>
  );
};

export default SelectYum;
