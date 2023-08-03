import React from "react";

import CarouselItem from "./CarouselItem";
import styles from "../styles/Common/Carousel.module.css";

interface Props {
  carouselList: string[];
}

const Carousel = ({ carouselList }: Props) => {
  return (
    <React.Fragment>
      {carouselList.map((item, idx) => (
        <CarouselItem key={idx} yum={item} />
      ))}
    </React.Fragment>
  );
};

export default Carousel;