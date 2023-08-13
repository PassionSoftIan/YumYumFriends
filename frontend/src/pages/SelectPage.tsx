import React from "react";
import { FadeIn } from "./styles/transition";
import SelectYum from "../components/SelectPage/SelectYum";
import styles from "./styles/SelectPage.css";

const SelectPage: React.FC = () => {
  return (
    <FadeIn>
      <SelectYum />
    </FadeIn>
  );
};

export default SelectPage;
