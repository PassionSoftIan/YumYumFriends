import React from "react";
import { FadeIn } from "./styles/transition";
import SelectYum from "../components/SelectPage/SelectYum";
import "./styles/SelectPage.css";

const SelectPage: React.FC = () => {
  return (
    <FadeIn>
      <div className="select">
      <SelectYum />
      </div>
    </FadeIn>
  );
};

export default SelectPage;
