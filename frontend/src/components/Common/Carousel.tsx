import React from "react";

import CarouselItem from "./CarouselItem";
import styles from "../styles/Common/Carousel.module.css";

<<<<<<< HEAD
=======
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

>>>>>>> 9d70f7e639a6f2f6d484a65906fb0e114b91ba9e
interface Props {
  carouselList: string[];
}

const Carousel = ({ carouselList }: Props) => {
  return (
<<<<<<< HEAD
    <React.Fragment>
      {carouselList.map((item, idx) => (
        <CarouselItem key={idx} yum={item} />
      ))}
    </React.Fragment>
=======
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
>>>>>>> 9d70f7e639a6f2f6d484a65906fb0e114b91ba9e
  );
};

export default Carousel;