import React from "react";
import CarouselItem from "./CarouselItem";
import styles from "../styles/Common/Carousel.module.css";

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

interface Props {
  carouselList: string[];
}

const Carousel: React.FC<Props> = (props) => {
  const responsive = {
    0: {
      items: 3
    }
  };

  const items = props.carouselList.map((item, idx) => {
    return (
      <CarouselItem key={idx} yum={item}/>
    )
  })

  return <AliceCarousel responsive={responsive} disableDotsControls infinite items={items} />;
};

export default Carousel;
