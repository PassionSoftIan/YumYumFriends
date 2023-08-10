import React, { useState, useRef } from "react";
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
  const centerIndex = useRef(0);

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

  const handleSlideChanged = (e: SlideChangedEvent) => {
    // Calculate the center index in the visible carousel items
    let centerIdx = (e.item % 26) + 1;
    if (centerIdx === 26) {
      centerIdx = 0;
    }
    props.onCenterIndexChange(centerIdx);
    // console.log(centerIndex.current);
  };
  console.log(props.myCurrentYum);
  return (
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
          <Button type="primary" shape="circle" icon={<LeftOutlined />} />
        </div>
      )}
      renderNextButton={() => (
        <div
          className={styles.nextButton}
          style={{ position: "absolute", right: 0 }}
        >
          <Button type="primary" shape="circle" icon={<RightOutlined />} />
        </div>
      )}
    />
  );
};

export default Carousel;
