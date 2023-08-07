import React, { useEffect, useState } from "react";
import Carousel from "../Common/Carousel";
import Button from "../Common/Button";
import axios from "axios";

// import yums, { Yum } from "../../data/yums ";

const SelectYum: React.FC = () => {
  const [yumList, setYumList] = useState([]);
  const URL = "https://yumyumfriends.site";
  const userID = localStorage.getItem("id");

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`${URL}/api/v1/collection/myyum`, { params: { user: userID } })
        .then((data) => {
          const mylist = data.data;
          setYumList(mylist);
          // console.log(yumList);
        })
        .catch((err) => console.log("실패"));
    };
    fetchData();
  }, []);

  const handleSelectedYum = () => {
    console.log("유저의 대표냠 설정 요청 보내기");
  };

  return (
    <React.Fragment>
      <h3>함께 할 친구를 골라봐</h3>
      {/* 여기에 캐릭터 선택 캐러셀 넣을거임 */}
      <Carousel carouselList={yumList} />
      <Button onClick={handleSelectedYum}>설정하기</Button>
    </React.Fragment>
  );
};

export default SelectYum;
