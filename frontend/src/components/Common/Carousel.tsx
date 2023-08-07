import React, {useState} from "react";
import CarouselItem from "./CarouselItem";
import styles from "../styles/Common/Carousel.module.css";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

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
}

const Carousel: React.FC<Props> = (props) => {
  const responsive = {
    0: {
      items: 3,
    },
  };
  const items = props.allYumList.map((item, idx) => {
    return <CarouselItem key={idx} yum={item} carouselList={props.carouselList}
    allYumList={props.allYumList} />;
  });

  return (
    <AliceCarousel
      responsive={responsive}
      disableDotsControls
      infinite
      items={items}
    />
  );
};

export default Carousel;
