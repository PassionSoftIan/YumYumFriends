import React, { useState, useRef, useEffect } from "react";
import CarouselItem from "./CarouselItem";
import styles from "../styles/Common/Carousel.module.css";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

interface CarouselItemType {
  name: string;
  eng: string;
  personality: string;
  strengths: string;
  id: number;
}

interface Props {
  carouselList: CarouselItemType[];
  allYumList: CarouselItemType[];
  onCenterIndexChange: (index: number) => void;
  myCurrentYum: any;
}

interface SlideChangedEvent {
  item: number;
  slide: number;
}

const Carousel: React.FC<Props> = (props) => {
  const presentYum = localStorage.getItem("currentYum");
  const centerIndex = useRef(Number(presentYum));
  const currentPersonality = useRef("");
  const currentStrengths = useRef("");
  const currentName = useRef("");
  const personalityDivRef = useRef<HTMLDivElement>(null);
  const strengthsDivRef = useRef<HTMLDivElement>(null);
  const nameDivRef = useRef<HTMLDivElement>(null);

  const responsive = {
    0: {
      items: 3,
    },
  };
  const items = props.allYumList.map((item, idx) => {
    return (
      <CarouselItem
        key={idx}
        yum={item}
        carouselList={props.carouselList}
        allYumList={props.allYumList}
      />
    );
  });

  useEffect(() => {
    if (props.myCurrentYum !== undefined && props.allYumList.length > 0) {
      let cur = props.myCurrentYum;
      cur = cur - 1;
      currentPersonality.current = props.allYumList[cur].personality;
      currentStrengths.current = props.allYumList[cur].strengths;
      currentName.current = props.allYumList[cur].name;

      if (personalityDivRef.current) {
        personalityDivRef.current.innerHTML = `🌷: ${currentPersonality.current}`;
      }

      if (strengthsDivRef.current) {
        strengthsDivRef.current.innerHTML = `🌼: ${currentStrengths.current}`;
      }

      if (nameDivRef.current) {
        nameDivRef.current.innerHTML = `🌻: ${currentName.current}`;
      }
    }
  }, [props.myCurrentYum, props.allYumList]);

  const handleSlideChanged = (e: SlideChangedEvent) => {
    // Calculate the center index in the visible carousel items
    let centerIdx = (e.item % 26) + 1;
    if (centerIdx === 26) {
      centerIdx = 0;
    }
    props.onCenterIndexChange(centerIdx);
    // console.log(centerIndex.current);
    centerIndex.current = centerIdx;
    // console.log(centerIdx);
    const newIndex = centerIndex.current;
    currentPersonality.current = props.allYumList[newIndex].personality;
    currentStrengths.current = props.allYumList[newIndex].strengths;
    currentName.current = props.allYumList[newIndex].name;

    if (personalityDivRef.current) {
      personalityDivRef.current.innerHTML = `🌷: ${currentPersonality.current}`;
    }

    if (strengthsDivRef.current) {
      strengthsDivRef.current.innerHTML = `🌼: ${currentStrengths.current}`;
    }
    if (nameDivRef.current) {
      nameDivRef.current.innerHTML = `🌻: ${currentName.current}`;
    }
  };
  return (
    <>
      <AliceCarousel
        responsive={responsive}
        disableDotsControls
        infinite
        items={items}
        onSlideChanged={handleSlideChanged}
        activeIndex={props.myCurrentYum - 2 >= 0 ? props.myCurrentYum - 2 : 25}
        renderPrevButton={() => (
          <div
            className={styles.prevButton}
            style={{ position: "absolute", left: 0 }}
          >
            <Button type="dashed" shape="circle" icon={<LeftOutlined />} />
          </div>
        )}
        renderNextButton={() => (
          <div
            className={styles.nextButton}
            style={{ position: "absolute", right: 0 }}
          >
            <Button type="dashed" shape="circle" icon={<RightOutlined />} />
          </div>
        )}
      />
      <div
        style={{
          backgroundColor: "rgba(255, 255, 240, 0.8)", // 조금 더 투명한 아이보리 색상
          borderRadius: 5,
          border: "3px solid #FFD700", // 경계선에 금색 선 효과
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // 그림자 효과 추가
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          zIndex: 99,
          marginTop: 30,
          padding: 20, // 안쪽 여백 추가
          fontSize: "18px", // 폰트 크기 조정
          lineHeight: "26px", // 줄 간격 조정
        }}
      >
        <div ref={nameDivRef} />
        <div ref={personalityDivRef} />
        <div ref={strengthsDivRef} />
      </div>
    </>
  );
};

export default Carousel;
