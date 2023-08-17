import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CarouselItem from "./CarouselItem";
import styles from "../styles/Common/Carousel.module.css";
import useSoundEffect from "../../hooks/useSoundEffect";

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

  const soundEffectOn = useSelector(
    (state: RootState) => state.soundEffect.soundEffectOn
  );
  const swipeSoundSource = require("../../assets/sound/swipe.mp3");
  const swipeSound = useSoundEffect(swipeSoundSource, 1);

  const handleClick = () => {
    if (soundEffectOn) {
      swipeSound.play();
    }
  };

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
        personalityDivRef.current.innerHTML = `🌊: ${currentPersonality.current}`;
      }

      if (strengthsDivRef.current) {
        strengthsDivRef.current.innerHTML = `🚩: ${currentStrengths.current}`;
      }

      if (nameDivRef.current) {
        nameDivRef.current.innerHTML = `🌞: ${currentName.current}`;
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
      personalityDivRef.current.innerHTML = `🌊: ${currentPersonality.current}`;
    }

    if (strengthsDivRef.current) {
      strengthsDivRef.current.innerHTML = `🚩: ${currentStrengths.current}`;
    }
    if (nameDivRef.current) {
      nameDivRef.current.innerHTML = `🌞: ${currentName.current}`;
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
            <Button
              type="dashed"
              shape="circle"
              icon={<LeftOutlined />}
              onClick={handleClick}
            />
          </div>
        )}
        renderNextButton={() => (
          <div
            className={styles.nextButton}
            style={{ position: "absolute", right: 0 }}
          >
            <Button
              type="dashed"
              shape="circle"
              icon={<RightOutlined />}
              onClick={handleClick}
            />
          </div>
        )}
      />
      <div className={styles["yum-detail"]}>
        <div
          ref={nameDivRef}
          style={{ fontWeight: "bold", fontSize: "35px" }}
        />
        <br />
        <div ref={personalityDivRef} />
        <div ref={strengthsDivRef} />
      </div>
    </>
  );
};

export default Carousel;
