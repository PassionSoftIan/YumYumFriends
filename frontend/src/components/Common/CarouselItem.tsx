import React from "react";
import styles from "../styles/Common/CarouselItem.module.css";

interface CarouselItemType {
  name: string;
  eng: string;
  personality: string;
  strengths: string;
  id: number;
}

interface CarouselItemProps {
  yum: CarouselItemType;
  carouselList: CarouselItemType[];
  allYumList: CarouselItemType[];
}

const CarouselItem: React.FC<CarouselItemProps> = (props) => {
  const { yum, carouselList, allYumList } = props;
  const isItemInCarouselList = carouselList.some((item) => item.id === yum.id);
  return (
    <div className={styles[isItemInCarouselList ? "carousel-item" : "locked"]}>
      {isItemInCarouselList ? null : (
        <div className={styles["lock-icon"]}>🔒</div>
      )}
      <img
        src={require(`../../assets/StopYums/${yum.eng}.png`)}
        alt={yum.eng}
        className={styles["carousel-image"]}
      />
    </div>
  );
};

export default CarouselItem;
