import React from "react";
import Carousel from "../Common/Carousel";
import Button from "../Common/Button";
<<<<<<< HEAD

=======
import axios from "axios";
import "../styles/SelectPage/SelectYum.css";
>>>>>>> b18abe14fae29705ef0ff6d4c6d6be8b87d5e0e5
// import yums, { Yum } from "../../data/yums ";

const SelectYum: React.FC = () => {
  const acquiredYumIds = [1, 2, 4]; 

  const handleSelectedYum = () => {
<<<<<<< HEAD
    console.log('유저의 대표냠 설정 요청 보내기')
  }
=======
    const idx = centerIndex.current;
    const checkMyYum = yumList.some((item) => item.id === allList[idx].id);
    if (checkMyYum) {
      axios
        .put(`${URL}/api/v1/user/setyum?user=${userID}&yum=${allList[idx].id}`)
        .then((data) => {
          console.log(data);
          localStorage.setItem("currentYum", `${allList[idx].id}`);
        })
        .catch((err) => console.log(err));
    } else {
      alert("마 니가 있는 캐릭터만 써라 자물쇠안보이나");
    }
  };

  const handleCenterIndexChange = (index: any) => {
    centerIndex.current = index;
    // console.log(centerIndex.current);
  };
>>>>>>> 9d70f7e639a6f2f6d484a65906fb0e114b91ba9e

  return (
    <React.Fragment>
<<<<<<< HEAD
      <h3>함께 할 친구를 골라봐</h3>
      {/* 여기에 캐릭터 선택 캐러셀 넣을거임 */}
      <Carousel carouselList={[
        "1_tofu",
        "2_mandarin",
        "3_hamburger",
        "4_icecream",
        "5_radish"
      ]} />
=======
      <div className="ment">
        <h3>함께 할 친구를 골라봐</h3>
      </div>
      <Carousel
        carouselList={yumList}
        allYumList={allList}
        myCurrentYum={myCurrentYum}
        onCenterIndexChange={handleCenterIndexChange}
      />
>>>>>>> b18abe14fae29705ef0ff6d4c6d6be8b87d5e0e5
      <Button onClick={handleSelectedYum}>설정하기</Button>
    </React.Fragment>
  );
};

export default SelectYum;
