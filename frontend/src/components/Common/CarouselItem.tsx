import React from "react";
import styles from "../styles/Common/CarouselItem.module.css";

interface CarouselItemProps {
  yum: string;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ yum }) => {
  return (
    <div className={styles["carousel-item"]}>
      <img
        src={require(`../../assets/StopYums/${yum}.png`)}
        alt={yum}
        className={styles["carousel-image"]}
      />
    </div>
  );
};

export default CarouselItem;
