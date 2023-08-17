import React, { useEffect, useState, useRef } from "react";
import Carousel from "../Common/Carousel";
import Button from "../Common/Button";
import axios from "axios";
import "../styles/SelectPage/SelectYum.css";
import MessageModal from "../Common/MessageModal";

import { useNavigate } from "react-router-dom";

interface Yum {
  name: string;
  eng: string;
  personality: string;
  strengths: string;
  id: number;
}

const SelectYum: React.FC = () => {
  const [yumList, setYumList] = useState<Yum[]>([]);
  const [allList, setAllList] = useState<Yum[]>([]);
  const [myCurrentYum, setMyCurrentYum] = useState<number | null>(null);
  const URL = "https://yumyumfriends.site";
  const userID = localStorage.getItem("id");
  const centerIndex = useRef(0);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      Promise.all([
        axios.get(`${URL}/api/v1/collection/myyum`, {
          params: { user: userID },
        }),
        axios.get(`${URL}/api/v1/yum/all`),
        axios.get(`${URL}/api/v1/user`, {
          params: { id: userID },
        }),
      ])
        .then(([data1, data2, data3]) => {
          const mylist = data1.data;
          setYumList(mylist);
          const allList1 = data2.data;
          setAllList(allList1);
          const myCurrenYum = data3.data.currentYum;
          setMyCurrentYum(myCurrenYum);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, [userID]);

  const handleSelectedYum = () => {
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
      
        navigate("/main");
        
    } else {
      setShowModal(true);
    }
  };

  const handleCenterIndexChange = (index: any) => {
    centerIndex.current = index;
  };

  return (
    <React.Fragment>
      {showModal && (
        <MessageModal
          message={`아직 친구를 찾지 못했어요. \n냠냠이를 찾은 후 다시 시도해주세요.`}
          buttonMessage="확인"
          onConfirm={() => setShowModal(false)}
        />
      )}
      <div className="ment" style={{ zIndex: 99 }}>
        <h3>함께 할 친구를 골라봐</h3>
      </div>
      <Carousel
        carouselList={yumList}
        allYumList={allList}
        myCurrentYum={myCurrentYum}
        onCenterIndexChange={handleCenterIndexChange}
      />
      <Button onClick={handleSelectedYum}>설정하기</Button>
    </React.Fragment>
  );
};

export default SelectYum;
